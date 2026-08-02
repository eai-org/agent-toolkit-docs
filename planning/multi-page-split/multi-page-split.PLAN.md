# Multi-page split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the agent-toolkit-docs homepage, which today carries 12 sections and 7 looping terminal demos, into a short overview homepage plus five group pages.

**Architecture:** Astro static site, one page per route under `src/pages/`. A single data module (`src/data/groups.ts`) defines the five groups so the homepage cards, the sibling links on each group page, and the tests all read the same list. Three new presentational components (`GroupCard`, `SkillBlock`, `KeepGoing`) plus small edits to `Section` and `Nav`. Content moves out of five section components into the page files that replace them; no demo cast or build script changes.

**Tech Stack:** Astro 5, TypeScript, Tailwind v4 (CSS-first config in `src/styles/global.css`), vitest, asciinema-player. Node 22 in CI.

## Global Constraints

- **Copy rules:** no dashes as punctuation of any kind (literal names keep their hyphens); straight apostrophes only, never curly; short, human, non-salesy. The only deliberate em dashes on the whole site are the pair in the use-conversational-language bullet and the pink demo replies.
- **`planning/website.COPY.md` is the authoritative copy doc.** It gets rewritten in Task 9 to match what this plan builds. Until then, the strings in this plan are authoritative.
- **Internal links must be base-aware:** build every internal href from `import.meta.env.BASE_URL`. The site deploys under `base: '/agent-toolkit-docs'` (`astro.config.mjs:7`), and PR previews build with `SITE_BASE=/`. A bare `href="/workflow"` breaks the deployed site.
- **Design tokens** come from `src/styles/global.css`: `bg #0D1117`, `panel #161B22`, `panel2 #1C2128`, `border #30363D`, `text #E6EDF3`, `muted #8B949E`, `green #3FB950`, `blue #58A6FF`, `orange #D29922`, `purple #BC8CFF`, `pink #F97583`, `--radius-card 10px`. Use the existing utility classes (`kicker`, `bullets`, `more-link`, `chip`, `stage`) rather than new CSS wherever they fit.
- **Hue per group** stays as designed: workflow green, reviews orange, hygiene blue, authoring purple, conversational blue, rules pink. Green doubles as the general accent.
- **No new npm dependencies.** No binaries or build output committed.
- **Demos are generated.** Never edit a `.cast` file. This plan changes no `demos/specs/*.yaml` and no script under `scripts/`.
- **Link to group pages with a trailing slash** (`${base}/workflow/`). Astro's default `build.format` is `directory`, so each route builds to `dist/<slug>/index.html`; a link without the trailing slash costs a redirect hop on GitHub Pages.
- **Never hardcode the site base, in source or in tests.** `astro.config.mjs` reads `base: process.env.SITE_BASE ?? '/agent-toolkit-docs'`, `.github/workflows/deploy.yml` builds with the default, and `.github/workflows/preview.yml` builds every PR with `SITE_BASE=/` and then runs `npx vitest run` against that build. `AGENTS.md` states the rule outright. Source builds every href from `import.meta.env.BASE_URL`; tests call the `baseFrom()` helper defined in Task 1, which reads the base back out of the built HTML. Deriving it from `process.env.SITE_BASE` at test time does not work: the preview workflow sets that variable on its build step only, not on its test step.
- **Validation command** for every task: `npm run build && npx vitest run`. `npm run build` triggers `prebuild` (compile demos, generate llms.txt, generate the social card); `generate-llms.ts` reads `../agent-toolkit/docs/core-philosophy.md`, which exists locally, so no `TOOLKIT_DIR` override is needed.
- **Git, as authorized on 2026-08-01:** work happens on the `multi-page-split` branch, and each task ends with a commit of the files that task names. Nothing is pushed, no branch is merged, and nothing already in the working tree gets committed along the way. The tree carried unrelated in-flight edits when this branch was cut (`.gitignore`, `AGENTS.md`, `astro.config.mjs`, `.github/workflows/preview.yml`), so stage explicitly by path and never `git add -A` or `git add .`.

---

## File Structure

**Create:**
- `src/data/groups.ts` — the five group definitions plus sibling lookup. Single source of truth for slugs, kickers, hues, card copy.
- `src/lib/stars.ts` — memoized GitHub star count, so six pages do not make six API calls per build.
- `src/components/GroupCard.astro` — one card, full or compact.
- `src/components/SkillBlock.astro` — mono skill name, text, optional demo.
- `src/components/KeepGoing.astro` — two sibling cards plus the all-groups link.
- `src/components/sections/WhatsInside.astro` — the homepage five-card block.
- `src/pages/workflow.astro`, `reviews.astro`, `hygiene.astro`, `authoring.astro`, `conversational.astro`.

**Modify:**
- `src/components/Section.astro` — optional heading level, so group pages get a real `h1`.
- `src/components/Nav.astro` — base-aware install anchor, optional back arrow, memoized stars.
- `src/layouts/Base.astro` — pass a `back` flag through to `Nav`.
- `src/pages/index.astro` — new block list.
- `src/components/sections/Workflow.astro` — drop the demo, retarget the footer link.
- `src/components/sections/Principles.astro` — drop panel chrome, shorten lines.
- `src/components/sections/Philosophy.astro` — three comparison rows per column, new heading.
- `src/components/sections/Rules.astro` — tightened bullets.
- `tests/page.test.ts` — rewritten for six pages.
- `planning/website.COPY.md`, `planning/website.DESIGN.md`, `planning/website.DECISIONS.md`.

**Delete** (content moves into the matching page file):
- `src/components/sections/Reviews.astro`, `FreshEyes.astro`, `Hygiene.astro`, `Authoring.astro`, `Conversational.astro`.

**Untouched:** `DemoPlayer.astro`, `TerminalWindow.astro`, `Hero.astro`, `Problem.astro`, `Feedback.astro`, `Feedback`/footer markup in `Base.astro`, every file under `demos/`, `public/demos/`, `scripts/`, `tests/cast.test.ts`, `.github/workflows/deploy.yml`, `AGENTS.md`.

## Decisions already made (do not relitigate)

- Five group pages, not seven. Fresh eyes is a sub-section of `/reviews`; opinionated rules stays a homepage block with no page and no demo.
- Route names (`/workflow`, `/reviews`, `/hygiene`, `/authoring`, `/conversational`) come from the deferred-pages table in `planning/website.DECISIONS.md`, so nothing is renamed against a prior decision.
- The hue-to-class maps stay inline in each component rather than being shared from `groups.ts`. Tailwind v4 scans source files for literal class names; keeping `text-green` and friends inside `.astro` files removes any doubt that the classes survive the build.
- Out of scope: sitemap, catalog page, `/core-concepts`, a `/rules` page, new casts, Lucide icons, custom domain, analytics enablement.
- `.gitignore` already covers the design session's scratch files (`*.superpowers` at `.gitignore:7` matches `.superpowers/`), so no change is needed there.

---

### Task 1: Group data, memoized stars, and the shared component edits

Foundation every later task imports. Ends with the homepage still rendering exactly as it does today, but with a base-aware install link and one star fetch per build instead of one per page.

**Files:**
- Create: `src/data/groups.ts`
- Create: `src/lib/stars.ts`
- Modify: `src/components/Section.astro`
- Modify: `src/components/Nav.astro`
- Modify: `src/layouts/Base.astro`
- Test: `tests/page.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `Hue = 'green' | 'blue' | 'orange' | 'purple' | 'pink'`
  - `interface Group { slug: string; kicker: string; hue: Hue; title: string; line: string; count: string; wide?: boolean }`
  - `GROUPS: Group[]` (order: workflow, reviews, hygiene, authoring, conversational)
  - `groupBySlug(slug: string): Group` (throws on unknown slug)
  - `siblingsOf(slug: string): Group[]` (the next two in `GROUPS` order, wrapping)
  - `starLabel(): Promise<string | null>` from `src/lib/stars.ts`
  - `Section.astro` gains `level?: 1 | 2`, default `2`
  - `Base.astro` gains `back?: boolean`, default `false`

- [ ] **Step 1: Write the failing test**

Replace the whole body of `tests/page.test.ts` with this. It keeps the checks that still apply to today's homepage and adds the new install-link assertion. Later tasks extend this file further.

```ts
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

// per AGENTS.md the page checks only run when a build is present
const d = existsSync('dist/index.html') ? describe : describe.skip;
const read = (p: string) => readFileSync(p, 'utf8');

// The site base is '/agent-toolkit-docs' on Pages and '' on SITE_BASE=/ preview builds, and
// the preview workflow sets SITE_BASE on its build step only. So read the base back out of the
// build itself, off the favicon link that Base.astro emits on every page.
const baseFrom = () => read('dist/index.html').match(/href="([^"]*)\/favicon\.svg"/)![1];

d('homepage', () => {
  test('the install button points at the homepage anchor, not a bare hash', () => {
    const html = read('dist/index.html');
    expect(html).toContain(`href="${baseFrom()}/#install"`);
  });

  test('no curly apostrophes', () => {
    expect(read('dist/index.html')).not.toMatch(/[‘’]/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/page.test.ts`
Expected: FAIL on the install button test. Today `src/components/Nav.astro:15` renders `href="#install"`.

- [ ] **Step 3: Create the group data module**

Create `src/data/groups.ts`:

```ts
export type Hue = 'green' | 'blue' | 'orange' | 'purple' | 'pink';

export interface Group {
  /** route segment under the site base, e.g. 'workflow' */
  slug: string;
  kicker: string;
  hue: Hue;
  title: string;
  /** one-line card description */
  line: string;
  /** what sits bottom-left on the card */
  count: string;
  /** spans both columns of the homepage grid */
  wide?: boolean;
}

export const GROUPS: Group[] = [
  {
    slug: 'workflow',
    kicker: 'Task workflow',
    hue: 'green',
    title: 'Refine, plan, act',
    line: 'Turn a ticket into requirements, a plan, then code, with a clean handoff at every step.',
    count: '4 skills',
  },
  {
    slug: 'reviews',
    kicker: 'Code review',
    hue: 'orange',
    title: 'Both sides of the review',
    line: "Triage the feedback your PR gets, review someone else's code, or send in a sub-agent with fresh eyes.",
    count: '4 skills',
  },
  {
    slug: 'hygiene',
    kicker: 'Context & memory',
    hue: 'blue',
    title: 'Keep the context lean',
    line: 'See what auto-loads before you even type, and trim it without breaking anything.',
    count: '2 skills',
  },
  {
    slug: 'authoring',
    kicker: 'Skill & doc authoring',
    hue: 'purple',
    title: 'Teach your agent',
    line: 'Write skills and docs agents actually follow, and turn every correction into a lasting lesson.',
    count: '3 skills',
  },
  {
    slug: 'conversational',
    kicker: 'Conversational voice',
    hue: 'blue',
    title: 'Texts that sound like a real human typed them',
    line: 'No em dashes, no "this valuable feedback". Just what you would have written yourself, faster.',
    count: '1 skill + 1 rule',
    wide: true,
  },
];

export function groupBySlug(slug: string): Group {
  const group = GROUPS.find((g) => g.slug === slug);
  if (!group) throw new Error(`unknown group: ${slug}`);
  return group;
}

/** the next two groups in GROUPS order, wrapping past the end */
export function siblingsOf(slug: string): Group[] {
  const i = GROUPS.findIndex((g) => g.slug === slug);
  if (i < 0) throw new Error(`unknown group: ${slug}`);
  return [GROUPS[(i + 1) % GROUPS.length], GROUPS[(i + 2) % GROUPS.length]];
}
```

The conversational count reads `1 skill + 1 rule` on purpose: write-realistic-texts is a rule, not a skill.

- [ ] **Step 4: Create the memoized star count**

Astro builds every page in one process, so module state is shared. Without this, six pages mean six unauthenticated GitHub API calls per build against a 60-per-hour-per-IP limit on shared CI runners.

Create `src/lib/stars.ts`:

```ts
let cached: string | null | undefined;

/** '★ 1,234', or null when the API is unreachable or errors */
export async function starLabel(): Promise<string | null> {
  if (cached !== undefined) return cached;
  try {
    const r = await fetch('https://api.github.com/repos/eai-org/agent-toolkit');
    cached = r.ok
      ? `★ ${((await r.json()).stargazers_count as number).toLocaleString('en-US')}`
      : null;
  } catch {
    cached = null; // offline build: no count
  }
  return cached;
}
```

- [ ] **Step 5: Give Section an optional heading level**

Group pages need exactly one `h1` each; today the only `h1` on the site is the hero wordmark and `Section.astro` always renders `h2`. Replace the whole of `src/components/Section.astro` with:

```astro
---
interface Props {
  kicker: string;
  color: 'green' | 'blue' | 'orange' | 'purple' | 'pink';
  heading?: string;
  center?: boolean;
  id?: string;
  level?: 1 | 2;
}
const { kicker, color, heading, center = false, id, level = 2 } = Astro.props;
const kickerColor = {
  green: 'text-green', blue: 'text-blue', orange: 'text-orange',
  purple: 'text-purple', pink: 'text-pink',
}[color];
const Heading = `h${level}` as 'h1' | 'h2';
---
<section id={id} class:list={['border-t border-border py-14 px-6', center && 'text-center']}>
  <div class="max-w-page mx-auto">
    <div class:list={['kicker', kickerColor]}>{kicker}</div>
    {heading && (
      <Heading class:list={[level === 1 ? 'text-3xl' : 'text-2xl', 'font-bold mb-3']}>
        {heading}
      </Heading>
    )}
    <slot />
  </div>
</section>
```

- [ ] **Step 6: Fix the nav install anchor, add the back arrow, use the memoized stars**

Replace the whole of `src/components/Nav.astro` with:

```astro
---
import { starLabel } from '../lib/stars';
interface Props { back?: boolean }
const { back = false } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const stars = await starLabel();
---
<nav class="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-border">
  <div class="max-w-page mx-auto flex items-center justify-between px-6 py-3">
    <a href={`${base}/`} class="font-mono font-bold text-green no-underline">
      {back && <span aria-hidden="true">&larr; </span>}agent-toolkit
    </a>
    <div class="flex items-center gap-4">
      <a href="https://github.com/eai-org/agent-toolkit" class="font-mono text-[13px] text-text no-underline hover:text-green">
        GitHub{stars && <span class="text-muted"> {stars}</span>}
      </a>
      <a href={`${base}/#install`} class="font-mono text-[13px] font-bold text-bg bg-green rounded-md px-3 py-1 no-underline">Install</a>
    </div>
  </div>
</nav>
```

- [ ] **Step 7: Let Base pass the back flag through**

In `src/layouts/Base.astro`, change the props interface and the `Nav` usage. The interface becomes `interface Props { title: string; description: string; back?: boolean }`, destructure `const { title, description, back = false } = Astro.props;`, and render `<Nav back={back} />` in place of `<Nav />`. Leave the rest of the file, including the `base` constant and every meta tag, exactly as it is.

- [ ] **Step 8: Run the test to verify it passes**

Run: `npm run build && npx vitest run`
Expected: PASS, both `tests/page.test.ts` and `tests/cast.test.ts`.

---

### Task 2: The /workflow page

First group page, and the one that introduces the three shared components every other group page uses.

**Files:**
- Create: `src/components/GroupCard.astro`
- Create: `src/components/SkillBlock.astro`
- Create: `src/components/KeepGoing.astro`
- Create: `src/pages/workflow.astro`
- Test: `tests/page.test.ts`

**Interfaces:**
- Consumes: `GROUPS`, `Group`, `siblingsOf` from `src/data/groups.ts`; `Section.astro` with its `level?: 1 | 2` prop; `Base.astro` with its `back?: boolean` prop.
- Produces:
  - `GroupCard.astro` props: `{ group: Group; compact?: boolean }`
  - `SkillBlock.astro` props: `{ name: string; cast?: string; cols?: number; rows?: number; label?: string }`, body text in the default slot
  - `KeepGoing.astro` props: `{ current: string }` (a group slug)
  - route `/workflow` building to `dist/workflow/index.html`

- [ ] **Step 1: Write the failing test**

Append to `tests/page.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/page.test.ts`
Expected: FAIL, `ENOENT` on `dist/workflow/index.html`.

- [ ] **Step 3: Create the group card**

Create `src/components/GroupCard.astro`. The compact form drops the description, the count and the arrow; it is what the sibling links at the foot of each group page use.

```astro
---
import type { Group } from '../data/groups';
interface Props { group: Group; compact?: boolean }
const { group, compact = false } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const hue = {
  green: 'text-green', blue: 'text-blue', orange: 'text-orange',
  purple: 'text-purple', pink: 'text-pink',
}[group.hue];
---
<a href={`${base}/${group.slug}/`}
   class:list={[
     'block bg-panel border border-border rounded-card px-4 py-3 no-underline text-text hover:border-muted',
     group.wide && !compact && 'md:col-span-2',
   ]}>
  <div class:list={['kicker', hue]}>{group.kicker}</div>
  <div class="font-bold">{group.title}</div>
  {!compact && (
    <>
      <p class="text-muted text-[13px] leading-snug mt-1">{group.line}</p>
      <div class="flex justify-between items-center mt-2.5 font-mono text-[12px]">
        <span class="text-muted">{group.count}</span>
        <span class="text-blue">Open &rarr;</span>
      </div>
    </>
  )}
</a>
```

- [ ] **Step 4: Create the skill block**

Create `src/components/SkillBlock.astro`. A skill with no demo renders text only; nothing is padded out for symmetry.

```astro
---
import DemoPlayer from './DemoPlayer.astro';
interface Props { name: string; cast?: string; cols?: number; rows?: number; label?: string }
const { name, cast, cols, rows, label } = Astro.props;
---
<div class="border-t border-border first:border-t-0 py-5">
  <h3 class="font-mono text-[15px] font-bold mb-1.5">{name}</h3>
  <p class="text-muted leading-relaxed"><slot /></p>
  {cast && (
    <div class="mt-4">
      <DemoPlayer cast={cast} cols={cols!} rows={rows!} label={label!} />
    </div>
  )}
</div>
```

- [ ] **Step 5: Create the keep-going block**

Create `src/components/KeepGoing.astro`:

```astro
---
import GroupCard from './GroupCard.astro';
import { siblingsOf } from '../data/groups';
interface Props { current: string }
const { current } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const siblings = siblingsOf(current);
---
<section class="border-t border-border py-10 px-6">
  <div class="max-w-page mx-auto">
    <div class="text-muted text-[13px] mb-3">Keep going</div>
    <div class="grid md:grid-cols-2 gap-3">
      {siblings.map((group) => <GroupCard group={group} compact />)}
    </div>
    <p class="mt-4">
      <a class="more-link" href={`${base}/#whats-inside`}>All five groups &rarr;</a>
    </p>
  </div>
</section>
```

- [ ] **Step 6: Create the page**

Create `src/pages/workflow.astro`. The demo keeps the exact `cast`, `cols`, `rows` and `label` it has today in `src/components/sections/Workflow.astro`.

```astro
---
import Base from '../layouts/Base.astro';
import Section from '../components/Section.astro';
import SkillBlock from '../components/SkillBlock.astro';
import KeepGoing from '../components/KeepGoing.astro';
---
<Base
  title="Task workflow · agent-toolkit"
  description="Refine, plan, act: turn a ticket into requirements, a plan, then code, with a clean handoff at every step."
  back
>
  <Section kicker="Task workflow" color="green" heading="From a ticket to shipped code" level={1}>
    <p class="text-muted">A development workflow suitable for any kind of project</p>
    <div class="mt-5">
      <SkillBlock name="fetch-ticket">
        pulls a ticket from your tracker into a self-contained TICKET.md
      </SkillBlock>
      <SkillBlock name="refine-ticket" cast="02-refine-ticket" cols={72} rows={9}
        label="refine-ticket asking a grilling question">
        grills you until the WHAT is unambiguous, then writes REQUIREMENTS.md
      </SkillBlock>
      <SkillBlock name="create-implementation-plan">
        turns the requirements into a PLAN.md a fresh session can execute
      </SkillBlock>
      <SkillBlock name="create-manual-test-instructions">
        writes the QA steps someone who did not build it can follow
      </SkillBlock>
    </div>
    <p class="mt-5"><a class="more-link" target="_blank" rel="noopener"
      href="https://medium.com/engineering-in-the-age-of-ai/how-i-use-ai-agents-to-solve-programming-tasks-daily-2a68a5828b8e">
      Read more about the task workflow &rarr;</a></p>
  </Section>
  <KeepGoing current="workflow" />
</Base>
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npm run build && npx vitest run`
Expected: PASS.

---

### Task 3: The /reviews page

The heaviest group page: four skills, two demos, and one sub-section.

**Files:**
- Create: `src/pages/reviews.astro`
- Test: `tests/page.test.ts`

**Interfaces:**
- Consumes: `Base.astro` (`title`, `description`, `back`), `Section.astro` (`kicker`, `color`, `heading`, `level`), `SkillBlock.astro` (`name`, `cast`, `cols`, `rows`, `label`, default slot), `KeepGoing.astro` (`current`).
- Produces: route `/reviews` building to `dist/reviews/index.html`.

- [ ] **Step 1: Write the failing test**

Append to `tests/page.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/page.test.ts`
Expected: FAIL, `ENOENT` on `dist/reviews/index.html`.

- [ ] **Step 3: Create the page**

Create `src/pages/reviews.astro`. Both demos keep the exact `cast`, `cols`, `rows` and `label` they have today in `src/components/sections/Reviews.astro` and `FreshEyes.astro`. The fresh eyes sub-section sits inside the same `Section` so the page keeps one hairline rhythm.

```astro
---
import Base from '../layouts/Base.astro';
import Section from '../components/Section.astro';
import SkillBlock from '../components/SkillBlock.astro';
import KeepGoing from '../components/KeepGoing.astro';
---
<Base
  title="Code review · agent-toolkit"
  description="Skills for both sides of the code review: triage the feedback your PR gets, review someone else's code, or send in a sub-agent with fresh eyes."
  back
>
  <Section kicker="Code review" color="orange" heading="Help on both sides of the review" level={1}>
    <p class="text-muted">
      Code review is still a key part of most teams' workflow. These skills assist in both
      directions: when <b>others leave feedback on your PRs</b>, and when <b>you review someone
      else's code</b>.
    </p>
    <div class="mt-5">
      <SkillBlock name="fetch-pr-review">
        downloads every comment your PR received into one self-contained document that
        refine-pr-review can pick up
      </SkillBlock>
      <SkillBlock name="refine-pr-review" cast="03-pr-review" cols={72} rows={18}
        label="fetch-pr-review and refine-pr-review triaging comments">
        walks the feedback with you, comment by comment: address it, address part of it, or push
        back
      </SkillBlock>
      <SkillBlock name="review-code-assistant">
        reviews someone else's PR locally, works for self-review too. Suggests human-voiced
        comments and explanations. <b>You</b> decide what to post
      </SkillBlock>
    </div>
    <div class="border-t border-border mt-8 pt-8">
      <h2 class="text-xl font-bold mb-3">Let a sub-agent take a fresh look</h2>
      <p class="text-muted">
        A fresh perspective works for AI just like it does for humans. A sub-agent with a clean
        context, seeing only the changeset and a short brief, catches more than the session that
        wrote the code.
      </p>
      <div class="mt-5">
        <SkillBlock name="fresh-eyes-review" cast="04-fresh-eyes" cols={72} rows={10}
          label="fresh-eyes-review returning three findings">
          spawns one sub-agent with a clean context, then hands you its findings with options for
          what to do about them
        </SkillBlock>
      </div>
    </div>
  </Section>
  <KeepGoing current="reviews" />
</Base>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run build && npx vitest run`
Expected: PASS.

---

### Task 4: The /hygiene page

**Files:**
- Create: `src/pages/hygiene.astro`
- Test: `tests/page.test.ts`

**Interfaces:**
- Consumes: `Base.astro` (`title`, `description`, `back`), `Section.astro` (`kicker`, `color`, `heading`, `level`), `SkillBlock.astro` (`name`, `cast`, `cols`, `rows`, `label`, default slot), `KeepGoing.astro` (`current`).
- Produces: route `/hygiene` building to `dist/hygiene/index.html`.

- [ ] **Step 1: Write the failing test**

Append to `tests/page.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/page.test.ts`
Expected: FAIL, `ENOENT` on `dist/hygiene/index.html`.

- [ ] **Step 3: Create the page**

Create `src/pages/hygiene.astro`. The demo keeps the exact `cast`, `cols`, `rows` and `label` it has today in `src/components/sections/Hygiene.astro`. The two skill descriptions are today's bullet texts, unchanged.

```astro
---
import Base from '../layouts/Base.astro';
import Section from '../components/Section.astro';
import SkillBlock from '../components/SkillBlock.astro';
import KeepGoing from '../components/KeepGoing.astro';
---
<Base
  title="Context & memory hygiene · agent-toolkit"
  description="See what auto-loads into your agent before you even type, and trim it without breaking anything."
  back
>
  <Section kicker="Context & memory hygiene" color="blue"
    heading="Your context is often cluttered before you even type" level={1}>
    <div class="mt-2">
      <SkillBlock name="context-checkup" cast="05-context-checkup" cols={72} rows={11}
        label="context-checkup proposing a trim">
        audits everything that auto-loads at startup (governing docs, skills, MCP servers),
        measures the token cost and proposes lean, reversible trims
      </SkillBlock>
      <SkillBlock name="memory-doctor">
        drains the agent's auto-memory block by block, relocating each entry to a home you control
        or archiving it. You confirm every action
      </SkillBlock>
    </div>
  </Section>
  <KeepGoing current="hygiene" />
</Base>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run build && npx vitest run`
Expected: PASS.

---

### Task 5: The /authoring page

**Files:**
- Create: `src/pages/authoring.astro`
- Test: `tests/page.test.ts`

**Interfaces:**
- Consumes: `Base.astro` (`title`, `description`, `back`), `Section.astro` (`kicker`, `color`, `heading`, `level`), `SkillBlock.astro` (`name`, `cast`, `cols`, `rows`, `label`, default slot), `KeepGoing.astro` (`current`).
- Produces: route `/authoring` building to `dist/authoring/index.html`.

- [ ] **Step 1: Write the failing test**

Append to `tests/page.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/page.test.ts`
Expected: FAIL, `ENOENT` on `dist/authoring/index.html`.

- [ ] **Step 3: Create the page**

Create `src/pages/authoring.astro`. The demo keeps the exact `cast`, `cols`, `rows` and `label` it has today in `src/components/sections/Authoring.astro`, and the Medium footer link is the one that section carries today.

```astro
---
import Base from '../layouts/Base.astro';
import Section from '../components/Section.astro';
import SkillBlock from '../components/SkillBlock.astro';
import KeepGoing from '../components/KeepGoing.astro';
---
<Base
  title="Skill & doc authoring · agent-toolkit"
  description="Write skills and docs your agents actually follow, and turn every correction into a lasting lesson."
  back
>
  <Section kicker="Skill & doc authoring" color="purple"
    heading="Create and improve the skills and docs your agents rely on" level={1}>
    <div class="mt-2">
      <SkillBlock name="compact-docs-writer">
        writes docs with maximum token economy
      </SkillBlock>
      <SkillBlock name="compact-skill-creator">
        creates or edits skills, combining compact-docs-writer with a set of best practices for
        effective skills
      </SkillBlock>
      <SkillBlock name="self-improve" cast="06-self-improve" cols={72} rows={17}
        label="self-improve capturing a lesson as a doc diff">
        when the agent makes a mistake or doesn't behave the way you want, this skill captures the
        lesson so it won't repeat the same mistake again
      </SkillBlock>
    </div>
    <p class="mt-5"><a class="more-link" target="_blank" rel="noopener"
      href="https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd">
      Read more about the authoring skills &rarr;</a></p>
  </Section>
  <KeepGoing current="authoring" />
</Base>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run build && npx vitest run`
Expected: PASS.

---

### Task 6: The /conversational page

Carries the site's only two deliberate em dashes, in the use-conversational-language description.

**Files:**
- Create: `src/pages/conversational.astro`
- Test: `tests/page.test.ts`

**Interfaces:**
- Consumes: `Base.astro` (`title`, `description`, `back`), `Section.astro` (`kicker`, `color`, `heading`, `level`), `SkillBlock.astro` (`name`, `cast`, `cols`, `rows`, `label`, default slot), `KeepGoing.astro` (`current`).
- Produces: route `/conversational` building to `dist/conversational/index.html`.

- [ ] **Step 1: Write the failing test**

Append to `tests/page.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/page.test.ts`
Expected: FAIL, `ENOENT` on `dist/conversational/index.html`.

- [ ] **Step 3: Create the page**

Create `src/pages/conversational.astro`. The demo keeps the exact `cast`, `cols`, `rows` and `label` it has today in `src/components/sections/Conversational.astro`. Both skill descriptions are today's bullet texts, unchanged, including the em dash pair.

```astro
---
import Base from '../layouts/Base.astro';
import Section from '../components/Section.astro';
import SkillBlock from '../components/SkillBlock.astro';
import KeepGoing from '../components/KeepGoing.astro';
---
<Base
  title="Conversational voice · agent-toolkit"
  description="Texts that sound like a real human typed them, not sophisticated AI prose."
  back
>
  <Section kicker="Conversational voice" color="blue"
    heading="Texts that sound like a real human typed them" level={1}>
    <p class="text-muted">We often ask AI to help draft texts that other people will read:</p>
    <div class="mt-5">
      <SkillBlock name="use-conversational-language" cast="07-explain-refactor" cols={72} rows={16}
        label="use-conversational-language rewriting a refactor explanation">
        tells the agent to write in simple, human language instead of sophisticated AI prose full
        of — em dashes — and fancy terms
      </SkillBlock>
      <SkillBlock name="write-realistic-texts">
        opt-in rule that applies the human voice automatically whenever a text is meant for other
        humans (code comments, PR replies, chat messages…)
      </SkillBlock>
    </div>
  </Section>
  <KeepGoing current="conversational" />
</Base>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run build && npx vitest run`
Expected: PASS.

---

### Task 7: The overview homepage

The payoff task: 12 sections drop to 8 and 7 demos drop to 1. At the end of this task the five group section components are gone and the homepage routes to the pages built in Tasks 2 to 6.

**Files:**
- Create: `src/components/sections/WhatsInside.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/components/sections/Workflow.astro`
- Modify: `src/components/sections/Principles.astro`
- Modify: `src/components/sections/Philosophy.astro`
- Modify: `src/components/sections/Rules.astro`
- Delete: `src/components/sections/Reviews.astro`, `FreshEyes.astro`, `Hygiene.astro`, `Authoring.astro`, `Conversational.astro`
- Test: `tests/page.test.ts`

**Interfaces:**
- Consumes: `GROUPS` from `src/data/groups.ts`; `GroupCard.astro` with props `{ group: Group; compact?: boolean }`; `Section.astro` with props `{ kicker, color, heading?, center?, id?, level? }`.
- Produces: `WhatsInside.astro` (no props), rendering a section with `id="whats-inside"` that `KeepGoing.astro` anchors to.

- [ ] **Step 1: Write the failing test**

Append to `tests/page.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/page.test.ts`
Expected: FAIL. Today's homepage has no `Five groups of skills`, seven casts, and the heading reads `A minimalistic toolkit, not a framework`.

- [ ] **Step 3: Create the cards block**

Create `src/components/sections/WhatsInside.astro`:

```astro
---
import Section from '../Section.astro';
import GroupCard from '../GroupCard.astro';
import { GROUPS } from '../../data/groups';
---
<Section kicker="What's inside" color="blue" heading="Five groups of skills" id="whats-inside">
  <div class="grid md:grid-cols-2 gap-3 mt-4">
    {GROUPS.map((group) => <GroupCard group={group} />)}
  </div>
</Section>
```

- [ ] **Step 4: Slim the workflow section**

In `src/components/sections/Workflow.astro`: delete the `DemoPlayer` import and its `<DemoPlayer ... />` line, tighten the four stage descriptions, and retarget the footer link at the new page. Replace the whole file with:

```astro
---
import Section from '../Section.astro';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
---
<Section kicker="Task workflow" color="green" heading="Refine, Plan, Act">
  <p class="text-muted">A development workflow suitable for any kind of project</p>
  <div class="grid items-stretch gap-1.5 my-4 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
    <div class="stage border-border"><b class="text-muted">Ticket</b><span>download <b class="file">TICKET.md</b> or write it yourself</span></div>
    <span class="arrow">&rarr;</span>
    <div class="stage border-green"><b class="text-green">Refine</b><span>defines the <b>WHAT</b>, outputs <b class="file">REQUIREMENTS.md</b></span></div>
    <span class="arrow">&rarr;</span>
    <div class="stage border-blue"><b class="text-blue">Plan</b><span>defines the <b>HOW</b>, outputs <b class="file">PLAN.md</b></span></div>
    <span class="arrow">&rarr;</span>
    <div class="stage border-orange"><b class="text-orange">Act</b><span>executes the plan, writes code, runs checks</span></div>
  </div>
  <p><a class="more-link" href={`${base}/workflow/`}>See the workflow in action &rarr;</a></p>
</Section>
```

- [ ] **Step 5: Slim the principles section**

Six ideas stay, the panel chrome goes. Six bordered boxes sitting directly under five bordered cards was the heaviest stretch of the page. Replace the whole of `src/components/sections/Principles.astro` with:

```astro
---
import Section from '../Section.astro';
---
<Section kicker="Principles" color="green" heading="Core ideas behind every skill">
  <div class="grid md:grid-cols-2 gap-x-10 gap-y-3 mt-4">
    <div>
      <b>Keep the context window sharp</b>
      <span class="text-muted block text-[13.5px]">Atomic skills: one job each, nothing else loaded.
        <a class="more-link" target="_blank" rel="noopener" href="https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-context-window-sharp-7255d83a8949">why &rarr;</a></span>
    </div>
    <div>
      <b>Offload to files, pick up fresh</b>
      <span class="text-muted block text-[13.5px]">Every phase ends in a doc a new session can pick up.
        <a class="more-link" target="_blank" rel="noopener" href="https://medium.com/@borzifrancesco/the-rpa-pattern-for-agentic-ai-coding-59ee013e4427">how &rarr;</a></span>
    </div>
    <div>
      <b>Human in the loop</b>
      <span class="text-muted block text-[13.5px]">The agent recommends, you decide. Nothing runs behind your back.</span>
    </div>
    <div>
      <b>Never guess</b>
      <span class="text-muted block text-[13.5px]">It reads the existing code first and asks you when in doubt.</span>
    </div>
    <div>
      <b>Learn from mistakes</b>
      <span class="text-muted block text-[13.5px]">Every correction becomes a durable lesson.
        <a class="more-link" target="_blank" rel="noopener" href="https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd">more &rarr;</a></span>
    </div>
    <div>
      <b>Versatile by design</b>
      <span class="text-muted block text-[13.5px]">Any project, any stack, team or solo.</span>
    </div>
  </div>
</Section>
```

- [ ] **Step 6: Slim the philosophy section**

Five comparison rows per column drop to three; the two that went were saying what the others already said. Replace the whole of `src/components/sections/Philosophy.astro` with:

```astro
---
import Section from '../Section.astro';
---
<Section kicker="Philosophy" color="green" heading="A toolkit, not a framework">
  <p class="text-muted">
    Great frameworks exist that auto-activate around everything you do. This one deliberately takes
    the other road:
  </p>
  <div class="grid md:grid-cols-2 gap-3 mt-4">
    <div class="bg-panel border border-border rounded-card px-4 py-3">
      <div class="font-mono font-bold text-muted mb-2">auto-activating frameworks</div>
      <ul class="bullets text-muted">
        <li>a whole methodology</li>
        <li>the agent drives</li>
        <li>fuller context, less to remember</li>
      </ul>
    </div>
    <div class="bg-panel border border-border rounded-card px-4 py-3">
      <div class="font-mono font-bold text-green mb-2">agent-toolkit</div>
      <ul class="bullets">
        <li>use only the parts you need</li>
        <li>you drive, the agent assists</li>
        <li>lean context, predictable behavior</li>
      </ul>
    </div>
  </div>
</Section>
```

- [ ] **Step 7: Tighten the rules section**

Bullet text shortens and the `and more…` bullet goes, since the footer link already says it. Replace the whole of `src/components/sections/Rules.astro` with:

```astro
---
import Section from '../Section.astro';
---
<Section kicker="Opinionated rules" color="pink">
  <p class="text-muted">
    Optional and not installed by default: get them all with
    <code class="font-mono text-[12px] bg-panel2 border border-border rounded px-1.5">./install-opinionated-rules.sh</code>
    or pick only the ones you want. Examples:
  </p>
  <ul class="bullets my-4">
    <li><b class="sk">git-read-only-by-default</b> <span class="text-muted">no commits, pushes or resets unless you asked for them</span></li>
    <li><b class="sk">no-ai-attribution</b> <span class="text-muted">your work stays yours: no AI co-author, no "generated with" footer</span></li>
    <li><b class="sk">no-nonsense-comments</b> <span class="text-muted">only comments a future reader with zero context still needs</span></li>
  </ul>
  <p><a class="more-link" target="_blank" rel="noopener"
    href="https://github.com/eai-org/agent-toolkit/tree/main#rules">
    Check the full list of available rules &rarr;</a></p>
</Section>
```

- [ ] **Step 8: Rewrite the homepage**

Replace the whole of `src/pages/index.astro` with:

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/sections/Hero.astro';
import Problem from '../components/sections/Problem.astro';
import Workflow from '../components/sections/Workflow.astro';
import WhatsInside from '../components/sections/WhatsInside.astro';
import Principles from '../components/sections/Principles.astro';
import Philosophy from '../components/sections/Philosophy.astro';
import Rules from '../components/sections/Rules.astro';
import Feedback from '../components/sections/Feedback.astro';
---
<Base
  title="agent-toolkit · skills and rules for AI coding agents"
  description="Minimalistic skills and rules for AI coding agents that assist your daily work in any software engineering project"
>
  <Hero />
  <Problem />
  <Workflow />
  <WhatsInside />
  <Principles />
  <Philosophy />
  <Rules />
  <Feedback />
</Base>
```

- [ ] **Step 9: Delete the five relocated section components**

Delete `src/components/sections/Reviews.astro`, `src/components/sections/FreshEyes.astro`, `src/components/sections/Hygiene.astro`, `src/components/sections/Authoring.astro`, `src/components/sections/Conversational.astro`. Their content now lives in the pages built in Tasks 3, 4, 5 and 6. Nothing imports them after Step 8.

- [ ] **Step 10: Run the test to verify it passes**

Run: `npm run build && npx vitest run`
Expected: PASS.

---

### Task 8: Site-wide guarantees

Cross-page checks that no single page task can make: every cast still plays somewhere, every card leads to a page that exists, and the copy rules hold across all six pages.

**Files:**
- Test: `tests/page.test.ts`

**Interfaces:**
- Consumes: `GROUPS` from `src/data/groups.ts` (imported into the test so the check cannot drift from the data).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write the failing test**

Append to `tests/page.test.ts`, and add `import { GROUPS } from '../src/data/groups';` to the top of the file:

```ts
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

  test('every page has its own canonical URL and title', () => {
    const canonicals = PAGES.map((p) => read(p).match(/rel="canonical" href="([^"]+)"/)?.[1]);
    expect(new Set(canonicals).size).toBe(PAGES.length);
    for (const c of canonicals) expect(c).toBeTruthy();
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
```

- [ ] **Step 2: Run the test to verify it passes**

Run: `npm run build && npx vitest run`
Expected: PASS. If the cast test fails, a demo was duplicated or dropped during Tasks 2 to 7; fix the page rather than the test.

- [ ] **Step 3: Delete the now-redundant early assertions**

Task 1 added a homepage install-link test and a curly-apostrophe test that the site-wide block now covers for all six pages. Delete that block, the one whose describe title is exactly `homepage`. Keep every other block, including `homepage blocks` from Task 7, which is a different block. Re-run `npx vitest run` and confirm it still passes.

---

### Task 9: Update the planning docs

`AGENTS.md` names `planning/website.COPY.md` as the authoritative copy, so the docs have to catch up with the build or the next session will work from stale instructions.

**Files:**
- Modify: `planning/website.COPY.md`
- Modify: `planning/website.DESIGN.md`
- Modify: `planning/website.DECISIONS.md`

**Interfaces:**
- Consumes: the finished site from Tasks 1 to 8.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Load the compaction skill**

These are governing docs referenced from `AGENTS.md`, and the user's global rules require the matching compaction skill to be invoked before editing such a doc, up front rather than as a later cleanup. Invoke `/compact-docs-writer` and follow it for every edit in this task.

- [ ] **Step 2: Restructure the copy doc**

In `planning/website.COPY.md`, replace the single homepage section list with two parts: the eight homepage blocks in order (hero, the problem, task workflow, what's inside, principles, philosophy, opinionated rules, share your feedback, then the footer), and one section per group page carrying that page's kicker, heading, intro, skill descriptions, demo, and footer link. Take every string from the built pages so the doc matches what shipped. Keep the existing preamble about bullet rendering, mono skill names and demo line prefixes, and update its note about which section carries the deliberate em dashes to say `/conversational`.

- [ ] **Step 3: Update the design doc**

In `planning/website.DESIGN.md`: replace the homepage skeleton block order with the eight blocks above; move the group page template out of the deferred section and describe it as shipping, with the rules it actually follows (kicker plus `h1` plus one paragraph in the header, one block per skill with its demo directly beneath, sub-sections only where a group holds a genuinely distinct idea, a Keep going block with two siblings plus the all-groups link); and in the demo lineup record which page each of the seven casts now lives on.

- [ ] **Step 4: Update the decisions doc**

In `planning/website.DECISIONS.md`: replace the scope note saying v1 ships as a one-page site with the shipped site map (`/`, `/workflow`, `/reviews`, `/hygiene`, `/authoring`, `/conversational`). In the deferred-pages table, remove the rows now built and keep `/core-concepts`, `/rules` and the catalog page as still deferred, noting that fresh eyes shipped as a sub-section of `/reviews` rather than its own page. Leave the tech, demo, marketing and acceptance-criteria sections alone.

- [ ] **Step 5: Verify nothing else references the old structure**

Run: `grep -rn "one-page\|one page\|seven demos\|deferred" AGENTS.md planning/*.md`
Read each hit and fix any that now contradicts the shipped site. `AGENTS.md` itself should need no change: it points at the three docs by name and they keep their names, and its note about deliberate em dashes stays true now that they live on `/conversational`.

- [ ] **Step 6: Final validation**

Run: `npm run build && npx vitest run`
Expected: PASS. Then run `npm run dev` and click through all six pages: every homepage card opens its page, every group page gets you back via the wordmark and onward via Keep going, and the Install button works from each one.

---

## Acceptance criteria

- **AC-1** The homepage has eight blocks and exactly one demo player → Task 7.
- **AC-2** All five group pages exist, each reachable from a homepage card and from at least one sibling's Keep going block, and each links back to the homepage → Tasks 2, 3, 4, 5, 6, 7, 8.
- **AC-3** All seven existing casts still play somewhere on the site, each on exactly one page → Task 8.
- **AC-4** No cast, demo spec or build script changed → holds across all tasks; verify with `git diff --stat main..HEAD` at the end.
- **AC-5** The nav Install button works from every page → Tasks 1, 8.
- **AC-6** Every page has its own title, description and canonical URL → Tasks 2 to 6, verified in Task 8.
- **AC-7** Copy rules hold: no curly apostrophes anywhere, em dashes only the deliberate pair on `/conversational` → Task 8.
- **AC-8** `npm run build` succeeds and `npx vitest run` passes → every task.
- **AC-9** The planning docs describe the shipped site, not the one-page v1 → Task 9.
- **AC-10** Carried from `planning/website.DECISIONS.md`, manual verification only: the site renders with JS disabled except demo playback, focus is visible, reduced motion is respected, the layout is responsive to mobile, and Lighthouse performance and accessibility both score 95+ → check on the deployed preview after Task 9.

## Decisions log

When a settled decision deviates from or extends this plan, append one line — the decision and its why — to `planning/multi-page-split/multi-page-split.DECISIONS.md` beside this plan, the moment it's settled.
