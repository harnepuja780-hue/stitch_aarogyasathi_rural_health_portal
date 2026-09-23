import { startServer } from './src/server.js';
import { numericConfig } from './src/config.js';

startServer({ port: numericConfig.port }).catch((err) => {
  console.error('[aarogya-server] failed to start:', err);
  process.exit(1);
});