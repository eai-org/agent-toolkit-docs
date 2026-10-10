import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { CATALOGUE_DESCRIPTION, SNIPPET, catalogueLine } from '../src/data/catalogue';
import { CHAIN_ROWS, chainTarget } from '../src/data/chain';
import { GROUPS, siblingsOf } from '../src/data/groups';
import { GITHUB_BLOB, readToolkit } from '../src/lib/toolkit';

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
const PR_REVIEW_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/let-ai-speed-up-both-sides-of-your-code-reviews-while-you-stay-in-full-control-3b059506ef39';
const RPA_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/the-refine-plan-act-pattern-for-agentic-ai-coding-59ee013e4427';
const FRESH_EYES_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/more-powerful-ai-reviews-with-fresh-eyes-bfad221748c0';
const HANDOVER_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/the-missing-step-in-agentic-coding-the-handover-d1963c3d2c1d';
const GRILL_ME_SOURCE = 'https://github.com/mattpocock/skills';
const VOICE_ARTICLE =
  'https://medium.com/engineering-in-the-age-of-ai/how-to-use-ai-to-generate-texts-that-sound-like-a-human-would-actually-write-them-c7eef78e0b42';
const MOTHERTONGUE_DOC =
  'https://github.com/eai-org/agent-toolkit/blob/main/docs/use-my-mothertongue-rule.md';
const AGENTWHEEL_DOC =
  'https://github.com/eai-org/agent-toolkit/blob/main/docs/install-with-agentwheel.md';
const SKILLSSH_DOC =
  'https://github.com/eai-org/agent-toolkit/blob/main/docs/install-skills.md#install-via-skillssh';
const PLUGIN_DOC =
  'https://github.com/eai-org/agent-toolkit/blob/main/docs/install-skills.md#install-via-claude-code-plugin-marketplace';
const README_INSTALL = 'https://github.com/eai-org/agent-toolkit#how-to-install-the-skills';

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
      '24-harden-artifact.cast',
      '10-execute-plan.cast',
      '22-split-plan-tasks.cast',
      '23-execute-plan-tasks.cast',
      '11-handover.cast',
      '13-review-ticket.cast',
      '21-verify-understanding.cast',
      '12-manual-test.cast',
      '18-check-ticket.cast',
    ],
    emDashes: 0,
    articles: [WORKFLOW_ARTICLE, RPA_ARTICLE, HANDOVER_ARTICLE, GRILL_ME_SOURCE],
    internalLinkLabels: ['See self-review on the fresh eyes page', 'How the fresh eyes review works'],
    noSkillLinks: ['fresh-eyes-review', 'self-review'],
  },
  {
    slug: 'pr-review-assistants',
    title: 'PR review assistants · agent-toolkit',
    description:
      "Code review is the new bottleneck. These skills assist both sides of it: triage the feedback your PR gets, and prepare your review of someone else's code. The agent suggests, you decide.",
    pageTitle: 'PR review assistants',
    heading: 'Help on both sides of the code review',
    casts: ['03-pr-review.cast', '17-review-code-assistant.cast', '20-maintainer-review.cast'],
    emDashes: 0,
    articles: [PR_REVIEW_ARTICLE],
    internalLinkLabels: [],
  },
  {
    slug: 'fresh-eyes-review',
    title: 'Fresh eyes review · agent-toolkit',
    description:
      "An AI agent reviewing its own code will tell you everything looks fine, while a fresh session finds the real problems. One command spawns a reviewing session with a clean context: it sees the changes but never the author's reasoning, and catches what the author can't.",
    pageTitle: 'Fresh eyes review',
    heading: 'Let a sub-agent review the code',
    casts: ['04-fresh-eyes.cast', '25-self-review.cast'],
    emDashes: 0,
    articles: [FRESH_EYES_ARTICLE],
    internalLinkLabels: [],
    noSkillLinks: ['harden-artifact', 'maintainer-review'],
  },
  {
    slug: 'context-hygiene',
    title: 'Context hygiene · agent-toolkit',
    description:
      'Give your project a lean agent setup, see what auto-loads before you even type, and trim it.',
    pageTitle: 'Context hygiene skills',
    heading: 'Your context is often cluttered before you even type',
    casts: ['05-context-checkup.cast', '16-memory-doctor.cast', '19-agentify-project.cast'],
    emDashes: 0,
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
    articles: [AUTHORING_ARTICLE],
    internalLinkLabels: ['Read more about this approach'],
  },
  {
    slug: 'talking-to-humans',
    title: 'Talking to humans · agent-toolkit',
    description:
      'Texts that sound like you typed them, and explanations people understand on the first read, even in a second language.',
    pageTitle: 'Talking to humans',
    heading: 'Texts that sound like you, explanations you understand',
    casts: ['07-explain-refactor.cast', '26-explain-simple.cast'],
    emDashes: 2,
    articles: [VOICE_ARTICLE, MOTHERTONGUE_DOC],
    internalLinkLabels: [],
  },
];

d.each(groupPages)('$slug page', ({ slug, title, description, pageTitle, heading, casts: pageCasts, emDashes, articles, internalLinkLabels = [], noSkillLinks = [] }) => {
  const doc = () => read(`dist/${slug}/index.html`);
  const url = () => `https://eai-org.github.io${baseFrom()}/${slug}/`;
  const group = () => {
    const found = GROUPS.find((g) => g.slug === slug);
    if (!found) throw new Error(`unknown group: ${slug}`);
    return found;
  };

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
    for (const skill of group().skills) {
      expect(doc(), skill).toContain(
        `href="https://github.com/eai-org/agent-toolkit/blob/main/skills/${skill}/SKILL.md"`,
      );
    }
    for (const rule of group().rules) {
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

  test('Keep going links the full catalogue', () => {
    const html = doc();
    const keep = html.slice(html.indexOf('Keep going</div>'));
    const section = keep.slice(0, keep.indexOf('</section>'));
    expect(section).toContain('Every skill and rule');
    expect(section).toContain(`href="${baseFrom()}/skills/"`);
  });

  test('has exactly as many Read links as its group lists', () => {
    expect((doc().match(/Read the SKILL\.md/g) ?? []).length).toBe(group().skills.length);
    expect((doc().match(/Read the rule/g) ?? []).length).toBe(group().rules.length);
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

d('cross-page block links', () => {
  test('fresh-eyes-review links harden-artifact to its block on task-workflow', () => {
    expect(read('dist/fresh-eyes-review/index.html')).toContain(
      `href="${baseFrom()}/task-workflow/#harden-artifact"`,
    );
    const workflow = read('dist/task-workflow/index.html');
    expect(workflow).toContain('id="harden-artifact"');
    expect(workflow).not.toContain('id="Execute the plan"');
    expect(workflow).not.toContain('id="fresh-eyes-review"');
  });

  test('self-review, maintainer-review and handover cross-links reach their blocks', () => {
    const b = baseFrom();
    const tw = read('dist/task-workflow/index.html');
    const fe = read('dist/fresh-eyes-review/index.html');
    expect(tw).toContain(`href="${b}/fresh-eyes-review/#self-review"`);
    expect(tw).not.toContain('id="self-review"');
    expect(fe).toContain('href="#self-review"');
    expect(fe).toContain(`href="${b}/pr-review-assistants/#maintainer-review"`);
    expect(fe).toContain(`href="${b}/task-workflow/#handover"`);
  });
});

d('homepage', () => {
  const ORDER = [
    'Give us a star on GitHub',
    'Different projects, same repetitive tasks',
    'Several groups of skills',
    'One routine, from ticket to pull request',
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

  test('skills chain chips link to a block that exists', () => {
    const html = read('dist/index.html');
    for (const row of CHAIN_ROWS) {
      for (const node of row.nodes) {
        const t = chainTarget(node);
        expect(html, t.text).toContain(`href="${baseFrom()}/${t.slug}/#${t.anchor}"`);
        expect(read(`dist/${t.slug}/index.html`), t.text).toContain(`id="${t.anchor}"`);
      }
    }
  });

  test('skills chain section carries its copy and nothing else', () => {
    const full = read('dist/index.html');
    const start = full.indexOf('id="skills-chain"');
    const html = full.slice(start, full.indexOf('Core ideas behind every skill')).replace(/\s+/g, ' ');
    expect(html).toContain('class="kicker text-purple">How they fit together<');
    expect(html).toContain("Follow them in this order, and skip the steps a small task doesn't need.");
    for (const row of CHAIN_ROWS) {
      expect(html, row.label).toContain(row.label);
      if (row.tail) {
        expect(html, row.tail.text).toContain(row.tail.text);
        expect(html, row.tail.command).toContain(row.tail.command);
      }
    }
    expect(html).toContain('href="https://github.com/eai-org/agent-toolkit/tree/main#artifact-relationships"');
    expect(html).toContain('target="_blank" rel="noopener"');
    expect(html).toContain('See how the skills connect, on GitHub &rarr;');

    let pos = -1;
    const nodes = CHAIN_ROWS.flatMap((r) => r.nodes);
    for (const node of nodes) {
      const t = chainTarget(node);
      const next = html.indexOf(`href="${baseFrom()}/${t.slug}/#${t.anchor}"`);
      expect(next, t.text).toBeGreaterThan(pos);
      pos = next;
    }
    expect(html.match(/class="chip/g)?.length).toBe(nodes.length);
    expect(html).not.toMatch(/<svg|<script|class="[^"]*\b(stage|grid)\b/);
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

  test('every card shows its derived count', () => {
    const html = read('dist/index.html');
    for (const group of GROUPS) expect(html, group.slug).toContain(`>${group.count}</span>`);
  });

  test('the two article links moved to their group pages', () => {
    const html = read('dist/index.html');
    expect(html).not.toContain('Read more about the task workflow');
    expect(html).not.toContain('Read more about the authoring skills');
    expect(html).not.toContain(WORKFLOW_ARTICLE);
  });

  test('the rules block links the full list on /skills/', () => {
    const html = read('dist/index.html');
    const href = `href="${baseFrom()}/skills/#rules"`;
    expect(html).toContain(href);
    const tag = html.slice(html.lastIndexOf('<a', html.indexOf(href)), html.indexOf('>', html.indexOf(href)));
    expect(tag).not.toContain('target=');
    expect(html).not.toContain('tree/main#rules');
  });

  test('whats-inside points to the catalogue', () => {
    const html = read('dist/index.html');
    const from = html.slice(html.indexOf('id="whats-inside"'));
    const section = from.slice(0, from.indexOf('</section>'));
    expect(section).toContain('Looking for one skill by name?');
    expect(section).toContain('Every skill and rule');
    expect(section).toContain(`href="${baseFrom()}/skills/"`);
  });

  test('the rules block links the mothertongue rule', () => {
    expect(read('dist/index.html')).toContain(
      'href="https://github.com/eai-org/agent-toolkit/blob/main/docs/use-my-mothertongue-rule.md"',
    );
  });

  const heroSlice = () => {
    const html = read('dist/index.html');
    const start = html.indexOf('id="install"');
    return html.slice(start, html.indexOf('Give us a star on GitHub', start));
  };

  test('the hero keeps the install anchor', () => {
    expect(read('dist/index.html')).toContain('id="install"');
  });

  test('the hero discloses auto-update and links the other install channels', () => {
    const hero = heroSlice();
    for (const url of [AGENTWHEEL_DOC, SKILLSSH_DOC, PLUGIN_DOC, README_INSTALL]) {
      expect(hero).toContain(`href="${url}"`);
    }
    expect(hero).toContain('--no-auto-update');
    expect(hero.split('Other ways to install').length - 1).toBe(1);
    expect(hero).not.toContain('Other ways to install &rarr;');
    expect(hero).not.toContain('Other ways to install →');
    expect(hero).not.toContain('target=');
  });

  test('the rules block links agentwheel', () => {
    const tag = read('dist/index.html').match(/<a [^>]*>\s*Install skills and rules together with agentwheel/);
    expect(tag).not.toBeNull();
    expect(tag![0]).toContain(`href="${AGENTWHEEL_DOC}"`);
    expect(tag![0]).toContain('target="_blank"');
  });

  test('no em dashes left on the homepage', () => {
    expect((read('dist/index.html').match(/—/g) ?? []).length).toBe(0);
  });
});

d('about page', () => {
  const doc = () => read('dist/about/index.html');

  test('carries its title and meta description', () => {
    expect(doc()).toContain('<title>About us · agent-toolkit</title>');
    expect(doc()).toContain(
      '<meta name="description" content="agent-toolkit is made by Engineering in the Age of AI: every skill and rule is used, tested and refined in real-world projects, and released as free software under the MIT license.">',
    );
  });

  test('"About us" is the only h1, over the EAI heading', () => {
    const headings = [...doc().matchAll(/<h1[^>]*>([^<]*)<\/h1>/g)].map((m) => m[1]);
    expect(headings).toEqual(['About us']);
    expect(doc()).toContain('>Engineering in the Age of AI</h2>');
  });

  test('links the three channels', () => {
    expect(doc()).toContain('href="https://medium.com/engineering-in-the-age-of-ai"');
    expect(doc()).toContain('href="https://discord.com/invite/QaMTM8Cqy5"');
    expect(doc()).toContain('href="https://www.linkedin.com/company/engineering-in-the-age-of-ai/"');
  });

  test('closes on the free software blurb', () => {
    expect(doc()).toMatch(/released\s+under the MIT license/);
    expect(doc()).toContain('href="https://github.com/eai-org/agent-toolkit"');
  });

  test('plays no demos', () => {
    expect(casts(doc())).toEqual([]);
  });
});

d('site-wide', () => {
  const PAGES = [
    'dist/index.html',
    'dist/about/index.html',
    'dist/skills/index.html',
    ...GROUPS.map((g) => `dist/${g.slug}/index.html`),
  ];

  test('every page was built', () => {
    for (const p of PAGES) expect(existsSync(p), p).toBe(true);
  });

  test('all casts play, each on exactly one page', () => {
    const seen = new Map<string, string[]>();
    for (const p of PAGES) {
      for (const m of new Set(casts(read(p)))) {
        seen.set(m, [...(seen.get(m) ?? []), p]);
      }
    }
    const specs = readdirSync('demos/specs').filter((f) => f.endsWith('.yaml'));
    expect(seen.size).toBe(specs.length);
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

  test('em dashes only on the talking-to-humans page', () => {
    for (const p of PAGES) {
      const count = (read(p).match(/—/g) ?? []).length;
      expect(count, p).toBe(p === 'dist/talking-to-humans/index.html' ? 2 : 0);
    }
  });

  test('install works from every page', () => {
    for (const p of PAGES) expect(read(p), p).toContain(`href="${baseFrom()}/#install"`);
  });

  test('the nav reaches the About page from every page', () => {
    for (const p of PAGES) expect(read(p), p).toContain(`href="${baseFrom()}/about/"`);
  });

  test('the nav reaches the catalogue from every page', () => {
    for (const p of PAGES) expect(read(p), p).toContain(`href="${baseFrom()}/skills/"`);
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

  test('every fragment link lands on an id, and no page repeats an id', () => {
    const ids = (html: string) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const esc = (x: string) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pageOf = (path: string) =>
      path ? `dist/${path.replace(/\/$/, '')}/index.html` : 'dist/index.html';
    for (const p of PAGES) {
      const html = read(p);
      const all = ids(html);
      const dupes = all.filter((id, i) => all.indexOf(id) !== i);
      expect(dupes, p).toEqual([]);
      for (const m of html.matchAll(/href="#([^"]+)"/g)) expect(all, `${p} #${m[1]}`).toContain(m[1]);
      const internal = new RegExp(`href="${esc(baseFrom())}/([^"#]*)#([^"]+)"`, 'g');
      for (const m of html.matchAll(internal)) {
        const target = pageOf(m[1]);
        expect(existsSync(target), `${p} -> ${target}`).toBe(true);
        expect(ids(read(target)), `${p} -> ${m[1]}#${m[2]}`).toContain(m[2]);
      }
    }
  });

  test('no separator line spans the full viewport width', () => {
    for (const p of PAGES) expect(read(p), p).not.toMatch(/<section[^>]*border-t/);
  });
});

d('task-workflow structure', () => {
  const html = () => read('dist/task-workflow/index.html');

  test('the strip boxes link to their phase, in order', () => {
    const hrefs = [...html().matchAll(/<a\b[^>]*\bclass="stage\b[^>]*>/g)].map(
      (m) => m[0].match(/href="([^"]*)"/)?.[1],
    );
    expect(hrefs).toEqual(['#fetch-ticket', '#refine-ticket', '#create-implementation-plan', '#act', '#consolidate']);
  });

  test('the extras sit in two sections after handover', () => {
    const doc = html();
    const order = [
      '>handover</h2>',
      '>Before you pick the ticket up</h2>',
      '>review-ticket</h2>',
      '>verify-understanding</h2>',
      '>Along the way</h2>',
      '>create-manual-test-instructions</h2>',
      '>check-ticket-implementation</h2>',
      '>grill-me</h2>',
      '>prepare-prompt</h2>',
      '>plans-directory</h2>',
      'Read more about the task workflow',
    ];
    let pos = -1;
    for (const s of order) {
      const next = doc.indexOf(s);
      expect(next, s).toBeGreaterThan(pos);
      pos = next;
    }
    expect(doc).not.toContain('Extra workflow skills');
  });
});

d('old /conversational-language URL', () => {
  test('redirects to /talking-to-humans/ under the build base', () => {
    const stub = read('dist/conversational-language/index.html');
    expect(stub).toContain(`content="0;url=${baseFrom()}/talking-to-humans/"`);
    expect(stub).toContain(`href="https://eai-org.github.io${baseFrom()}/talking-to-humans/"`);
  });
});

d('catalogue page', () => {
  const doc = () => read('dist/skills/index.html');
  const escape = (x: string) =>
    x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  const names = () => {
    const { skills, rules } = readToolkit();
    return { skills, rules };
  };

  test('carries its title and meta description', () => {
    expect(doc()).toContain('<title>Skills and rules · agent-toolkit</title>');
    expect(doc()).toContain(`<meta name="description" content="${CATALOGUE_DESCRIPTION}">`);
  });

  test('has one h1, the heading and the intro', () => {
    const headings = [...doc().matchAll(/<h1[^>]*>([^<]*)<\/h1>/g)].map((m) => m[1]);
    expect(headings).toEqual(['Skills and rules']);
    expect(doc()).toContain('>Every skill and rule, on one page</h2>');
    expect(doc()).toContain('Looking for one by name?');
    expect(casts(doc())).toEqual([]);
  });

  test('links every skill, rule and the snippet on GitHub', () => {
    const { skills, rules } = names();
    for (const s of skills) expect(doc(), s.name).toContain(`href="${GITHUB_BLOB}/skills/${s.name}/SKILL.md"`);
    for (const r of rules) expect(doc(), r.name).toContain(`href="${GITHUB_BLOB}/rules/${r.name}.md"`);
    expect(doc()).toContain(`href="${GITHUB_BLOB}/${SNIPPET.path}"`);
    expect(doc()).toContain('id="rules"');
  });

  test('links every group and every placed name to its block', () => {
    const { skills, rules } = names();
    const known = new Set([...skills, ...rules].map((i) => i.name));
    for (const g of GROUPS) {
      expect(doc(), g.slug).toContain(`href="${baseFrom()}/${g.slug}/"`);
      for (const n of [...g.skills, ...g.rules].filter((x) => known.has(x))) {
        expect(doc(), n).toContain(`href="${baseFrom()}/${g.slug}/#${n}"`);
        expect(read(`dist/${g.slug}/index.html`), n).toContain(`id="${n}"`);
      }
    }
  });

  test('shows every name once, rules only in the rules section', () => {
    const { skills, rules } = names();
    const html = doc();
    const rulesAt = html.indexOf('id="rules"');
    const count = (n: string) => [...html.matchAll(new RegExp(`<b class="sk">${n}</b>`, 'g'))];
    for (const s of skills) {
      const found = count(s.name);
      expect(found, s.name).toHaveLength(1);
      expect(found[0].index!, s.name).toBeLessThan(rulesAt);
    }
    for (const n of [...rules.map((r) => r.name), SNIPPET.name]) {
      const found = count(n);
      expect(found, n).toHaveLength(1);
      expect(found[0].index!, n).toBeGreaterThan(rulesAt);
    }
  });

  test('unplaced skills sit under Also in the toolkit', () => {
    const { skills } = names();
    const placed = new Set(GROUPS.flatMap((g) => g.skills));
    const unplaced = skills.filter((s) => !placed.has(s.name));
    const html = doc();
    if (!unplaced.length) return expect(html).not.toContain('Also in the toolkit');
    const from = html.indexOf('Also in the toolkit');
    const to = html.indexOf('id="rules"');
    expect(from).toBeGreaterThan(-1);
    for (const s of unplaced) {
      const at = html.indexOf(`<b class="sk">${s.name}</b>`);
      expect(at, s.name).toBeGreaterThan(from);
      expect(at, s.name).toBeLessThan(to);
    }
  });

  test('run-nx-checks row carries its chip and opt-out command', () => {
    expect(doc()).toContain('Nx workspaces only');
    expect(doc()).toContain('--exclude run-nx-checks');
  });

  test('every row shows its line', () => {
    const { skills, rules } = names();
    for (const i of [...skills, ...rules]) {
      expect(doc(), i.name).toContain(escape(catalogueLine(i.name, i.description)));
    }
    expect(doc()).toContain(escape(SNIPPET.line));
  });
});

describe('skills chain data', () => {
  test.each(CHAIN_ROWS.flatMap((r) => r.nodes).filter((n): n is string => typeof n === 'string'))(
    '%s sits in exactly one group',
    (name) => {
      expect(GROUPS.filter((g) => g.skills.includes(name)).length, name).toBe(1);
    },
  );
});
