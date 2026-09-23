import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DEFAULTS = {
  PORT: '8790',
  HOST: '0.0.0.0',
  DB_FILE: join(__dirname, 'data', 'db.json'),
  OTP_TTL_MINUTES: '10',
  OTP_MAX_ATTEMPTS: '5',
  OTP_MAX_REQUESTS_PER_WINDOW: '5',
  OTP_WINDOW_MINUTES: '15',
  SESSION_TTL_DAYS: '30',
  SESSION_COOKIE: 'aarogya_session',
  COOKIE_SECURE: 'false',
  ALLOWED_ORIGINS: 'http://localhost:5173,http://127.0.0.1:5173',
  OTP_DEV_MODE: 'true',
  OTP_DEV_CODE: '',
  LOG_LEVEL: 'info',
};

function loadEnvFile(path) {
  const result = {};
  if (!existsSync(path)) return result;
  const raw = readFileSync(path, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    let key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (key.startsWith('export ')) key = key.slice(7).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.includes(' #')) value = value.split(' #')[0].trim();
    result[key] = value;
  }
  return result;
}

export const config = { ...DEFAULTS };

const envPath = join(__dirname, '.env');
const fileEnv = loadEnvFile(envPath);

for (const key of Object.keys(config)) {
  config[key] = process.env[key] ?? fileEnv[key] ?? config[key];
}

export function parseIntEnv(key, fallback) {
  const raw = config[key];
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const numericConfig = {
  port: parseIntEnv('PORT', 8790),
  otpTtlMs: parseIntEnv('OTP_TTL_MINUTES', 10) * 60 * 1000,
  otpMaxAttempts: parseIntEnv('OTP_MAX_ATTEMPTS', 5),
  otpWindowMs: parseIntEnv('OTP_WINDOW_MINUTES', 15) * 60 * 1000,
  otpMaxRequests: parseIntEnv('OTP_MAX_REQUESTS_PER_WINDOW', 5),
  sessionTtlMs: parseIntEnv('SESSION_TTL_DAYS', 30) * 24 * 60 * 60 * 1000,
};

export const allowedOrigins = config.ALLOWED_ORIGINS.split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export const cookieSecure = config.COOKIE_SECURE === 'true';
export const otpDevMode = config.OTP_DEV_MODE === 'true';
export const otpDevCode = config.OTP_DEV_CODE;

export const log = {
  info: (...args) => console.log('[aarogya-server]', ...args),
  warn: (...args) => console.warn('[aarogya-server]', ...args),
  error: (...args) => console.error('[aarogya-server]', ...args),
};