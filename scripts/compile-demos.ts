import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { parse } from 'yaml';
import { compileSpec, type DemoSpec } from './lib/cast';

const specDir = 'demos/specs';
const outDir = 'public/demos';
mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(specDir).filter((f) => f.endsWith('.yaml')).sort()) {
  const spec = parse(readFileSync(join(specDir, f), 'utf8')) as DemoSpec;
  const out = join(outDir, basename(f, '.yaml') + '.cast');
  writeFileSync(out, compileSpec(spec));
  console.log(`${f} -> ${out}`);
}
