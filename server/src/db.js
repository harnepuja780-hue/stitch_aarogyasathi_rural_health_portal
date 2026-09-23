import { readFileSync, writeFileSync, mkdirSync, renameSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

export class JsonDb {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = { users: {}, otps: {}, sessions: {}, counters: {} };
    this.load();
  }

  load() {
    if (!existsSync(this.filePath)) {
      this.flush();
      return;
    }
    const raw = readFileSync(this.filePath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      this.data = {
        users: parsed.users ?? {},
        otps: parsed.otps ?? {},
        sessions: parsed.sessions ?? {},
        counters: parsed.counters ?? {},
      };
    } catch {
      this.data = { users: {}, otps: {}, sessions: {}, counters: {} };
    }
  }

  flush() {
    mkdirSync(dirname(this.filePath), { recursive: true });
    const tmpPath = `${this.filePath}.tmp`;
    writeFileSync(tmpPath, JSON.stringify(this.data, null, 2), 'utf8');
    renameSync(tmpPath, this.filePath);
  }

  get users() {
    return this.data.users;
  }

  get otps() {
    return this.data.otps;
  }

  get sessions() {
    return this.data.sessions;
  }

  getUser(mobile) {
    return this.data.users[mobile] ?? null;
  }

  createOrUpdateUser({ mobile, name }) {
    const existing = this.data.users[mobile] ?? null;
    const now = Date.now();
    let firstLoginAt;
    if (existing) {
      firstLoginAt = existing.firstLoginAt;
    } else {
      firstLoginAt = now;
    }
    const user = {
      mobile,
      createdAt: now,
      firstLoginAt,
      updatedAt: now,
      name: name ?? existing?.name ?? '',
    };
    this.data.users[mobile] = user;
    return user;
  }

  updateUser(mobile, patch) {
    const existing = this.data.users[mobile];
    if (!existing) return null;
    const updated = { ...existing, ...patch, updatedAt: Date.now() };
    this.data.users[mobile] = updated;
    return updated;
  }

  setOtp(mobile, { hash, expiresAt }) {
    this.data.otps[mobile] = { hash, expiresAt, createdAt: Date.now(), attempts: 0 };
  }

  getOtp(mobile) {
    return this.data.otps[mobile] ?? null;
  }

  bumpOtpAttempts(mobile) {
    const otp = this.data.otps[mobile];
    if (otp) otp.attempts += 1;
  }

  clearOtp(mobile) {
    delete this.data.otps[mobile];
  }

  createSession(tokenHash, mobile, expiresAt) {
    this.data.sessions[tokenHash] = { mobile, createdAt: Date.now(), expiresAt };
    return this.data.sessions[tokenHash];
  }

  getSession(tokenHash) {
    const session = this.data.sessions[tokenHash];
    if (!session) return null;
    if (session.expiresAt < Date.now()) {
      delete this.data.sessions[tokenHash];
      return null;
    }
    return session;
  }

  deleteSession(tokenHash) {
    delete this.data.sessions[tokenHash];
  }

  counterGet(key, now) {
    const entry = this.data.counters[key];
    if (!entry) return { count: 0, resetAt: 0 };
    if (entry.resetAt <= now) return { count: 0, resetAt: 0 };
    return entry;
  }

  counterIncrement(key, now, windowMs) {
    const current = this.counterGet(key, now);
    const next = {
      count: (current.resetAt === 0 ? 0 : current.count) + 1,
      resetAt: current.resetAt === 0 ? now + windowMs : current.resetAt,
    };
    this.data.counters[key] = next;
    return next;
  }
}