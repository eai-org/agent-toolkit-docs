import { describe, expect, test } from 'vitest';
import { compileSpec, type DemoSpec } from '../scripts/lib/cast';

const base: DemoSpec = {
  cols: 72, rows: 20, seed: 'test',
  events: [
    { input: 'Draft an answer for my colleague', skill: '/use-conversational-language' },
    { spinner: 'Drafting in a human voice…', duration: 0.5 },
    { output: '"good catch, I extracted the duplicate code to a shared method"', color: 'green' },
    { options: [{ text: 'exclude them', recommended: true }, { text: 'include, flagged' }] },
  ],
};

const lines = (cast: string) => cast.trimEnd().split('\n');

describe('compileSpec', () => {
  test('emits a valid v2 header', () => {
    const header = JSON.parse(lines(compileSpec(base))[0]);
    expect(header).toMatchObject({ version: 2, width: 72, height: 20 });
  });

  test('is deterministic for the same seed and differs across seeds', () => {
    expect(compileSpec(base)).toBe(compileSpec(base));
    expect(compileSpec({ ...base, seed: 'other' })).not.toBe(compileSpec(base));
  });

  test('events are [time, "o", string] with increasing time', () => {
    const evs = lines(compileSpec(base)).slice(1).map((l) => JSON.parse(l));
    let prev = -1;
    for (const [t, kind, data] of evs) {
      expect(kind).toBe('o');
      expect(typeof data).toBe('string');
      expect(t).toBeGreaterThanOrEqual(prev);
      prev = t;
    }
  });

  test('input renders a box and the skill name in green', () => {
    const cast = compileSpec(base);
    expect(cast).toContain('╭');
    expect(cast).toContain('╰');
    expect(cast).toContain('\\u001b[38;2;63;185;80m/use-conversational-language');
  });

  test('long output word-wraps at cols - 2', () => {
    const spec: DemoSpec = { cols: 40, rows: 10, seed: 'w', events: [{ output: 'x'.repeat(35) + ' ' + 'y'.repeat(35) }] };
    const printed = lines(compileSpec(spec)).slice(1).map((l) => JSON.parse(l)[2]).join('');
    for (const row of printed.split('\r\n')) {
      expect(row.replace(/\u001b\[[0-9;]*m/g, '').length).toBeLessThanOrEqual(40);
    }
  });

  test('long input wraps inside the box, every row within cols', () => {
    const spec: DemoSpec = { cols: 40, rows: 10, seed: 'i', events: [{ input: ('word '.repeat(20)).trim() }] };
    const printed = lines(compileSpec(spec)).slice(1).map((l) => JSON.parse(l)[2]).join('');
    const rows = printed.split('\r\n').filter((r) => r.length > 0);
    expect(rows.length).toBeGreaterThan(3);
    for (const row of rows) {
      const plain = row.replace(/\u001b\[[0-9;]*m/g, '');
      expect(plain.length).toBeLessThanOrEqual(40);
      if (plain.startsWith('│')) expect(plain.endsWith('│')).toBe(true);
    }
  });

  test('options mark the recommended entry', () => {
    const cast = compileSpec(base);
    expect(cast).toContain('❯');
    expect(cast).toContain('(recommended)');
  });

  test('diff output uses the blended green background', () => {
    const spec: DemoSpec = { cols: 60, rows: 10, seed: 'd', events: [{ output: '+ Keep helper methods private unless they are used outside the class.', diff: true }] };
    expect(compileSpec(spec)).toContain('48;2;27;46;40');
  });
});
