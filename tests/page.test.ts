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

const WORKFLOW_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/how-i-use-ai-agents-to-solve-programming-tasks-daily-2a68a5828b8e';
const AUTHORING_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd';
const CONTEXT_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-context-window-sharp-7255d83a8949';
const MEMORY_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-memory-clean-and-organized-with-memory-doctor-a79f7174f257';

// labels and titles carry the entity encoding of the built HTML
const groupLinks = [
  ['task-workflow', 'More about the task workflow'],
  ['pr-review-assistants', 'More about the review assistants'],
  ['fresh-eyes-review', 'More about the fresh eyes review'],
  ['context-hygiene', 'More about context &amp; memory hygiene'],
  ['skills-docs-authoring', 'More about the authoring skills'],
  ['conversational-language', 'More about the conversational voice'],
] as const;

const navLinks = [
  ['task-workflow', 'Task workflow'],
  ['pr-review-assistants', 'PR review assistants'],
  ['fresh-eyes-review', 'Fresh eyes review'],
  ['context-hygiene', 'Context hygiene'],
  ['skills-docs-authoring', 'Skills &amp; docs authoring'],
  ['conversational-language', 'Conversational language'],
] as const;

const casts = (doc: string) => [...doc.matchAll(/0[0-9]-[a-z-]+\.cast/g)].map((m) => m[0]);

// the nav anchor's attributes, or null when the link is missing
const navAttrs = (doc: string, slug: string, label: string) =>
  doc.match(new RegExp(`<a href="/agent-toolkit-docs/${slug}/"([^>]*)>${label}</a>`))?.[1] ?? null;

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

  test('the hero demo is the only cast on the homepage', () => {
    expect(casts(html)).toEqual(['01-hero-voice.cast']);
  });

  test.each(groupLinks)('links to the %s page', (slug, label) => {
    expect(html).toContain(`<a class="more-link" href="/agent-toolkit-docs/${slug}/">${label} &rarr;</a>`);
  });

  test.each(navLinks)('the nav links to the %s page', (slug, label) => {
    expect(navAttrs(html, slug, label)).not.toBeNull();
  });

  test('the nav links are separated by decorative middots', () => {
    expect(html.match(/aria-hidden="true">&middot;<\/span>/g)).toHaveLength(navLinks.length - 1);
  });

  test('no nav link is marked as the current page', () => {
    expect(html).not.toContain('aria-current');
  });

  test('the two article links moved to their group pages', () => {
    expect(html).not.toContain('Read more about the task workflow');
    expect(html).not.toContain('Read more about the authoring skills');
    expect(html).not.toContain(WORKFLOW_ARTICLE);
  });

  test('the rules block still links to the GitHub rules list', () => {
    expect(html).toContain('https://github.com/eai-org/agent-toolkit/tree/main#rules');
  });

  test('the only em dashes are the conversational bullet pair', () => {
    expect((html.match(/—/g) ?? []).length).toBe(2);
  });

  test('no curly apostrophes', () => {
    expect(html).not.toMatch(/[‘’]/);
  });
});

const groupPages = [
  {
    slug: 'task-workflow',
    title: 'Task workflow · agent-toolkit',
    description: 'A development workflow suitable for any kind of project',
    pageTitle: 'Task workflow skills',
    heading: 'Refine, Plan, Act',
    cast: '02-refine-ticket.cast',
    emDashes: 0,
    skills: ['fetch-ticket', 'refine-ticket', 'create-implementation-plan', 'create-manual-test-instructions'],
    rules: [],
    articles: [WORKFLOW_ARTICLE],
  },
  {
    slug: 'pr-review-assistants',
    title: 'PR review assistants · agent-toolkit',
    description:
      "Code review is still a key part of most teams' workflow. These skills assist in both directions: when others leave feedback on your PRs, and when you review someone else's code.",
    pageTitle: 'PR review assistants',
    heading: 'Help on both sides of the code review',
    cast: '03-pr-review.cast',
    emDashes: 0,
    skills: ['fetch-pr-review', 'refine-pr-review', 'review-code-assistant'],
    rules: [],
    articles: [],
  },
  {
    slug: 'fresh-eyes-review',
    title: 'Fresh eyes review · agent-toolkit',
    description:
      'A fresh perspective works for AI just like it does for humans: a sub-agent with a clean context, seeing only the changeset and a minimal description, catches surprisingly more regressions and issues than the session that wrote the code.',
    pageTitle: 'Fresh eyes review',
    heading: 'Let a sub-agent review the code',
    cast: '04-fresh-eyes.cast',
    emDashes: 0,
    skills: ['fresh-eyes-review'],
    rules: [],
    articles: [],
  },
  {
    slug: 'context-hygiene',
    title: 'Context hygiene · agent-toolkit',
    description: 'Your context is often cluttered before you even type',
    pageTitle: 'Context hygiene skills',
    heading: 'Your context is often cluttered before you even type',
    cast: '05-context-checkup.cast',
    emDashes: 0,
    skills: ['context-checkup', 'memory-doctor'],
    rules: [],
    articles: [CONTEXT_ARTICLE, MEMORY_ARTICLE],
  },
  {
    slug: 'skills-docs-authoring',
    title: 'Skills &amp; docs authoring · agent-toolkit',
    description: 'Create and continuously improve the skills and docs your agents rely on',
    pageTitle: 'Skills &amp; docs authoring',
    heading: 'Create and continuously improve the skills and docs your agents rely on',
    cast: '06-self-improve.cast',
    emDashes: 0,
    skills: ['compact-docs-writer', 'compact-skill-creator', 'self-improve'],
    rules: [],
    articles: [AUTHORING_ARTICLE],
  },
  {
    slug: 'conversational-language',
    title: 'Conversational language · agent-toolkit',
    description: 'Texts that sound like a real human typed them',
    pageTitle: 'Conversational language',
    heading: 'Texts that sound like a real human typed them',
    cast: '07-explain-refactor.cast',
    emDashes: 2,
    skills: ['use-conversational-language'],
    rules: ['write-realistic-texts'],
    articles: [],
  },
];

describe.each(groupPages)('$slug page', ({ slug, title, description, pageTitle, heading, cast, emDashes, skills, rules, articles }) => {
  const doc = readFileSync(`dist/${slug}/index.html`, 'utf8');
  const url = `https://eai-org.github.io/agent-toolkit-docs/${slug}/`;

  test('carries its title and meta description', () => {
    expect(doc).toContain(`<title>${title}</title>`);
    expect(doc).toContain(`<meta name="description" content="${description}">`);
  });

  test('canonical and og:url point at the page', () => {
    expect(doc).toContain(`<link rel="canonical" href="${url}">`);
    expect(doc).toContain(`<meta property="og:url" content="${url}">`);
  });

  test('the page title is the only h1', () => {
    const headings = [...doc.matchAll(/<h1[^>]*>([^<]*)<\/h1>/g)].map((m) => m[1]);
    expect(headings).toEqual([pageTitle]);
  });

  test('the old header heading survives as an h2, with no kicker label', () => {
    expect(doc).toContain(`>${heading}</h2>`);
    expect(doc).not.toMatch(/class="kicker/);
  });

  test('the separator lines span the content column, not the viewport', () => {
    expect(doc).not.toMatch(/<section[^>]*border-t/);
    expect(doc).toMatch(/max-w-page[^"]*border-t/);
  });

  test('plays its own demo, once', () => {
    expect(casts(doc)).toEqual([cast]);
  });

  test('the nav marks this page and links to the other five', () => {
    for (const [navSlug, label] of navLinks) {
      const attrs = navAttrs(doc, navSlug, label);
      expect(attrs, navSlug).not.toBeNull();
      expect(attrs!.includes('aria-current="page"'), navSlug).toBe(navSlug === slug);
    }
  });

  test('the install button reaches the homepage anchor', () => {
    expect(doc).toContain('href="/agent-toolkit-docs/#install"');
  });

  test('has a block per skill, each linking its SKILL.md on GitHub', () => {
    for (const skill of skills) {
      expect(doc, skill).toContain(
        `href="https://github.com/eai-org/agent-toolkit/blob/main/skills/${skill}/SKILL.md"`,
      );
    }
    for (const rule of rules) {
      expect(doc, rule).toContain(
        `href="https://github.com/eai-org/agent-toolkit/blob/main/rules/${rule}.md"`,
      );
    }
  });

  test('links to its articles only where there are any', () => {
    if (articles.length === 0) expect(doc).not.toContain('medium.com');
    for (const article of articles) expect(doc).toContain(`href="${article}"`);
  });

  test('keeps the copy guards', () => {
    expect((doc.match(/—/g) ?? []).length).toBe(emDashes);
    expect(doc).not.toMatch(/[‘’]/);
  });
});
