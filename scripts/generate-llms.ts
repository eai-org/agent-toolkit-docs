import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const toolkit = process.env.TOOLKIT_DIR ?? '../agent-toolkit';
const src = join(toolkit, 'docs/core-philosophy.md');
if (!existsSync(src)) {
  console.error(`llms.txt source not found: ${src} (set TOOLKIT_DIR to an agent-toolkit checkout)`);
  process.exit(1);
}
mkdirSync('public', { recursive: true });
copyFileSync(src, 'public/llms.txt');
console.log('public/llms.txt generated');
