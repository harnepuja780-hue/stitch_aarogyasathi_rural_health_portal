import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../api/client';

const GUEST_KEY = 'aarogya-guest';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [backendOnline, setBackendOnline] = useState(true);

  const initialStatus = () => {
    if (typeof window !== 'undefined' && window.localStorage.getItem(GUEST_KEY) === '1') {
      return 'guest';
    }
    return 'loading';
  };
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (status !== 'loading') return;
    let active = true;
    (async () => {
      const res = await api.me();
      if (!active) return;
      if (res.networkError) {
        setBackendOnline(false);
        setUser(null);
        setStatus('guest');
        return;
      }
      setBackendOnline(true);
      if (res.ok && res.data?.user) {
        setUser(res.data.user);
        setStatus('authenticated');
        return;
      }
      setUser(null);
      setStatus('guest');
    })().catch(() => {
      if (active) {
        setBackendOnline(false);
        setUser(null);
        setStatus('guest');
      }
    });
    return () => {
      active = false;
    };
  }, [status]);

  const checkBackend = useCallback(async () => {
    const res = await api.health();
    setBackendOnline(!res.networkError && res.ok);
    return !res.networkError && res.ok;
  }, []);

  const loginWithOtp = useCallback(async (mobile, otp) => {
    setError('');
    try {
      const res = await api.verifyOtp(mobile, otp);
      if (res.networkError) {
        setBackendOnline(false);
        setError('NETWORK_ERROR');
        return { ok: false, error: 'NETWORK_ERROR' };
      }
      setBackendOnline(true);
      if (res.ok && res.data?.user) {
        setUser(res.data.user);
        setStatus('authenticated');
        if (typeof window !== 'undefined') window.localStorage.removeItem(GUEST_KEY);
        return { ok: true, user: res.data.user };
      }
      const message = res.data?.error || 'LOGIN_FAILED';
      setError(message);
      return { ok: false, error: message };
    } catch {
      setError('NETWORK_ERROR');
      return { ok: false, error: 'NETWORK_ERROR' };
    }
  }, []);

  const requestOtp = useCallback(async (mobile) => {
    setError('');
    try {
      const res = await api.requestOtp(mobile);
      if (res.networkError) {
        setBackendOnline(false);
        setError('NETWORK_ERROR');
        return { ok: false, error: 'NETWORK_ERROR' };
      }
      setBackendOnline(true);
      if (res.ok) {
        return { ok: true, devOtp: res.data?.devOtp, expiresInSeconds: res.data?.expiresInSeconds };
      }
      const message = res.data?.error || 'OTP_SEND_FAILED';
      return { ok: false, error: message };
    } catch {
      return { ok: false, error: 'NETWORK_ERROR' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch {
      // ignore network errors on logout
    }
    setUser(null);
    setStatus('guest');
    if (typeof window !== 'undefined') window.localStorage.setItem(GUEST_KEY, '1');
  }, []);

  const enterGuest = useCallback(() => {
    setUser(null);
    setStatus('guest');
    if (typeof window !== 'undefined') window.localStorage.setItem(GUEST_KEY, '1');
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        error,
        backendOnline,
        requestOtp,
        loginWithOtp,
        logout,
        enterGuest,
        clearError,
        checkBackend,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;