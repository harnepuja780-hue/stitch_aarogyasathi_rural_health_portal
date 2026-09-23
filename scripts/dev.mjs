import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;

let shuttingDown = false;
function shutdown(exitCode) {
  if (shuttingDown) return;
  shuttingDown = true;
  process.exit(exitCode ?? 0);
}

const viteBin = join(root, 'node_modules', 'vite', 'bin', 'vite.js');

const children = [
  {
    name: 'server',
    tag: cyan('[server]'),
    child: spawn(process.execPath, ['server/index.js'], { cwd: root, shell: false }),
  },
  {
    name: 'web',
    tag: yellow('[web]'),
    child: spawn(process.execPath, [viteBin, '--host', '0.0.0.0', '--port', '5173', '--strictPort'], {
      cwd: root,
      shell: false,
    }),
  },
];

for (const { tag, child } of children) {
  child.stdout?.on('data', (chunk) => {
    for (const line of chunk.toString().split('\n')) {
      if (line.trim()) process.stdout.write(`${tag} ${line}\n`);
    }
  });
  child.stderr?.on('data', (chunk) => {
    for (const line of chunk.toString().split('\n')) {
      if (line.trim()) process.stderr.write(`${tag} ${line}\n`);
    }
  });
  child.on('exit', (code) => {
    process.stderr.write(`${tag} exited (code ${code}). Shutting down the other process.\n`);
    shutdown(code && code !== 0 ? 1 : 0);
  });
}

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    for (const { child } of children) child.kill(sig);
  });
}