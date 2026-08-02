# DESIGN: splitting the homepage into an overview plus five group pages

Approved design session 2026-08-01 (Stefanos). Supersedes the "v1 ships as a one-page site" scope
in `planning/website.DECISIONS.md` and the "group pages deferred" note in
`planning/website.DESIGN.md`; both get corrected as part of the work (see Planning doc updates).
Everything else in those two docs still holds: tokens, fonts, demo generation rules, deploy, and
the acceptance criteria.

## Problem

The homepage carries the whole site: 12 sections, 7 looping terminal demos, 13 bullet lists and
panel grids. Three things break as a result. The demos blur together, since all seven share the
same chrome and animate as you scroll past. The page is too long to hold a thread. Each section
says more than a scrolling visitor will read.

## Decisions

- **Shape**: short overview homepage plus five group pages. Nothing gets deleted, it relocates.
- **Grouping**: five pages, matching the hues and kickers already designed. Fresh eyes joins the
  review page as a sub-section instead of getting a page of its own. Opinionated rules stays a
  short block on the homepage.
- **Copy**: Stefanos granted free rein in the design session. Copy may be cut, merged and
  rewritten; `website.COPY.md` gets restructured to match and stays authoritative afterwards. The
  existing copy rules still bind: no dashes as punctuation, straight apostrophes, short and
  non-salesy.
- **Demos**: no new casts and no spec changes. The seven existing casts redistribute.

## Site map

| Route | Kicker / hue | Skills | Casts |
|---|---|---|---|
| `/` | mixed | overview | `01-hero-voice` |
| `/workflow` | task workflow, green | fetch-ticket, refine-ticket, create-implementation-plan, create-manual-test-instructions | `02-refine-ticket` |
| `/reviews` | code review, orange | fetch-pr-review, refine-pr-review, review-code-assistant, fresh-eyes-review | `03-pr-review`, `04-fresh-eyes` |
| `/hygiene` | context & memory hygiene, blue | context-checkup, memory-doctor | `05-context-checkup` |
| `/authoring` | skill & doc authoring, purple | compact-docs-writer, compact-skill-creator, self-improve | `06-self-improve` |
| `/conversational` | conversational voice, blue | use-conversational-language, write-realistic-texts | `07-explain-refactor` |

Route names come from the deferred-pages table in `website.DECISIONS.md`, so nothing is renamed
against a prior decision. All routes are static Astro pages under the configured `base`.

## Homepage

Eight blocks, one demo. Order:

1. **Hero** — unchanged, copy included. It keeps its demo: it is where a visitor decides whether
   to keep scrolling.
2. **The problem** (pink) — unchanged.
3. **Task workflow** (green) — the four stage boxes stay, the demo moves to `/workflow`. The strip
   explains the shape of the whole toolkit in one glance, so it earns the space; the demo does
   not. Stage copy tightens (below). Footer link becomes `See the workflow in action →` pointing
   at `/workflow`, replacing today's Medium link, which moves to the `/workflow` page footer.
4. **What's inside** (blue kicker) — new. Five cards, one per group. Replaces six sections and
   five demos.
5. **Principles** (green) — same six ideas, panel chrome dropped, lines shortened. Six bordered
   boxes directly under five bordered cards was the heaviest stretch of the page.
6. **Philosophy** (green) — five comparison rows per column cut to three; the dropped two repeated
   the others. Heading shortens.
7. **Opinionated rules** (pink) — stays, bullet text tightened, `and more…` bullet dropped since
   the footer link already says it.
8. **Share your feedback** (green, centered) — unchanged. Then the existing mono footer.

### Homepage copy that changes

Everything not listed here keeps today's wording from `website.COPY.md`.

**Task workflow stage boxes** (bold lead, muted detail):

- Ticket: download **TICKET.md** or write it yourself
- Refine: defines the **WHAT**, outputs **REQUIREMENTS.md**
- Plan: defines the **HOW**, outputs **PLAN.md**
- Act: executes the plan, writes code, runs checks

**What's inside** — kicker `What's inside`, heading `Five groups of skills`. Five cards in a
2-column grid, the fifth spanning both columns. Each card: group kicker in the group hue, title,
one line, then a footer row with the count on the left and `Open →` on the right.

| Card kicker | Title | Line | Count | Links to |
|---|---|---|---|---|
| task workflow | Refine, plan, act | Turn a ticket into requirements, a plan, then code, with a clean handoff at every step. | 4 skills | `/workflow` |
| code review | Both sides of the review | Triage the feedback your PR gets, review someone else's code, or send in a sub-agent with fresh eyes. | 4 skills | `/reviews` |
| context & memory | Keep the context lean | See what auto-loads before you even type, and trim it without breaking anything. | 2 skills | `/hygiene` |
| skill & doc authoring | Teach your agent | Write skills and docs agents actually follow, and turn every correction into a lasting lesson. | 3 skills | `/authoring` |
| conversational voice | Texts that sound like a real human typed them | No em dashes, no "this valuable feedback". Just what you would have written yourself, faster. | 1 skill + 1 rule | `/conversational` |

The conversational count reads `1 skill + 1 rule` because write-realistic-texts is a rule, not a
skill.

**Principles** — six rows in a 2-column grid, no panels, no borders. Bold lead, muted detail, the
three existing Medium links inline and unchanged in destination:

1. **Keep the context window sharp** Atomic skills: one job each, nothing else loaded. `why →`
2. **Offload to files, pick up fresh** Every phase ends in a doc a new session can pick up. `how →`
3. **Human in the loop** The agent recommends, you decide. Nothing runs behind your back.
4. **Never guess** It reads the existing code first and asks you when in doubt.
5. **Learn from mistakes** Every correction becomes a durable lesson. `more →`
6. **Versatile by design** Any project, any stack, team or solo.

**Philosophy** — heading `A toolkit, not a framework`. Intro: `Great frameworks exist that
auto-activate around everything you do. This one deliberately takes the other road:` Panels keep
their titles and styling, three rows each:

- `auto-activating frameworks`: a whole methodology / the agent drives / fuller context, less to
  remember
- `agent-toolkit`: use only the parts you need / you drive, the agent assists / lean context,
  predictable behavior

**Opinionated rules** — intro unchanged. Bullets tighten to:

- **git-read-only-by-default** no commits, pushes or resets unless you asked for them
- **no-ai-attribution** your work stays yours: no AI co-author, no "generated with" footer
- **no-nonsense-comments** only comments a future reader with zero context still needs

## Group page template

Validated against `/reviews`, the heaviest of the five. Same single centered column, same tokens,
same section dividers as the homepage.

1. **Nav** — the existing sticky bar. On group pages the wordmark renders with a `←` prefix so it
   reads as a way back.
2. **Header** — kicker in the group hue, one heading, one paragraph. No demo here: demos sit with
   the skill they show.
3. **Skill blocks** — one per skill, separated by a hairline. Mono skill name as the heading, one
   or two lines under it, then its demo directly below when it has one. Skills without a demo stay
   text only; nothing gets padded out for symmetry.
4. **Sub-sections** where a group holds a genuinely distinct idea (only `/reviews` needs one, for
   fresh eyes): its own heading and paragraph, then its skill block.
5. **Keep going** — two sibling group cards (the next two in site-map order, wrapping) plus
   `All five groups →` anchoring back to the homepage cards.
6. Existing mono footer.

No dropdowns, no hamburger, no per-page install block. The nav Install button covers install
everywhere.

### Group page content

`/workflow` — heading `From a ticket to shipped code`, intro `A development workflow suitable for
any kind of project`. Skill blocks: fetch-ticket (pulls a ticket from your tracker into a
self-contained TICKET.md), refine-ticket (grills you until the WHAT is unambiguous, then writes
REQUIREMENTS.md) with `02-refine-ticket`, create-implementation-plan (turns the requirements into
a PLAN.md a fresh session can execute), create-manual-test-instructions (writes the QA steps
someone who did not build it can follow). Footer link: today's task-workflow Medium article,
`target="_blank"`.

`/reviews` — heading `Help on both sides of the review`, intro unchanged from today's section
(bold on `others leave feedback on your PRs` and `you review someone else's code`). Skill blocks:
fetch-pr-review (downloads every comment your PR received into one self-contained document that
refine-pr-review can pick up), refine-pr-review (walks the feedback with you, comment by comment:
address it, address part of it, or push back) with `03-pr-review`, review-code-assistant (reviews
someone else's PR locally, works for self-review too. Suggests human-voiced comments and
explanations. You decide what to post). Then the fresh eyes sub-section: heading `Let a sub-agent
take a fresh look`, paragraph `A fresh perspective works for AI just like it does for humans. A
sub-agent with a clean context, seeing only the changeset and a short brief, catches more than the
session that wrote the code.`, then the fresh-eyes-review block with `04-fresh-eyes`.

`/hygiene` — heading `Your context is often cluttered before you even type`. Skill blocks:
context-checkup (today's bullet text) with `05-context-checkup`, memory-doctor (today's bullet
text).

`/authoring` — heading `Create and improve the skills and docs your agents rely on`. Skill blocks:
compact-docs-writer, compact-skill-creator, self-improve (today's bullet texts), with
`06-self-improve` under self-improve. Footer link: today's authoring Medium article,
`target="_blank"`.

`/conversational` — heading `Texts that sound like a real human typed them`, intro `We often ask
AI to help draft texts that other people will read:`. Skill blocks: use-conversational-language
(today's bullet text, keeps its em dash pair) with `07-explain-refactor`, write-realistic-texts
(today's bullet text).

### Per-page meta

Each page passes its own `title` and `description` to `Base.astro`, which already emits canonical,
OpenGraph and Twitter tags from `Astro.url.pathname`. Titles follow
`<group> · agent-toolkit`. The existing social card serves every page.

## Components and files

New:

- `src/components/GroupCard.astro` — kicker, title, line, count, `Open →`, href, hue. Used by the
  homepage grid and by Keep going.
- `src/components/SkillBlock.astro` — mono skill name, slot for the text, optional demo props.
- `src/components/KeepGoing.astro` — two GroupCards plus the all-groups link, given the current
  route.
- `src/components/sections/WhatsInside.astro` — the five-card homepage block, `id="whats-inside"`
  so the all-groups link can anchor to it.
- `src/pages/workflow.astro`, `reviews.astro`, `hygiene.astro`, `authoring.astro`,
  `conversational.astro`.

Changed:

- `src/pages/index.astro` — new block list.
- `src/components/Nav.astro` — the Install button points at `#install`, a dead anchor anywhere but
  home, so it becomes `${base}/#install`. Add the optional back arrow on the wordmark.
- `src/components/sections/Workflow.astro` — drop the demo, retarget the footer link.
- `src/components/sections/Principles.astro` — drop the panel chrome, shorten the lines.
- `src/components/sections/Philosophy.astro` — three rows per column, new heading.
- `src/components/sections/Rules.astro` — tightened bullets.

Deleted, their content moving into the matching page file: `Reviews.astro`, `FreshEyes.astro`,
`Hygiene.astro`, `Authoring.astro`, `Conversational.astro`.

Unchanged: `Base.astro`, `Section.astro`, `DemoPlayer.astro`, `TerminalWindow.astro`,
`Hero.astro`, `Problem.astro`, `Feedback.astro`, every demo spec and cast, all build scripts.

A single group definition (route, kicker, hue, title, card line, count) lives in
`src/data/groups.ts`, so the homepage cards, the Keep going blocks and the tests all read the same
list and cannot drift.

Each relocated `DemoPlayer` keeps the `cast`, `cols`, `rows` and `label` values it has today. The
only thing that changes is which file it sits in.

## Tests

`tests/page.test.ts` reads only `dist/index.html` and asserts all seven casts appear there, so it
fails by design after the split. Rework it into:

- homepage: the eight blocks present and in order.
- each group page: its heading, its skill names, its demo, and its Keep going links present.
- site-wide: every one of the seven casts is referenced on exactly one page; every card href
  resolves to a file that exists in `dist/`.
- copy rules per file: no curly apostrophes anywhere; em dashes only in
  `dist/conversational/index.html`, exactly two, and zero in `dist/index.html`.

`tests/cast.test.ts` is untouched.

## Planning doc updates

These are governing docs referenced from `AGENTS.md`, so the session doing this work invokes
`/compact-docs-writer` before editing them, per the user's global rules.

- `website.COPY.md` — restructured per page: homepage blocks first, then one section per group
  page. Stays authoritative for user-visible text.
- `website.DESIGN.md` — the homepage skeleton gets the new block order, the group page template
  moves from "deferred" to shipping, and the demo lineup records which page each cast lives on.
- `website.DECISIONS.md` — the "v1 ships as a one-page site" scope note is replaced by the site
  map above. The deferred-pages table keeps `/core-concepts`, `/rules` and the catalog page as
  still deferred.
- `AGENTS.md` — no change needed; it points at the three docs, which keep their names.
- `.gitignore` — add `.superpowers/`. The design session's mockups live there and should not be
  committed.

## Out of scope

Sitemap, catalog page, `/core-concepts`, a `/rules` page and its git-read-only demo, new casts,
Lucide icon picks, custom domain, analytics enablement.

## Acceptance criteria

- The homepage has eight blocks and exactly one demo player.
- All five group pages exist, each reachable from a homepage card and from at least one sibling's
  Keep going block, and each links back to the homepage.
- All seven existing casts still play somewhere on the site, each on exactly one page.
- No cast, demo spec or build script changed.
- Nav Install works from every page.
- Every page has its own title, description and canonical URL.
- `npm test` passes, `npm run build` succeeds, and the acceptance criteria already in
  `website.DECISIONS.md` still hold: JS-disabled rendering except playback, visible focus, reduced
  motion respected, mobile responsive, Lighthouse performance and accessibility 95+.
