import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GROUPS } from '../src/data/groups';
import { CATALOGUE_DESCRIPTION, CATALOGUE_TITLE, SNIPPET } from '../src/data/catalogue';
import { toolkitDir, readToolkit } from '../src/lib/toolkit';

const GITHUB = 'https://github.com/eai-org/agent-toolkit/blob/main';
const SITE = 'https://eai-org.github.io';
const BASE = (process.env.SITE_BASE ?? '/agent-toolkit-docs').replace(/\/$/, '');
const CLONE = 'git clone https://github.com/eai-org/agent-toolkit.git && cd agent-toolkit && ./install.sh';

const src = join(toolkitDir, 'docs/core-philosophy.md');
if (!existsSync(src)) {
  console.error(`llms.txt source not found: ${src} (set TOOLKIT_DIR to an agent-toolkit checkout)`);
  process.exit(1);
}

const philosophy = readFileSync(src, 'utf8')
  .replace(/\]\(\.\.\//g, `](${GITHUB}/`)
  .replace(/\]\(\.\//g, `](${GITHUB}/docs/`)
  .trimEnd();

const toolkit = readToolkit();
const skills = toolkit.skills.map(
  ({ name, description }) => `- [${name}](${GITHUB}/skills/${name}/SKILL.md): ${description}`,
);

const rules = toolkit.rules.map(
  ({ name, description }) => `- [${name}](${GITHUB}/rules/${name}.md): ${description}`,
);
rules.push(
  `- [${SNIPPET.name}](${GITHUB}/${SNIPPET.path}): ${SNIPPET.line[0].toUpperCase()}${SNIPPET.line.slice(1)}.`,
);

const install = [
  '## Install',
  '```sh\n' + CLONE + '\n```',
  'Rules are opt-in: `./install-opinionated-rules.sh` installs them all, or pick only the ones you want.',
  `- [Install the skills](${GITHUB}/docs/install-skills.md)\n- [Install the rules](${GITHUB}/docs/install-rules.md)\n- [Install with agentwheel](${GITHUB}/docs/install-with-agentwheel.md)`,
].join('\n\n');

const pages = [
  `- [agent-toolkit](${SITE}${BASE}/): Minimalistic skills and rules for AI coding agents that assist your daily work in any software engineering project`,
  ...GROUPS.map((g) => `- [${g.title}](${SITE}${BASE}/${g.slug}/): ${g.line}`),
  `- [${CATALOGUE_TITLE}](${SITE}${BASE}/skills/): ${CATALOGUE_DESCRIPTION}`,
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
