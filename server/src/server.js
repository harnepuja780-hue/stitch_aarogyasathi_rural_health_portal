import { createServer } from 'node:http';
import { AuthService } from './auth.js';
import { JsonDb } from './db.js';
import { createRouter } from './router.js';
import { config, numericConfig, allowedOrigins, log } from './config.js';

export function startServer({ port = numericConfig.port, host = config.HOST, dbFile = config.DB_FILE } = {}) {
  const db = new JsonDb(dbFile);
  const authService = new AuthService(db);
  const router = createRouter({ authService });

  const server = createServer(async (req, res) => {
    const origin = req.headers.origin;
    if (origin) {
      const allowed = allowedOrigins.length === 0 || allowedOrigins.includes(origin);
      if (allowed) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Vary', 'Origin');
      }
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      await router(req, res);
    } catch (err) {
      log.error('Unhandled route error', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'INTERNAL_ERROR' }));
    }
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      log.info(`AarogyaSathi server listening on http://${host}:${port}`);
      resolve({
        server,
        db,
        authService,
        close: () => new Promise((resolveClose) => server.close(resolveClose)),
      });
    });
  });
}