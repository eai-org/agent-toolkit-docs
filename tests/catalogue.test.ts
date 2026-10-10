import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import {
  CATALOGUE_LINES,
  SNIPPET,
  fingerprint,
  sanitizeDescription,
} from '../src/data/catalogue';
import { readToolkit, toolkitDir, toolkitExpected } from '../src/lib/toolkit';

describe('sanitizer', () => {
  test.each([
    ['x—y', 'x, y'],
    ['a — b', 'a, b'],
    ['a–b', 'a, b'],
    ['don’t', "don't"],
    ['Do it. Invoke manually only.', 'Do it.'],
  ])('%s becomes %s', (input, expected) => {
    const out = sanitizeDescription(input);
    expect(out).toBe(expected);
    expect(out).not.toMatch(/[—–‘’]/);
    expect(out).not.toContain('Invoke manually');
  });
});

describe('line rules', () => {
  const lines = () => [
    ...Object.entries(CATALOGUE_LINES).map(([name, v]) => [name, v.line]),
    ['snippet', SNIPPET.line],
  ];

  test('every line is a lowercase fragment with no trailing period and no dash punctuation', () => {
    for (const [name, line] of lines()) {
      expect(line, name).toMatch(/^[a-z]/);
      expect(line, name).not.toMatch(/\.$/);
      expect(line, name).not.toMatch(/[—–‘’]/);
      expect(line, name).not.toContain(' - ');
    }
  });
});

const toolkitDescribe = toolkitExpected() ? describe : describe.skip;

// vitest runs a skipped describe's body while collecting, so every read stays inside a test
toolkitDescribe('catalogue against the toolkit', () => {
  test('the toolkit checkout exists', () => {
    expect(existsSync(toolkitDir), `toolkit not found at ${toolkitDir} (set TOOLKIT_DIR)`).toBe(true);
  });

  test('every catalogue line belongs to a toolkit skill or rule', () => {
    const { skills, rules } = readToolkit();
    const known = new Set([...skills, ...rules].map((i) => i.name));
    expect(Object.keys(CATALOGUE_LINES).filter((n) => !known.has(n))).toEqual([]);
  });

  test('the mothertongue snippet doc exists', () => {
    expect(existsSync(join(toolkitDir, SNIPPET.path)), SNIPPET.path).toBe(true);
  });

  test('reports lines written against an older description', () => {
    const { skills, rules } = readToolkit();
    const drifted = [...skills, ...rules]
      .filter((i) => CATALOGUE_LINES[i.name] && CATALOGUE_LINES[i.name].desc !== fingerprint(i.description))
      .map((i) => `${i.name} (${CATALOGUE_LINES[i.name].desc} now ${fingerprint(i.description)})`);
    if (drifted.length) {
      console.warn(`catalogue lines written against an older description: ${drifted.join(', ')}`);
    }
  });
});
