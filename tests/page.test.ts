import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

const html = readFileSync('dist/index.html', 'utf8');

const mustContain = [
  'Different projects, same repetitive tasks',
  'Core ideas behind every skill',
  'A minimalistic toolkit, not a framework',
  'Refine, Plan, Act',
  'Help on both sides of the code review',
  'Let a sub-agent review the code',
  'Your context is often cluttered before you even type',
  'Create and continuously improve the skills and docs your agents rely on',
  'Texts that sound like a real human typed them',
  'Opinionated rules',
  'Got an issue or an idea? Please report it on GitHub.',
  'agent-toolkit · MIT',
  'Give us a star on GitHub',
  'Other ways to install',
];

describe('homepage content', () => {
  test.each(mustContain)('contains %s', (s) => expect(html).toContain(s));

  test('blocks appear in the approved order', () => {
    let pos = -1;
    for (const s of mustContain.slice(0, 12)) {
      const next = html.indexOf(s);
      expect(next, s).toBeGreaterThan(pos);
      pos = next;
    }
  });

  test('all seven casts are referenced once each', () => {
    const casts = [...html.matchAll(/0[0-9]-[a-z-]+\.cast/g)].map((m) => m[0]);
    expect(new Set(casts).size).toBe(7);
  });

  test('the only em dashes are the conversational bullet pair', () => {
    expect((html.match(/—/g) ?? []).length).toBe(2);
  });

  test('no curly apostrophes', () => {
    expect(html).not.toMatch(/[‘’]/);
  });
});
