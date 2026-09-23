const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, { method = 'GET', body, headers = {}, signal } = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    const offline = !res && typeof err?.name === 'string' && /AbortError/.test(err.name) === false;
    return { ok: false, status: 0, networkError: true, data: { error: offline ? 'NETWORK_ERROR' : 'ABORTED' } };
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  return { ok: res.ok, status: res.status, data };
}

export const api = {
  health: () => request('/health'),
  requestOtp: (mobile) => request('/auth/request-otp', { method: 'POST', body: { mobile } }),
  verifyOtp: (mobile, otp) => request('/auth/verify-otp', { method: 'POST', body: { mobile, otp } }),
  me: () => request('/auth/me'),
  logout: () => request('/auth/logout', { method: 'POST' }),
};

export default api;