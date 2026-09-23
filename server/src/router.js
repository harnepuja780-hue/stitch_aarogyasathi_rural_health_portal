import { publicUser } from './auth.js';

function send(res, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...extraHeaders,
  });
  res.end(body);
}

function readJson(req, limitBytes = 64 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(new Error('BODY_TOO_LARGE'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new Error('BAD_JSON'));
      }
    });
    req.on('error', (err) => reject(err));
  });
}

function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) return {};
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    out[key] = decodeURIComponent(value);
  }
  return out;
}

function serializeCookie(cookie) {
  const bits = [`${cookie.name}=${encodeURIComponent(cookie.value)}`];
  bits.push('Path=' + cookie.path);
  if (cookie.httpOnly) bits.push('HttpOnly');
  if (cookie.sameSite) bits.push('SameSite=' + cookie.sameSite);
  if (cookie.secure) bits.push('Secure');
  if (cookie.maxAge) bits.push(`Max-Age=${cookie.maxAge}`);
  return bits.join('; ');
}

function clearCookie(name) {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function createRouter({ authService }) {
  return async function route(req, res) {
    const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
    const path = url.pathname;
    const method = req.method ?? 'GET';

    if (method === 'GET' && path === '/api/health') {
      return send(res, 200, { ok: true, service: 'aarogya-sathi-server', time: new Date().toISOString() });
    }

    if (path.startsWith('/api/auth')) {
      const cookies = parseCookies(req);
      const token = cookies.aarogya_session ?? null;

      if (method === 'GET' && path === '/api/auth/me') {
        const found = authService.getUserFromToken(token);
        if (!found) return send(res, 401, { ok: false, error: 'UNAUTHENTICATED' });
        return send(res, 200, { ok: true, user: publicUser(found.user) });
      }

      if (method === 'POST' && path === '/api/auth/request-otp') {
        let body;
        try {
          body = await readJson(req);
        } catch {
          return send(res, 400, { ok: false, error: 'BAD_REQUEST' });
        }
        const result = authService.requestOtp(body?.mobile);
        if (!result.ok) return send(res, result.status, { ok: false, error: result.error, retryInSeconds: result.retryInSeconds });
        return send(res, result.status, result.data);
      }

      if (method === 'POST' && path === '/api/auth/verify-otp') {
        let body;
        try {
          body = await readJson(req);
        } catch {
          return send(res, 400, { ok: false, error: 'BAD_REQUEST' });
        }
        const result = authService.verifyOtp(body?.mobile, body?.otp);
        if (!result.ok) return send(res, result.status, { ok: false, error: result.error });
        const { setCookie, user } = result.data;
        return send(res, 200, { ok: true, user }, { 'Set-Cookie': serializeCookie(setCookie) });
      }

      if (method === 'POST' && path === '/api/auth/logout') {
        authService.logout(token);
        return send(res, 200, { ok: true }, { 'Set-Cookie': clearCookie('aarogya_session') });
      }

      return send(res, 404, { ok: false, error: 'NOT_FOUND' });
    }

    return send(res, 404, { ok: false, error: 'NOT_FOUND' });
  };
}