import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { GROUPS } from '../src/data/groups';

// per AGENTS.md the page checks only run when a build is present
const d = existsSync('dist/index.html') ? describe : describe.skip;
const read = (p: string) => readFileSync(p, 'utf8');

// The site base is '/agent-toolkit-docs' on Pages and '' on SITE_BASE=/ preview builds, and
// the preview workflow sets SITE_BASE on its build step only. So read the base back out of the
// build itself, off the favicon link that Base.astro emits on every page.
const baseFrom = () => read('dist/index.html').match(/href="([^"]*)\/favicon\.svg"/)![1];

d('/workflow', () => {
  const html = () => read('dist/workflow/index.html');

  test('has its own h1 and intro', () => {
    expect(html()).toContain('From a ticket to shipped code');
    expect(html()).toContain('<h1');
  });

  test('lists its four skills', () => {
    for (const s of ['fetch-ticket', 'refine-ticket', 'create-implementation-plan', 'create-manual-test-instructions']) {
      expect(html()).toContain(s);
    }
  });

  test('carries the refine-ticket demo', () => {
    expect(html()).toContain('02-refine-ticket.cast');
  });

  test('links onward to two siblings and back to all groups', () => {
    expect(html()).toContain(`${baseFrom()}/reviews/`);
    expect(html()).toContain(`${baseFrom()}/hygiene/`);
    expect(html()).toContain(`${baseFrom()}/#whats-inside`);
  });
});

d('/reviews', () => {
  const html = () => read('dist/reviews/index.html');

  test('has its own h1', () => {
    expect(html()).toContain('Help on both sides of the review');
    expect(html()).toContain('<h1');
  });

  test('lists its four skills including fresh eyes', () => {
    for (const s of ['fetch-pr-review', 'refine-pr-review', 'review-code-assistant', 'fresh-eyes-review']) {
      expect(html()).toContain(s);
    }
  });

  test('carries both review demos', () => {
    expect(html()).toContain('03-pr-review.cast');
    expect(html()).toContain('04-fresh-eyes.cast');
  });

  test('keeps fresh eyes as its own sub-section', () => {
    expect(html()).toContain('Let a sub-agent take a fresh look');
  });
});

d('/hygiene', () => {
  const html = () => read('dist/hygiene/index.html');

  test('has its own h1', () => {
    expect(html()).toContain('Your context is often cluttered before you even type');
    expect(html()).toContain('<h1');
  });

  test('lists its two skills', () => {
    expect(html()).toContain('context-checkup');
    expect(html()).toContain('memory-doctor');
  });

  test('carries the context-checkup demo', () => {
    expect(html()).toContain('05-context-checkup.cast');
  });
});

d('/authoring', () => {
  const html = () => read('dist/authoring/index.html');

  test('has its own h1', () => {
    expect(html()).toContain('Create and improve the skills and docs your agents rely on');
    expect(html()).toContain('<h1');
  });

  test('lists its three skills', () => {
    for (const s of ['compact-docs-writer', 'compact-skill-creator', 'self-improve']) {
      expect(html()).toContain(s);
    }
  });

  test('carries the self-improve demo', () => {
    expect(html()).toContain('06-self-improve.cast');
  });
});

d('/conversational', () => {
  const html = () => read('dist/conversational/index.html');

  test('has its own h1', () => {
    expect(html()).toContain('Texts that sound like a real human typed them');
    expect(html()).toContain('<h1');
  });

  test('lists the skill and the rule', () => {
    expect(html()).toContain('use-conversational-language');
    expect(html()).toContain('write-realistic-texts');
  });

  test('carries the explain-refactor demo', () => {
    expect(html()).toContain('07-explain-refactor.cast');
  });

  test('keeps the deliberate em dash pair', () => {
    expect((html().match(/—/g) ?? []).length).toBe(2);
  });
});

d('homepage blocks', () => {
  const ORDER = [
    'Give us a star on GitHub',
    'Different projects, same repetitive tasks',
    'Refine, Plan, Act',
    'Five groups of skills',
    'Core ideas behind every skill',
    'A toolkit, not a framework',
    'Opinionated rules',
    'Got an issue or an idea? Please report it on GitHub.',
    'agent-toolkit · MIT',
  ];

  test.each(ORDER)('contains %s', (s) => expect(read('dist/index.html')).toContain(s));

  test('blocks appear in the approved order', () => {
    const html = read('dist/index.html');
    let pos = -1;
    for (const s of ORDER) {
      const next = html.indexOf(s);
      expect(next, s).toBeGreaterThan(pos);
      pos = next;
    }
  });

  test('carries exactly one demo, the hero', () => {
    const html = read('dist/index.html');
    const casts = [...html.matchAll(/0[0-9]-[a-z-]+\.cast/g)].map((m) => m[0]);
    expect(new Set(casts)).toEqual(new Set(['01-hero-voice.cast']));
  });

  test('has a card for every group, with the anchor Keep going targets', () => {
    const html = read('dist/index.html');
    expect(html).toContain('id="whats-inside"');
    for (const slug of ['workflow', 'reviews', 'hygiene', 'authoring', 'conversational']) {
      expect(html).toContain(`${baseFrom()}/${slug}/"`);
    }
  });

  test('no em dashes left on the homepage', () => {
    expect((read('dist/index.html').match(/—/g) ?? []).length).toBe(0);
  });
});

d('site-wide', () => {
  const PAGES = ['dist/index.html', ...GROUPS.map((g) => `dist/${g.slug}/index.html`)];

  test('every page was built', () => {
    for (const p of PAGES) expect(existsSync(p), p).toBe(true);
  });

  test('all seven casts play, each on exactly one page', () => {
    const seen = new Map<string, string[]>();
    for (const p of PAGES) {
      for (const m of new Set([...read(p).matchAll(/0[0-9]-[a-z-]+\.cast/g)].map((x) => x[0]))) {
        seen.set(m, [...(seen.get(m) ?? []), p]);
      }
    }
    expect(seen.size).toBe(7);
    for (const [cast, pages] of seen) expect(pages, cast).toHaveLength(1);
  });

  test('every page has its own canonical URL', () => {
    const canonicals = PAGES.map((p) => read(p).match(/rel="canonical" href="([^"]+)"/)?.[1]);
    expect(new Set(canonicals).size).toBe(PAGES.length);
    for (const c of canonicals) expect(c).toBeTruthy();
  });

  test('every page has its own title', () => {
    const titles = PAGES.map((p) => read(p).match(/<title>([^<]*)<\/title>/)?.[1]);
    for (const t of titles) expect(t).toBeTruthy();
    expect(new Set(titles).size).toBe(PAGES.length);
  });

  test('no curly apostrophes anywhere', () => {
    for (const p of PAGES) expect(read(p), p).not.toMatch(/[‘’]/);
  });

  test('em dashes only on /conversational', () => {
    for (const p of PAGES) {
      const count = (read(p).match(/—/g) ?? []).length;
      expect(count, p).toBe(p.includes('conversational') ? 2 : 0);
    }
  });

  test('install works from every page', () => {
    for (const p of PAGES) expect(read(p), p).toContain(`href="${baseFrom()}/#install"`);
  });
});
