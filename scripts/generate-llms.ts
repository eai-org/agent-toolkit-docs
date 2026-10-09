import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { GROUPS } from '../src/data/groups';
import { toolkitDir } from './lib/toolkit';

const GITHUB = 'https://github.com/eai-org/agent-toolkit/blob/main';
const SITE = 'https://eai-org.github.io';
const BASE = (process.env.SITE_BASE ?? '/agent-toolkit-docs').replace(/\/$/, '');
const CLONE = 'git clone https://github.com/eai-org/agent-toolkit.git && cd agent-toolkit && ./install.sh';

const src = join(toolkitDir, 'docs/core-philosophy.md');
if (!existsSync(src)) {
  console.error(`llms.txt source not found: ${src} (set TOOLKIT_DIR to an agent-toolkit checkout)`);
  process.exit(1);
}

function description(path: string): string {
  const fm = readFileSync(path, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const desc = fm && parse(fm[1])?.description;
  if (!desc) throw new Error(`no frontmatter description in ${path}`);
  return String(desc).trim();
}

const philosophy = readFileSync(src, 'utf8')
  .replace(/\]\(\.\.\//g, `](${GITHUB}/`)
  .replace(/\]\(\.\//g, `](${GITHUB}/docs/`)
  .trimEnd();

// a local checkout can carry harness-created dirs under skills/ with no SKILL.md
const skills = readdirSync(join(toolkitDir, 'skills'))
  .filter((name) => existsSync(join(toolkitDir, 'skills', name, 'SKILL.md')))
  .sort()
  .map((name) => {
    const desc = description(join(toolkitDir, 'skills', name, 'SKILL.md'));
    return `- [${name}](${GITHUB}/skills/${name}/SKILL.md): ${desc}`;
  });

const rules = readdirSync(join(toolkitDir, 'rules'))
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((f) => {
    const name = f.replace(/\.md$/, '');
    return `- [${name}](${GITHUB}/rules/${f}): ${description(join(toolkitDir, 'rules', f))}`;
  });
rules.push(
  `- [use-my-mothertongue](${GITHUB}/docs/use-my-mothertongue-rule.md): Copy-paste snippet, not a file: your agent talks to you in your own language, while everything it writes into the project stays in English.`,
);

const install = [
  '## Install',
  '```sh\n' + CLONE + '\n```',
  'Rules are opt-in: `./install-opinionated-rules.sh` installs them all, or pick only the ones you want.',
  `- [Install the skills](${GITHUB}/docs/install-skills.md)\n- [Install with agentwheel](${GITHUB}/docs/install-with-agentwheel.md)`,
].join('\n\n');

const pages = [
  ...GROUPS.map((g) => `- [${g.title}](${SITE}${BASE}/${g.slug}/): ${g.line}`),
  `- [About us](${SITE}${BASE}/about/)`,
];

const out = [
  philosophy,
  ['## Skills', skills.join('\n')].join('\n\n'),
  ['## Rules', rules.join('\n')].join('\n\n'),
  install,
  ['## Pages', pages.join('\n')].join('\n\n'),
].join('\n\n');

mkdirSync('public', { recursive: true });
writeFileSync('public/llms.txt', out + '\n');
console.log('public/llms.txt generated');
