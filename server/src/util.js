import { randomBytes, randomInt, scryptSync, timingSafeEqual, createHash } from 'node:crypto';

export function generateOtp() {
  return String(randomInt(0, 1000000)).padStart(6, '0');
}

export function hashSecret(value) {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(value, salt, 32).toString('hex');
  return `${salt}:${derived}`;
}

export function verifySecret(value, stored) {
  if (!stored || typeof stored !== 'string') return false;
  const parts = stored.split(':');
  if (parts.length !== 2) return false;
  const [salt, expectedHex] = parts;
  let expected;
  try {
    expected = Buffer.from(expectedHex, 'hex');
  } catch {
    return false;
  }
  if (expected.length !== 32) return false;
  const actual = scryptSync(String(value), salt, 32);
  return timingSafeEqual(actual, expected);
}

export function sha256(value) {
  return createHash('sha256').update(String(value)).digest('hex');
}

export function generateSessionToken() {
  return randomBytes(32).toString('base64url');
}

export function isValidMobile(value) {
  return typeof value === 'string' && /^[6-9]\d{9}$/.test(value.trim());
}

export function normalizeMobile(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function isValidOtp(value) {
  return typeof value === 'string' && /^\d{6}$/.test(value.trim());
}