import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { toolkitDir } from '../scripts/lib/toolkit';
import { GROUPS } from '../src/data/groups';

const GITHUB = 'https://github.com/eai-org/agent-toolkit/blob/main';

// vitest runs a skipped describe's body while collecting, so every read stays inside a test
const d = existsSync('dist/llms.txt') ? describe : describe.skip;
const llms = () => readFileSync('dist/llms.txt', 'utf8');

d('llms.txt', () => {
  test('lists every skill', () => {
    const skills = readdirSync(join(toolkitDir, 'skills')).filter((name) =>
      existsSync(join(toolkitDir, 'skills', name, 'SKILL.md')),
    );
    expect(skills.length).toBeGreaterThan(0);
    for (const name of skills) {
      expect(llms(), name).toContain(`- [${name}](${GITHUB}/skills/${name}/SKILL.md)`);
    }
  });

  test('lists every rule, plus the mothertongue snippet', () => {
    const rules = readdirSync(join(toolkitDir, 'rules')).filter((f) => f.endsWith('.md'));
    expect(rules.length).toBeGreaterThan(0);
    for (const f of rules) {
      expect(llms(), f).toContain(`- [${f.replace(/\.md$/, '')}](${GITHUB}/rules/${f})`);
    }
    expect(llms()).toContain(`${GITHUB}/docs/use-my-mothertongue-rule.md`);
  });

  test('leaves no relative link behind', () => {
    expect(llms()).not.toMatch(/\]\(\.\.?\//);
  });

  test('has the index sections, the install command and every page', () => {
    for (const h of ['## Skills', '## Rules', '## Install', '## Pages']) expect(llms()).toContain(h);
    expect(llms()).toContain(
      'git clone https://github.com/eai-org/agent-toolkit.git && cd agent-toolkit && ./install.sh',
    );
    for (const slug of [...GROUPS.map((g) => g.slug), 'about']) expect(llms(), slug).toContain(`/${slug}/`);
    const root = llms().match(/\]\((\S+\/)about\/\)/)![1];
    expect(llms(), 'homepage').toContain(`](${root}):`);
  });
});
