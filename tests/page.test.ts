import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { GROUPS, siblingsOf } from '../src/data/groups';

// per AGENTS.md the page checks only run when a build is present
const d = existsSync('dist/index.html') ? describe : describe.skip;
const read = (p: string) => readFileSync(p, 'utf8');

// The site base is '/agent-toolkit-docs' on Pages and '' on SITE_BASE=/ preview builds, and
// the preview workflow sets SITE_BASE on its build step only. So read the base back out of the
// build itself, off the favicon link that Base.astro emits on every page.
const baseFrom = () => read('dist/index.html').match(/href="([^"]*)\/favicon\.svg"/)![1];

const casts = (doc: string) => [...doc.matchAll(/\d{2}-[a-z-]+\.cast/g)].map((m) => m[0]);

const WORKFLOW_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/how-i-use-ai-agents-to-solve-programming-tasks-daily-2a68a5828b8e';
const AUTHORING_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd';
const CONTEXT_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-context-window-sharp-7255d83a8949';
const MEMORY_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-memory-clean-and-organized-with-memory-doctor-a79f7174f257';
const RPA_ARTICLE =
  'https://medium.com/@borzifrancesco/the-rpa-pattern-for-agentic-ai-coding-59ee013e4427';

// titles carry the entity encoding of the built HTML
const groupPages = [
  {
    slug: 'task-workflow',
    title: 'Task workflow · agent-toolkit',
    description:
      'Refine, plan, act, consolidate: turn a ticket into requirements, a plan, then reviewed code, with a clean handoff at every step.',
    pageTitle: 'Task workflow skills',
    heading: 'Refine, Plan, Act, Consolidate',
    casts: [
      '08-fetch-ticket.cast',
      '02-refine-ticket.cast',
      '09-create-plan.cast',
      '10-execute-plan.cast',
      '11-handover.cast',
      '12-manual-test.cast',
      '13-review-ticket.cast',
    ],
    emDashes: 0,
    skills: [
      'fetch-ticket',
      'refine-ticket',
      'create-implementation-plan',
      'handover',
      'create-manual-test-instructions',
      'review-ticket',
    ],
    rules: [],
    articles: [WORKFLOW_ARTICLE, RPA_ARTICLE],
    internalLinkLabels: ['See the fresh eyes review'],
    noSkillLinks: ['fresh-eyes-review'],
  },
  {
    slug: 'pr-review-assistants',
    title: 'PR review assistants · agent-toolkit',
    description:
      "Code review is still a key part of most teams' workflow. These skills assist in both directions: when others leave feedback on your PRs, and when you review someone else's code.",
    pageTitle: 'PR review assistants',
    heading: 'Help on both sides of the code review',
    casts: ['03-pr-review.cast'],
    emDashes: 0,
    skills: ['fetch-pr-review', 'refine-pr-review', 'review-code-assistant'],
    rules: [],
    articles: [],
    internalLinkLabels: [],
  },
  {
    slug: 'fresh-eyes-review',
    title: 'Fresh eyes review · agent-toolkit',
    description:
      'A fresh perspective works for AI just like it does for humans: a sub-agent with a clean context, seeing only the changeset and a minimal description, catches surprisingly more regressions and issues than the session that wrote the code.',
    pageTitle: 'Fresh eyes review',
    heading: 'Let a sub-agent review the code',
    casts: ['04-fresh-eyes.cast'],
    emDashes: 0,
    skills: ['fresh-eyes-review'],
    rules: [],
    articles: [],
    internalLinkLabels: [],
  },
  {
    slug: 'context-hygiene',
    title: 'Context hygiene · agent-toolkit',
    description:
      'See what auto-loads into your agent before you even type, and trim it without breaking anything.',
    pageTitle: 'Context hygiene skills',
    heading: 'Your context is often cluttered before you even type',
    casts: ['05-context-checkup.cast', '16-memory-doctor.cast'],
    emDashes: 0,
    skills: ['context-checkup', 'memory-doctor'],
    rules: [],
    articles: [CONTEXT_ARTICLE, MEMORY_ARTICLE],
    internalLinkLabels: [],
  },
  {
    slug: 'skills-docs-authoring',
    title: 'Skills &amp; docs authoring · agent-toolkit',
    description:
      'Write skills and docs your agents actually follow, and turn every correction into a lasting lesson.',
    pageTitle: 'Skills &amp; docs authoring',
    heading: 'Create and continuously improve the skills and docs your agents rely on',
    casts: ['14-compact-doc.cast', '15-create-skill.cast', '06-self-improve.cast'],
    emDashes: 0,
    skills: ['compact-docs-writer', 'compact-skill-creator', 'self-improve'],
    rules: ['compact-governing-docs', 'self-contained-docs', 'self-improve-on-correction'],
    articles: [AUTHORING_ARTICLE],
    internalLinkLabels: ['Read more about this approach'],
  },
  {
    slug: 'conversational-language',
    title: 'Conversational language · agent-toolkit',
    description: 'Texts that sound like a real human typed them, not sophisticated AI prose.',
    pageTitle: 'Conversational language',
    heading: 'Texts that sound like a real human typed them',
    casts: ['07-explain-refactor.cast'],
    emDashes: 2,
    skills: ['use-conversational-language'],
    rules: ['write-realistic-texts'],
    articles: [],
    internalLinkLabels: [],
  },
];

d.each(groupPages)('$slug page', ({ slug, title, description, pageTitle, heading, casts: pageCasts, emDashes, skills, rules, articles, internalLinkLabels = [], noSkillLinks = [] }) => {
  const doc = () => read(`dist/${slug}/index.html`);
  const url = () => `https://eai-org.github.io${baseFrom()}/${slug}/`;

  test('carries its title and meta description', () => {
    expect(doc()).toContain(`<title>${title}</title>`);
    expect(doc()).toContain(`<meta name="description" content="${description}">`);
  });

  test('canonical and og:url point at the page', () => {
    expect(doc()).toContain(`<link rel="canonical" href="${url()}">`);
    expect(doc()).toContain(`<meta property="og:url" content="${url()}">`);
  });

  test('the page title is the only h1', () => {
    const headings = [...doc().matchAll(/<h1[^>]*>([^<]*)<\/h1>/g)].map((m) => m[1]);
    expect(headings).toEqual([pageTitle]);
  });

  test('the old header heading survives as an h2, with no kicker label', () => {
    const at = doc().indexOf(`>${heading}</h2>`);
    expect(at).toBeGreaterThan(-1);
    // the footer cards carry kickers, so only the part up to the heading has to be free of them
    expect(doc().slice(0, at)).not.toMatch(/class="kicker/);
  });

  test('the separator lines span the content column, not the viewport', () => {
    expect(doc()).not.toMatch(/<section[^>]*border-t/);
    expect(doc()).toMatch(/max-w-page[^"]*border-t/);
  });

  test('plays its own demos, once each', () => {
    expect(casts(doc())).toEqual(pageCasts);
  });

  test('the install button reaches the homepage anchor', () => {
    expect(doc()).toContain(`href="${baseFrom()}/#install"`);
  });

  test('has a block per skill, each linking its SKILL.md on GitHub', () => {
    for (const skill of skills) {
      expect(doc(), skill).toContain(
        `href="https://github.com/eai-org/agent-toolkit/blob/main/skills/${skill}/SKILL.md"`,
      );
    }
    for (const rule of rules) {
      expect(doc(), rule).toContain(
        `href="https://github.com/eai-org/agent-toolkit/blob/main/rules/${rule}.md"`,
      );
    }
    for (const label of internalLinkLabels) {
      expect(doc(), label).toContain(label);
    }
    for (const skill of noSkillLinks) {
      expect(doc(), skill).not.toContain(
        `https://github.com/eai-org/agent-toolkit/blob/main/skills/${skill}/SKILL.md`,
      );
    }
  });

  test('links to its articles only where there are any', () => {
    if (articles.length === 0) expect(doc()).not.toContain('medium.com');
    for (const article of articles) expect(doc()).toContain(`href="${article}"`);
    for (const label of internalLinkLabels) expect(doc()).toContain(label);
  });

  test('keeps the copy guards', () => {
    expect((doc().match(/—/g) ?? []).length).toBe(emDashes);
    expect(doc()).not.toMatch(/[‘’]/);
  });
});

d('homepage', () => {
  const ORDER = [
    'Give us a star on GitHub',
    'Different projects, same repetitive tasks',
    'Several groups of skills',
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
    expect(casts(read('dist/index.html'))).toEqual(['01-hero-voice.cast']);
  });

  test('has a card for every group in the whats-inside grid', () => {
    const html = read('dist/index.html');
    expect(html).toContain('id="whats-inside"');
    for (const group of GROUPS) {
      expect(html, group.slug).toContain(`${baseFrom()}/${group.slug}/"`);
    }
  });

  test('the two article links moved to their group pages', () => {
    const html = read('dist/index.html');
    expect(html).not.toContain('Read more about the task workflow');
    expect(html).not.toContain('Read more about the authoring skills');
    expect(html).not.toContain(WORKFLOW_ARTICLE);
  });

  test('the rules block still links to the GitHub rules list', () => {
    expect(read('dist/index.html')).toContain('https://github.com/eai-org/agent-toolkit/tree/main#rules');
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

  test('all sixteen casts play, each on exactly one page', () => {
    const seen = new Map<string, string[]>();
    for (const p of PAGES) {
      for (const m of new Set(casts(read(p)))) {
        seen.set(m, [...(seen.get(m) ?? []), p]);
      }
    }
    expect(seen.size).toBe(16);
    for (const [cast, pages] of seen) expect(pages, cast).toHaveLength(1);
  });

  test('every page can switch theme, without a flash of the wrong one', () => {
    for (const p of PAGES) {
      expect(read(p), p).toContain('class="theme-toggle');
      // the pre-paint read has to stay inline in <head>, a bundled script runs too late
      expect(read(p), p).toMatch(/<script>[^<]*localStorage\.getItem\('theme'\)/);
    }
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

  test('em dashes only on the conversational page', () => {
    for (const p of PAGES) {
      const count = (read(p).match(/—/g) ?? []).length;
      expect(count, p).toBe(p.includes('conversational') ? 2 : 0);
    }
  });

  test('install works from every page', () => {
    for (const p of PAGES) expect(read(p), p).toContain(`href="${baseFrom()}/#install"`);
  });

  test('every group page keeps going to its two siblings and the full grid', () => {
    for (const group of GROUPS) {
      const html = read(`dist/${group.slug}/index.html`);
      const siblings = siblingsOf(group.slug).map((g) => g.slug);
      // the page links to its own URL from the canonical tag, so only the other five are telling
      for (const other of GROUPS.filter((g) => g.slug !== group.slug)) {
        const linked = html.includes(`href="${baseFrom()}/${other.slug}/"`);
        expect(linked, `${group.slug} -> ${other.slug}`).toBe(siblings.includes(other.slug));
      }
      expect(html, group.slug).toContain(`${baseFrom()}/#whats-inside"`);
    }
  });

  test('no separator line spans the full viewport width', () => {
    for (const p of PAGES) expect(read(p), p).not.toMatch(/<section[^>]*border-t/);
  });
});
