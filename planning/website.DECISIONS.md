# DECISIONS: agent-toolkit website

Outcome of the brainstorm/grilling session between Francesco and Claude (2026-07-26). This doc is
the complete, self-contained record of the decisions: it fully supersedes
`WEBSITE-BRAINSTORM-INPUT.md` (historical input, no need to read it). One companion input is
required for building: `agent-toolkit-site-reference.html` — an HTML conversion of Francesco's
conference deck, the reference for the visual identity (design tokens in `:root`, authoritative
if this doc's token list ever diverges — font stacks excepted, see Design direction) and a source
for section copy. Note: both that file and
this doc live in `.agents/plans/website/` of the agent-toolkit checkout, which is gitignored
(`.agents/plans/**`) — they exist only locally. When creating the agent-toolkit-docs repo, copy
both into its planning directory so they are versioned and available to fresh sessions. Design
(`website.DESIGN.md`) and copy (`website.COPY.md`) are approved; next step: implementation plan,
then build.

## Goal and audience

Marketing site for agent-toolkit (github.com/eai-org/agent-toolkit). Single job: a developer who
uses AI coding agents (Claude Code, OpenCode, Copilot, Codex, ...) understands the toolkit's
value within a minute and installs it or stars the repo. Insight driving the design: developers
converted at a live presentation (narrative + a few demos), not via README/articles. The site
replicates that: short texts, icons, animated terminal demos. Never long prose.

## Site structure

Scope update (2026-07-31, final shape after the 2026-08-02 merge): a homepage overview (hero,
problem, six-card group grid, skills chain, principles, philosophy, rules, feedback) routes into six group
pages — `/task-workflow`, `/pr-review-assistants`, `/fresh-eyes-review`, `/context-hygiene`,
`/skills-docs-authoring`, `/talking-to-humans` — which carry the per-skill blocks and
demos (template in `website.DESIGN.md`, copy in `website.COPY.md` §14) and end with a
"Keep going" footer linking the next two groups, the homepage grid and the `/skills/` catalogue.
`/pr-review-assistants`
covers the three §6 skills plus maintainer-review (added 2026-10-09; decided the same
day, it stays there for good). The ticket-review skills went to
`/task-workflow` instead: review-ticket (2026-08-05) under "Before you pick the ticket up" and
check-ticket-implementation (2026-08-07) under "Along the way", both closer to a developer's own task than to
reviewing a PR. The catalogue shipped at `/skills/` (2026-10-10); `/rules` and `/core-concepts` stay deferred, kept here as the plan
for that expansion. Approved block order and copy: `website.COPY.md`; skeleton:
`website.DESIGN.md`.

2026-10-10: the homepage skills chain is curated and hand-maintained in `src/data/chain.ts`; its skill chips take page and hue from the `skills` arrays in `src/data/groups.ts`. It is not generated: the toolkit's `openpack.json` carries dependencies, not sequence, and the README relationship graph (34 nodes) is hand-maintained and too large for the homepage, so the section links to it instead.

2026-08-03: `/about` added alongside the group pages, linked from the nav on every page. It
introduces Engineering in the Age of AI (the community behind the toolkit), links its Medium
publication, Discord server and LinkedIn page, and closes on the MIT free-software blurb
(copy in `website.COPY.md` §15, layout in `website.DESIGN.md`).

2026-10-09 (Francesco): /conversational-language became "Talking to humans" at /talking-to-humans, the README group of the same name, with both its skills: use-conversational-language for texts that go out under your name, explain-in-simple-language for the agent's own explanations, plus the write-realistic-texts, no-nonsense-comments and write-simple-explanations rules. The site is live, so the old URL redirects (see Tech).

2026-10-10: on /talking-to-humans the voice subsection comes first, as the page's flagship and the hero demo's skill. A default; swapping the two subsections is a block move with no copy change.

2026-10-09: the toolkit README groups skills by what they are, the site groups them by the
situation the visitor is in. Every skill and rule has at most one block, on one page (a SkillBlock
or rule bullet rendering a GitHub `Read the SKILL.md →` or `Read the rule →` link; a
`github={false}` cross-link is not one). Those without a block are listed in the table's "no group
page" row. Any other page may mention a skill or rule in plain text or link it, either to its
SKILL.md or rule file on GitHub or to its block on its own group page (`/task-workflow/#harden-artifact`
form), never with a second block. Membership is kept in the `skills` and `rules` arrays of
`src/data/groups.ts`.

Pages as planned for the expansion:

| Page | Content | Skill blocks | Rule blocks |
|---|---|---|---|
| `/core-concepts` | The five pillars, marketing style: icons + short texts. NOT a render of `docs/core-philosophy.md` (that doc is agent-facing source material informing the copy; llms.txt opens with it, followed by a generated skills, rules, install and pages index). The deck shows only four principles — it predates pillar 5 (generic beats specific); core-philosophy.md is the authority: five pillars | none | none |
| `/task-workflow` | RPAC flagship. Includes the Refine/Plan/Act flow diagram from the deck. | fetch-ticket, attach-to-ticket, refine-ticket, create-implementation-plan, harden-artifact (2026-10-07), split-plan-tasks (2026-10-07), execute-plan-tasks (2026-10-07: with split-plan-tasks, the step-by-step Act option; the plain "Execute the plan" prompt stays the default Act path), handover; Before you pick the ticket up: review-ticket (2026-08-05), verify-understanding (2026-10-09); Along the way: create-manual-test-instructions, check-ticket-implementation (2026-08-07), grill-me, prepare-prompt. Not blocks: "Execute the plan", the self-review cross-link | plans-directory (2026-10-09), at the bottom after the last "Along the way" block |
| `/pr-review-assistants` | Incoming PR, reviewing others' code, deciding the merge | fetch-pr-review, refine-pr-review, review-code-assistant, maintainer-review (2026-10-09) | none |
| `/fresh-eyes-review` | Separate concept: validating your own work with a clean context | fresh-eyes-review, self-review (2026-10-09) | none |
| `/talking-to-humans` (redirect from `/conversational-language`, 2026-10-09) | Proven crowd favorite | use-conversational-language, explain-in-simple-language | write-realistic-texts, no-nonsense-comments, write-simple-explanations |
| `/context-hygiene` | Keep the context lean | context-checkup, memory-doctor, agentify-project | none |
| `/skills-docs-authoring` | Teach your agent | compact-docs-writer, compact-skill-creator, self-improve | compact-governing-docs, read-other-repos-governing-docs (2026-10-10), self-contained-docs, self-improve-on-correction |
| `/rules` | The full rules list lives at `/skills/#rules`; a `/rules` page with a rule demo stays a possible later page. Opt-in rules, clearly framed as opt-in. Adapted pattern: links go to rule files (rules have no SKILL.md); the demo shows a rule steering behavior, e.g. git-read-only-by-default declining an unrequested push and asking for explicit confirmation | none | none |
| `/skills/` (catalogue) | Every skill and rule on one page. Names, links and placement come from the toolkit files and the `GROUPS` arrays at every build; lines are hand-written in `src/data/catalogue.ts`, with the sanitized frontmatter description as fallback | none | none |
| no group page | Not on any group page | run-nx-checks: catalogue row in "Also in the toolkit", tagged "Nx workspaces only", off the group pages since 2026-07-28, catalogue home decided 2026-10-09 | git-read-only-by-default, no-ai-attribution: homepage Rules examples and the `/skills/#rules` list (2026-10-10); use-my-mothertongue snippet (`docs/use-my-mothertongue-rule.md`, not a rule file): homepage Rules line and the `/skills/#rules` snippet row |

Dates mark when a placement was decided. The "Before you pick the ticket up" and "Along the way" members follow the page order. "Rule blocks" covers rule bullets with a `Read the rule` link.

run-nx-checks is the one stack-specific skill (Nx workspaces). Decision 2026-10-10: it appears
only as a row tagged "Nx workspaces only" in the catalogue's "Also in the toolkit" section, and in
llms.txt like every skill; no block, demo or page, and the site's project-agnostic claims stay as
they are.
verify-understanding was parked as catalog only, no marketing section, on 2026-08-07 (a
teach-back conversation, no file, thought not to sell in the demo format); decision 2026-10-09: it
is shown on /task-workflow with a teach-back demo (lineup 21).

Expanded, the group pages all follow the same pattern as the homepage sections, one level
deeper: icon + short marketing text per skill, at least one terminal demo, links to each skill's
SKILL.md on GitHub (`/rules`: rule files instead — see table) and to the install section. Same
visual language everywhere; never long prose.

2026-10-10: the /task-workflow flow strip is the page's map: each box links to the first block of its phase, and the Plan and Act boxes name the optional commands whose blocks sit in that phase (/harden-artifact, /split-plan-tasks, /execute-plan-tasks), written as typed.

## Demos

- No manual recording, ever. Demos are generated: a committed structured spec file (YAML or
  similar, one per demo) is compiled by a small build script into an asciinema `.cast` file
  (JSON-lines of timed output events — per-character typing, seeded jitter, ANSI colors).
- Site embeds asciinema-player (crisp text, pausable, copy-pasteable). CI renders a README gif
  from the same cast via `agg`; README references the gif by URL on the deployed site (no
  binaries in git).
- Content is realistic, not real: written from scratch or distilled from a real session on
  request ("that exchange would make a good demo → generate a spec for page X"). Faithful to
  actual skill behavior, no invented capabilities.
- Look: generic agent TUI (prompt, spinner, skill output, questions with recommendations) — no
  agent-branded chrome, but Claude Code-adjacent palette/feel for familiarity. Simplicity and
  elegance over 1:1 mimicry.
- Hero demo: use-conversational-language (before/after of an AI-sounding vs human PR reply) —
  graspable in seconds with zero context. /task-workflow carries the refine-ticket
  grilling demo (one question at a time, each with a recommendation).
- Demos: the hero plays on the homepage and every other demo on its group page (lineup and count
  in `website.DESIGN.md`, scripts in `website.COPY.md`). Any further group page gets at least one demo of
  its flagship skill.

## Tech

- Astro + TypeScript, static-first, zero JS by default (players enhance progressively).
- Tailwind (v4, CSS-first config) on the deck design tokens: `--bg #0D1117`, `--panel #161B22`,
  `--panel-2 #1C2128` (chips), `--border #30363D`, `--text #E6EDF3`, `--muted #8B949E`,
  `--green #3FB950`, `--blue #58A6FF`, `--orange #D29922`, `--purple #BC8CFF`,
  `--pink #F97583`, `--radius 10px`. GitHub-dark palette, terminal-green accent, monospace
  accents. Since the 2026-08 theme work each color is a `light-dark()` pair — these deck values
  are the dark side, paired with GitHub-light counterparts, toggle in the nav
  (details in `website.DESIGN.md`). Font stacks modernized in the design session, superseding
  the deck's Courier New/Arial:
  mono `ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace`, sans
  `system-ui, -apple-system, "Segoe UI", Arial, sans-serif`. The reference HTML's `:root` is
  authoritative if it and this list diverge, except the font stacks, where this list wins.
- Icons: Lucide (MIT, thin stroke, fits the dark terminal aesthetic), inlined as SVG at build
  time — no icon font, no runtime JS. Per-concept picks made during build.
- Lives in its own repo, github.com/eai-org/agent-toolkit-docs (to be created), not inside
  agent-toolkit and deliberately not named `eai-org.github.io` (org root URL stays unclaimed for
  now). Rationale:
  the toolkit repo stays pure markdown/shell with zero dependencies — no npm lockfile,
  Dependabot churn, or site commits in its history. The same-repo advantages proved weak on
  inspection: the catalogue list is built from the toolkit so atomic PRs rarely matter, stars go to the toolkit
  regardless, and drift-proofing survives the split (next bullet).
- The site build checks out agent-toolkit (public repo, `actions/checkout` with `repository:`
  param, no token needed) and reads `skills/**`, `rules/**`, and `docs/core-philosophy.md` from
  that checkout — the catalogue list and llms.txt always come from the real files (lines are checked by a fingerprint warning, not generated). Rebuilds trigger on:
  push to the site repo, nightly cron, and `workflow_dispatch`. GitHub auto-disables scheduled
  workflows in public repos after ~60 days without repo activity, and the site repo is quiet by
  design — decided fix: the nightly workflow's last step keeps the cron alive via the GitHub API
  (keepalive-workflow style, API mode: no dummy commits, no PAT). A `repository_dispatch` hook in
  agent-toolkit for instant rebuilds stays an optional later addition.
- Deploy to GitHub Pages via Actions artifact flow (`upload-pages-artifact` + `deploy-pages`),
  no gh-pages branch.
- No committed binaries in the site repo either: casts, gifs, and social card images are build
  outputs; prefer system monospace font stacks over committed webfonts.
- URL: eai-org.github.io/agent-toolkit-docs until a custom domain lands (deferred; the plain
  project URL strengthens the case for adding one soon after launch).
- Toolkit drift policy (2026-10-09): a skill or rule name the site uses that the toolkit no
  longer has fails the tests, and with them the nightly deploy and PR previews. A toolkit skill or
  rule placed on no page, or a changed toolkit description, only warns. Name checks live in
  `tests/groups.test.ts` (group arrays by kind, duplicates, every toolkit `blob/main` href in the
  built pages); the description check lives in `tests/catalogue.test.ts`: a changed description only warns, a stale `CATALOGUE_LINES` key or a missing snippet doc fails.
- Redirects (2026-10-10): GitHub Pages has no server-side redirects, so a renamed page keeps its old URL through Astro redirects in astro.config.mjs, a stub with a 0-second meta refresh, noindex and a canonical. Astro 5 leaves the base off redirect targets, so the target is built from the SITE_BASE base, never hardcoded. In use: /conversational-language → /talking-to-humans/.

## Design direction

Settled in the 2026-07-26 design session:

- Deck as DNA: the deck's tokens, components (chips, panels, terminals, kickers) and voice are the
  identity; layout language, type scale, hero and motion are designed natively for a scrolling
  marketing site rather than copied from the slides.
- Font stacks: modern system stacks (see Tech); role structure unchanged — mono for
  display/accents/terminals, sans for body.
- Navigation: minimal top bar — wordmark (← back arrow prefix on group pages), theme toggle,
  `Skills` and `About us` page links, GitHub link with star count, install button anchoring to the hero install terminal from every
  page (2026-10-10). Nothing else; no hamburger or dropdowns.
- Motion: the demo players carry all animation. Beyond them only a CSS blinking cursor in the
  hero and quiet hover states; no scroll-triggered effects.
- Layout, hero, signature element, TUI demo chrome, per-group hues, and the demo lineup are
  settled in `website.DESIGN.md` (same directory): the deck's single-column minimalism with
  agent-TUI demo players in the flow. Approved 2026-07-27; copy approved the same day in
  `website.COPY.md`.
- Fresh-eyes hue (2026-10-10): pink, on its card, on both skill blocks of /fresh-eyes-review and on
  the self-review cross-link of /task-workflow, so the card never sits right under the orange PR
  reviews card in one color on phones. The orange and pink boxes of the fresh-eyes flow diagram
  are session roles, not the group hue.

## Copy

Short, human, non-salesy. No dashes as punctuation of any kind (literal names keep their
hyphens); straight apostrophes. Narrative follows the conference deck / core-philosophy pillars.
Concrete over abstract: name what the reader would type or see (`/create-implementation-plan`),
never a stand-in for it ("the task workflow"), and show the same command in that skill's demo.
Skill blocks stop at what the reader needs to pick the skill; the mechanics stay behind the
SKILL.md link.
The hero install block covers the four channels: the `install.sh` one-liner, a muted line
disclosing the daily Claude Code update hook and its `--no-auto-update` opt-out, and one link line
to agentwheel, skills.sh and the Claude Code plugin marketplace (plus the README install section).

## Marketing and measurement

- Privacy-friendly, cookie-free analytics from day one: GoatCounter (decided in the design
  session) — the marketing bet must be measurable (visits, referrers, pages).
- `llms.txt` at site root, generated at build time: `docs/core-philosophy.md` with its relative
  links rewritten to GitHub, followed by a generated index of every skill and rule with its
  description, the install commands, and the site's pages (index added 2026-10-09).
- Pages URL added to the GitHub repo header.
- Launch promo planned with v1: dev.to crossposts, Show HN, r/ClaudeAI. Hard rule: the site is
  complete (homepage, group pages, all demos) before any promo goes out.

## Out of scope for v1

Custom domain; blog on the site (Medium stays the writing home); talk recording embed.

## Acceptance criteria

- The agent-toolkit repo is untouched by the website: no site files, dependencies, or
  site-serving workflows land in it (only the Pages URL in its README/header, the README's
  gif link to the deployed site, and later an optional dispatch hook).
- The site repo commits no binaries or build output.
- Catalogue page: a new toolkit skill appears automatically within a day via the nightly rebuild (fallback line, under "Also in the toolkit" until placed); a changed description keeps its line and raises a test warning; a name the site uses that the toolkit no longer has fails the tests (cron kept
  alive by the keepalive step). The nightly rebuild itself ships with v1 (llms.txt already
  generates from the toolkit checkout).
- A demo is (re)generated from its spec file by the build; changing a demo means editing a spec.
- Site renders with JS disabled except demo playback; responsive to mobile; visible focus;
  reduced motion respected.
- Lighthouse performance and accessibility 95+ on the deployed pages.
- Cold visitor finds the install command within one screen of the hero.
- OpenGraph/Twitter card meta, social card image, and correct canonical URL on every page.

## Open items (small, decide during build)

- Lucide icon picks per section (demo content is settled, see `website.COPY.md`).
