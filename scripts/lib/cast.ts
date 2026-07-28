export type DemoEvent =
  | { input: string; skill?: string }
  | { output: string; color?: 'green' | 'pink' | 'muted'; diff?: boolean }
  | { spinner: string; duration?: number }
  | { options: { text: string; recommended?: boolean }[] };

export interface DemoSpec { cols: number; rows: number; seed: string; events: DemoEvent[] }

const FG = { green: '38;2;63;185;80', pink: '38;2;249;117;131', muted: '38;2;139;148;158' } as const;
const DIFF_BG = '48;2;27;46;40';
const ESC = '\u001b[';
const RESET = `${ESC}0m`;
const paint = (sgr: string, s: string) => `${ESC}${sgr}m${s}${RESET}`;

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function wrap(text: string, width: number): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    let line = '';
    for (const word of para.split(' ')) {
      if (line && (line + ' ' + word).length > width) { out.push(line); line = word; }
      else line = line ? line + ' ' + word : word;
    }
    out.push(line);
  }
  return out;
}

export function compileSpec(spec: DemoSpec): string {
  const rnd = mulberry32(fnv1a(spec.seed));
  const jitter = (min: number, max: number) => min + rnd() * (max - min);
  const events: [number, 'o', string][] = [];
  let t = 0.3;
  const emit = (data: string, dt = 0) => { t += dt; events.push([Number(t.toFixed(4)), 'o', data]); };
  const nl = '\r\n';
  const inner = spec.cols - 2;

  for (const ev of spec.events) {
    if ('input' in ev) {
      const skillLen = ev.skill ? ev.skill.length + 1 : 0;
      const width = spec.cols - 5;
      const rows: string[] = [];
      let line = '';
      let avail = width - skillLen;
      for (const word of ev.input ? ev.input.split(' ') : []) {
        if (line && (line + ' ' + word).length > avail) { rows.push(line); line = word; avail = width; }
        else line = line ? line + ' ' + word : word;
      }
      rows.push(line);
      const pad = (used: number) => `${' '.repeat(Math.max(0, spec.cols - used - 1))}│${nl}`;
      emit(`╭${'─'.repeat(inner)}╮${nl}│ > `, 0.15);
      if (ev.skill) { emit(paint(FG.green, ev.skill), jitter(0.1, 0.25)); emit(' ', 0.03); }
      for (const [i, row] of rows.entries()) {
        if (i > 0) emit(pad(4 + (i === 1 ? skillLen : 0) + rows[i - 1].length) + '│   ', 0.05);
        for (const ch of row) emit(ch, jitter(0.03, 0.08));
      }
      const lastUsed = 4 + (rows.length === 1 ? skillLen : 0) + rows[rows.length - 1].length;
      emit(pad(lastUsed) + `╰${'─'.repeat(inner)}╯${nl}`, 0.1);
    } else if ('spinner' in ev) {
      emit(paint(FG.muted, `✻ ${ev.spinner}`) + nl, 0.2);
      t += ev.duration ?? 1.2;
    } else if ('output' in ev) {
      const sgr = ev.diff ? `${FG.green};${DIFF_BG}` : ev.color && FG[ev.color];
      const linesOut = ev.diff ? [ev.output] : wrap(`⏺ ${ev.output}`, inner);
      for (const [i, line] of linesOut.entries()) {
        const txt = i === 0 ? line : `  ${line}`;
        emit((sgr ? paint(sgr, txt) : txt) + nl, i === 0 ? 0.25 : 0.06);
      }
    } else {
      for (const [i, opt] of ev.options.entries()) {
        const mark = opt.recommended ? '❯ ' : '  ';
        const rec = opt.recommended ? ' ' + paint(FG.green, '(recommended)') : '';
        emit(`  ${mark}${i + 1}. ${opt.text}${rec}${nl}`, 0.12);
      }
    }
    t += 0.4;
  }
  t += 1;
  emit('');

  const header = JSON.stringify({ version: 2, width: spec.cols, height: spec.rows });
  return [header, ...events.map((e) => JSON.stringify(e))].join('\n') + '\n';
}
