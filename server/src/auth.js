import {
  generateOtp,
  hashSecret,
  verifySecret,
  generateSessionToken,
  sha256,
  isValidMobile,
  normalizeMobile,
  isValidOtp,
} from './util.js';
import { numericConfig, otpDevMode, otpDevCode } from './config.js';

export class AuthService {
  constructor(db) {
    this.db = db;
    this.log = [];
  }

  requestOtp(mobileRaw) {
    const mobile = normalizeMobile(mobileRaw);
    if (!isValidMobile(mobile)) {
      return { ok: false, status: 400, error: 'INVALID_MOBILE' };
    }

    if (this.mobileRateLimited(mobile)) {
      return { ok: false, status: 429, error: 'TOO_MANY_REQUESTS' };
    }

    const existing = this.db.getUser(mobile);
    const now = Date.now();
    if (existing) {
      const recent = this.db.getOtp(mobile);
      if (recent && now - recent.createdAt < numericConfig.otpTtlMs) {
        return { ok: false, status: 429, error: 'OTP_ALREADY_SENT', retryInSeconds: Math.ceil((now - recent.createdAt) / 1000) };
      }
    }

    const otp = generateOtp();
    const usedOtp = otpDevCode && otpDevCode.length === 6 ? otpDevCode : otp;
    this.db.setOtp(mobile, {
      hash: hashSecret(usedOtp),
      expiresAt: Date.now() + numericConfig.otpTtlMs,
    });
    this.db.flush();

    this.log.push({ type: 'otp:deliver', mobile, when: now });

    const response = {
      ok: true,
      message: otpDevMode ? 'OTP_SENT_DEV' : 'OTP_SENT',
      expiresInSeconds: Math.ceil(numericConfig.otpTtlMs / 1000),
    };
    if (otpDevMode) {
      response.devOtp = usedOtp;
    }
    return { ok: true, status: 200, data: response };
  }

  verifyOtp(mobileRaw, otpRaw) {
    const mobile = normalizeMobile(mobileRaw);
    const otp = typeof otpRaw === 'string' ? otpRaw.trim() : '';
    if (!isValidMobile(mobile)) {
      return { ok: false, status: 400, error: 'INVALID_MOBILE' };
    }
    if (!isValidOtp(otp)) {
      return { ok: false, status: 400, error: 'INVALID_OTP_FORMAT' };
    }

    const record = this.db.getOtp(mobile);
    if (!record) {
      return { ok: false, status: 401, error: 'INVALID_OTP' };
    }
    if (record.expiresAt < Date.now()) {
      this.db.clearOtp(mobile);
      this.db.flush();
      return { ok: false, status: 401, error: 'OTP_EXPIRED' };
    }
    if (record.attempts >= numericConfig.otpMaxAttempts) {
      this.db.clearOtp(mobile);
      this.db.flush();
      return { ok: false, status: 429, error: 'TOO_MANY_ATTEMPTS' };
    }

    if (!verifySecret(otp, record.hash)) {
      this.db.bumpOtpAttempts(mobile);
      this.db.flush();
      return { ok: false, status: 401, error: 'INVALID_OTP' };
    }

    this.db.clearOtp(mobile);
    const user = this.db.createOrUpdateUser({ mobile });
    const session = this.createSession(mobile);
    this.db.flush();

    this.log.push({ type: 'auth:login', mobile, when: Date.now() });

    return {
      ok: true,
      status: 200,
      data: {
        user: publicUser(user),
        setCookie: session.cookie,
      },
    };
  }

  createSession(mobile) {
    const token = generateSessionToken();
    const tokenHash = sha256(token);
    const expiresAt = Date.now() + numericConfig.sessionTtlMs;
    this.db.createSession(tokenHash, mobile, expiresAt);
    return {
      cookie: {
        name: 'aarogya_session',
        value: token,
        httpOnly: true,
        sameSite: 'Lax',
        path: '/',
        secure: process.env.COOKIE_SECURE === 'true',
        maxAge: Math.floor(numericConfig.sessionTtlMs / 1000),
      },
    };
  }

  getUserFromToken(rawToken) {
    if (!rawToken) return null;
    const session = this.db.getSession(sha256(rawToken));
    if (!session) return null;
    return { mobile: session.mobile, user: this.db.getUser(session.mobile) };
  }

  logout(rawToken) {
    if (rawToken) {
      this.db.deleteSession(sha256(rawToken));
      this.db.flush();
    }
    return { ok: true };
  }

  mobileRequestCount(mobile) {
    const now = Date.now();
    const entry = this.db.counterGet(`otp:${mobile}`, now);
    return entry.resetAt === 0 ? 0 : entry.count;
  }

  mobileRateLimited(mobile) {
    const now = Date.now();
    const entry = this.db.counterGet(`otp:${mobile}`, now);
    if (entry.resetAt === 0) {
      this.db.counterIncrement(`otp:${mobile}`, now, numericConfig.otpWindowMs);
      return false;
    }
    if (entry.count >= numericConfig.otpMaxRequests) {
      return true;
    }
    this.db.counterIncrement(`otp:${mobile}`, now, numericConfig.otpWindowMs);
    return false;
  }
}

export function publicUser(user) {
  if (!user) return null;
  return {
    mobile: user.mobile,
    name: user.name ?? '',
    createdAt: user.createdAt,
    firstLoginAt: user.firstLoginAt ?? null,
  };
}