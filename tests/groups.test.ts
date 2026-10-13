import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { GROUPS, countLabel } from '../src/data/groups';
import { readToolkit, toolkitDir, toolkitExpected } from '../src/lib/toolkit';

// skips only when TOOLKIT_DIR is unset and the default checkout is absent
const withToolkit = toolkitExpected();
const toolkitDescribe = withToolkit ? describe : describe.skip;
const builtDescribe = existsSync('dist/index.html') && withToolkit ? describe : describe.skip;

const toolkitExists = () =>
  expect(existsSync(toolkitDir), `toolkit not found at ${toolkitDir} (set TOOLKIT_DIR)`).toBe(true);

// vitest runs a skipped describe's body while collecting, so every read stays inside a test
const toolkitSkills = () => readToolkit().skills.map((s) => s.name);
const toolkitRules = () => readToolkit().rules.map((r) => r.name);

describe('count label', () => {
  const names = (n: number) => Array.from({ length: n }, (_, i) => `n${i}`);

  test.each([
    [1, 0, '1 skill'],
    [11, 0, '11 skills'],
    [3, 4, '3 skills + 4 rules'],
    [11, 1, '11 skills + 1 rule'],
  ])('%i skills and %i rules read "%s"', (s, r, label) => {
    expect(countLabel(names(s), names(r))).toBe(label);
  });
});

toolkitDescribe('group arrays against the toolkit', () => {
  test('the toolkit checkout exists', toolkitExists);

  test('every listed skill and rule exists in the toolkit', () => {
    expect(toolkitSkills().length).toBeGreaterThan(0);
    expect(toolkitRules().length).toBeGreaterThan(0);
    const missing: string[] = [];
    for (const g of GROUPS) {
      for (const n of g.skills) {
        if (!existsSync(join(toolkitDir, 'skills', n, 'SKILL.md'))) missing.push(`${g.slug}: ${n}`);
      }
      for (const n of g.rules) {
        if (!existsSync(join(toolkitDir, 'rules', `${n}.md`))) missing.push(`${g.slug}: ${n}`);
      }
    }
    expect(missing).toEqual([]);
  });

  test('no name is listed twice', () => {
    const seen = new Set<string>();
    const duplicates: string[] = [];
    for (const g of GROUPS) {
      for (const n of [...g.skills, ...g.rules]) {
        if (seen.has(n)) duplicates.push(`${g.slug}: ${n}`);
        seen.add(n);
      }
    }
    expect(duplicates).toEqual([]);
  });

  test('reports toolkit skills and rules that sit on no page', () => {
    const placedSkills = new Set(GROUPS.flatMap((g) => g.skills));
    const placedRules = new Set(GROUPS.flatMap((g) => g.rules));
    const skills = toolkitSkills().filter((n) => !placedSkills.has(n));
    const rules = toolkitRules().filter((n) => !placedRules.has(n));
    if (skills.length) console.warn(`toolkit skills on no group page: ${skills.join(', ')}`);
    if (rules.length) console.warn(`toolkit rules on no group page: ${rules.join(', ')}`);
  });
});

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
  );

builtDescribe('toolkit links in the built pages', () => {
  test('the toolkit checkout exists', toolkitExists);

  test('every toolkit blob/main href resolves in the checkout', () => {
    const re = /href="https:\/\/github\.com\/eai-org\/agent-toolkit\/blob\/main\/([^"#?]+)/g;
    let found = 0;
    const broken: string[] = [];
    for (const file of htmlFiles('dist')) {
      for (const m of readFileSync(file, 'utf8').matchAll(re)) {
        found++;
        if (!existsSync(join(toolkitDir, m[1]))) broken.push(`${file}: ${m[1]}`);
      }
    }
    expect(found).toBeGreaterThan(0);
    expect(broken).toEqual([]);
  });
});
