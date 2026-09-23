import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { rmSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from '../src/server.js';
import { generateOtp, hashSecret, verifySecret, isValidMobile, isValidOtp } from '../src/util.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEST_DB = join(__dirname, '..', 'data', 'test-db.json');

let server;
const base = 'http://127.0.0.1:8791';
let cookie = '';

before(async () => {
  try { rmSync(TEST_DB, { force: true }); } catch {}
  const handle = await startServer({ port: 8791, dbFile: TEST_DB });
  server = handle;
});

after(() => {
  server?.close();
  try { rmSync(TEST_DB, { force: true }); } catch {}
});

async function api(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(base + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json, headers: res.headers };
}

test('health endpoint works', async () => {
  const { status, json } = await api('/api/health');
  assert.equal(status, 200);
  assert.equal(json.ok, true);
});

test('mobile validation util', () => {
  assert.ok(isValidMobile('9876543210'));
  assert.equal(isValidMobile('1234567890'), false);
  assert.equal(isValidMobile('abcdef'), false);
  assert.ok(isValidOtp('123456'));
  assert.equal(isValidOtp('12345'), false);
  assert.equal(isValidOtp('abcdef'), false);
});

test('secret hashing is salted and verifiable (no plaintext)', () => {
  const a = hashSecret('123456');
  const b = hashSecret('123456');
  assert.notEqual(a, b, 'same input must produce different hashes (salt)');
  assert.ok(verifySecret('123456', a));
  assert.equal(verifySecret('000000', a), false);
  assert.equal(verifySecret('123456', 'not:a-valid-hash'), false);
  assert.ok(!/123456/.test(a), 'hash must not contain the plaintext');
});

test('request OTP rejects invalid mobile', async () => {
  const { status, json } = await api('/api/auth/request-otp', { method: 'POST', body: { mobile: '12345' } });
  assert.equal(status, 400);
  assert.equal(json.error, 'INVALID_MOBILE');
});

test('full OTP login flow (dev mock OTP) + session + me + profile data privacy', async () => {
  const mobile = '9876543210';

  const req = await api('/api/auth/request-otp', { method: 'POST', body: { mobile } });
  assert.equal(req.status, 200);
  assert.equal(req.json.message, 'OTP_SENT_DEV');
  assert.match(req.json.devOtp, /^\d{6}$/, 'dev mode returns a 6-digit OTP');

  const wrong = await api('/api/auth/verify-otp', { method: 'POST', body: { mobile, otp: '000000' } });
  assert.equal(wrong.status, 401);

  const ok = await api('/api/auth/verify-otp', { method: 'POST', body: { mobile, otp: req.json.devOtp } });
  assert.equal(ok.status, 200);
  assert.equal(ok.json.user.mobile, mobile);
  assert.equal(ok.json.user.name, '');
  const setCookie = ok.headers.get('set-cookie') ?? '';
  assert.ok(setCookie.includes('aarogya_session='), 'session cookie is set');
  assert.ok(setCookie.includes('HttpOnly'), 'session cookie is HttpOnly');
  cookie = setCookie.split(';')[0];

  const me = await api('/api/auth/me', { headers: { Cookie: cookie } });
  assert.equal(me.status, 200);
  assert.equal(me.json.user.mobile, mobile);
  assert.equal(me.json.user.password, undefined, 'no password field ever');
  assert.equal(me.json.user.otp, undefined, 'no otp field ever');
  assert.equal(me.json.user.health, undefined, 'no health/period data stored');

  const unauthedMe = await api('/api/auth/me');
  assert.equal(unauthedMe.status, 401);

  const logout = await api('/api/auth/logout', { method: 'POST', headers: { Cookie: cookie } });
  assert.equal(logout.status, 200);

  const meAfter = await api('/api/auth/me', { headers: { Cookie: cookie } });
  assert.equal(meAfter.status, 401);
});

test('OTP attempt limit is enforced', async () => {
  const mobile = '9123456780';
  await api('/api/auth/request-otp', { method: 'POST', body: { mobile } });
  for (let i = 0; i < 5; i++) {
    const r = await api('/api/auth/verify-otp', { method: 'POST', body: { mobile, otp: '111111' } });
    assert.equal(r.status, 401, `attempt ${i + 1} rejected`);
  }
  const afterLimit = await api('/api/auth/verify-otp', { method: 'POST', body: { mobile, otp: '111111' } });
  assert.equal(afterLimit.status, 429, 'attempts exhausted → 429');
});

test('generates random OTP', () => {
  const seen = new Set(Array.from({ length: 50 }, () => generateOtp()));
  assert.ok(seen.size > 1, 'OTPs should not all be identical');
  for (const otp of seen) assert.match(otp, /^\d{6}$/);
});

test('DB file stores users without plaintext OTPs/passwords', async () => {
  assert.ok(existsSync(TEST_DB), 'db file created');
  const parsed = JSON.parse(readFileSync(TEST_DB, 'utf8'));
  assert.ok(parsed.users['9876543210'], 'verified user persisted');
  const user = parsed.users['9876543210'];
  assert.equal(user.password, undefined, 'no password field');
  assert.equal(user.otp, undefined, 'no otp field');
  assert.equal(user.otpHash, undefined, 'no otpHash field');
  assert.equal(user.health, undefined, 'no health/period data stored');
  assert.deepEqual(Object.keys(user).sort(), ['createdAt', 'firstLoginAt', 'mobile', 'name', 'updatedAt'].sort(), 'only minimal profile fields stored');
  // Any pending OTP records must be salted hashes (salt:hex), never the code itself.
  for (const [mobile, record] of Object.entries(parsed.otps)) {
    assert.match(record.hash, /^[0-9a-f]{32}:[0-9a-f]{64}$/, `otp for ${mobile} is a salted hash`);
    assert.ok(record.hash.length > 90, 'hash is salt+derived, never raw code');
  }
});