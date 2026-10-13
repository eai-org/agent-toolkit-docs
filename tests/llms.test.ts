import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { CATALOGUE_DESCRIPTION } from '../src/data/catalogue';
import { GROUPS } from '../src/data/groups';
import { readToolkit } from '../src/lib/toolkit';

const GITHUB = 'https://github.com/eai-org/agent-toolkit/blob/main';

// vitest runs a skipped describe's body while collecting, so every read stays inside a test
const d = existsSync('dist/llms.txt') ? describe : describe.skip;
const llms = () => readFileSync('dist/llms.txt', 'utf8');

d('llms.txt', () => {
  test('lists every skill', () => {
    const { skills } = readToolkit();
    expect(skills.length).toBeGreaterThan(0);
    for (const { name } of skills) {
      expect(llms(), name).toContain(`- [${name}](${GITHUB}/skills/${name}/SKILL.md)`);
    }
  });

  test('lists every rule, plus the mothertongue snippet', () => {
    const { rules } = readToolkit();
    expect(rules.length).toBeGreaterThan(0);
    for (const { name } of rules) {
      expect(llms(), name).toContain(`- [${name}](${GITHUB}/rules/${name}.md)`);
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

  test('lists the skills and rules page before the About entry, after the groups', () => {
    const pages = llms().slice(llms().indexOf('## Pages'));
    const root = llms().match(/\]\((\S+\/)about\/\)/)![1];
    const entry = `- [Skills and rules](${root}skills/): ${CATALOGUE_DESCRIPTION}`;
    const at = pages.indexOf(entry);
    expect(at).toBeGreaterThan(-1);
    expect(at).toBeGreaterThan(pages.indexOf(`/${GROUPS.at(-1)!.slug}/)`));
    expect(at).toBeLessThan(pages.indexOf('- [About us]('));
  });
});
