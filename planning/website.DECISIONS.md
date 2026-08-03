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
problem, six-card group grid, principles, philosophy, rules, feedback) routes into six group
pages — `/task-workflow`, `/pr-review-assistants`, `/fresh-eyes-review`, `/context-hygiene`,
`/skills-docs-authoring`, `/conversational-language` — which carry the per-skill blocks and
demos (template in `website.DESIGN.md`, copy in `website.COPY.md` §14) and end with a
"Keep going" footer linking the next two groups and the homepage grid.
`/pr-review-assistants` covers only the three §6 skills so far, not yet the ticket-review trio
in the table below. `/rules`, `/core-concepts` and the catalog stay deferred, kept here as the
plan for that expansion. Approved block order and copy: `website.COPY.md`; skeleton:
`website.DESIGN.md`.

2026-08-03: `/about` added alongside the group pages, linked from the nav on every page. It
introduces Engineering in the Age of AI (the community behind the toolkit), links its Medium
publication, Discord server and LinkedIn page, and closes on the MIT free-software blurb
(copy in `website.COPY.md` §15, layout in `website.DESIGN.md`).

Pages as planned for the expansion:

| Page | Content |
|---|---|
| `/core-concepts` | The five pillars, marketing style: icons + short texts. NOT a render of `docs/core-philosophy.md` (that doc is agent-facing source material informing the copy; llms.txt generates from it). The deck shows only four principles — it predates pillar 5 (generic beats specific); core-philosophy.md is the authority: five pillars |
| `/task-workflow` | RPA flagship: fetch-ticket, refine-ticket, create-implementation-plan, create-manual-test-instructions. Includes the Refine/Plan/Act flow diagram from the deck |
| `/pr-review-assistants` | Incoming PR (fetch-pr-review, refine-pr-review); reviewing others' code (review-code-assistant); tickets (review-ticket, verify-understanding, check-ticket-implementation) |
| `/fresh-eyes-review` | fresh-eyes-review — separate concept: validating your own work with a clean context |
| `/conversational-language` | use-conversational-language (+ write-realistic-texts rule). Proven crowd favorite |
| `/context-hygiene` | context-checkup, memory-doctor |
| `/skills-docs-authoring` | compact-skill-creator, compact-docs-writer, self-improve |
| `/rules` | Opt-in rules, clearly framed as opt-in. Adapted pattern: links go to rule files (rules have no SKILL.md); the demo shows a rule steering behavior, e.g. git-read-only-by-default declining an unrequested push and asking for explicit confirmation |
| catalog page | Full skill/rule reference, generated at build time from SKILL.md frontmatter and rule files — cannot drift from the repo |

run-nx-checks: catalog only, no marketing section.

Expanded, the group pages all follow the same pattern as the homepage sections, one level
deeper: icon + short marketing text per skill, at least one terminal demo, links to each skill's
SKILL.md on GitHub (`/rules`: rule files instead — see table) and to the install section. Same
visual language everywhere; never long prose.

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
- Seven demos: the hero on the homepage, the other six on their group pages (lineup and scripts
  in `website.DESIGN.md` / `website.COPY.md`). Any further group page gets at least one demo of
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
  inspection: the catalog auto-generates so atomic PRs rarely matter, stars go to the toolkit
  regardless, and drift-proofing survives the split (next bullet).
- The site build checks out agent-toolkit (public repo, `actions/checkout` with `repository:`
  param, no token needed) and reads `skills/**`, `rules/**`, and `docs/core-philosophy.md` from
  that checkout — catalog and llms.txt always come from the real files. Rebuilds trigger on:
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

## Design direction

Settled in the 2026-07-26 design session:

- Deck as DNA: the deck's tokens, components (chips, panels, terminals, kickers) and voice are the
  identity; layout language, type scale, hero and motion are designed natively for a scrolling
  marketing site rather than copied from the slides.
- Font stacks: modern system stacks (see Tech); role structure unchanged — mono for
  display/accents/terminals, sans for body.
- Navigation: minimal top bar — wordmark (← back arrow prefix on group pages), theme toggle,
  GitHub link with star count, install button anchoring to the hero install terminal from every
  page. No page links, nothing else; no hamburger or dropdowns.
- Motion: the demo players carry all animation. Beyond them only a CSS blinking cursor in the
  hero and quiet hover states; no scroll-triggered effects.
- Layout, hero, signature element, TUI demo chrome, per-group hues, and the demo lineup are
  settled in `website.DESIGN.md` (same directory): the deck's single-column minimalism with
  agent-TUI demo players in the flow. Approved 2026-07-27; copy approved the same day in
  `website.COPY.md`.

## Copy

Short, human, non-salesy. No dashes as punctuation of any kind (literal names keep their
hyphens); straight apostrophes. Narrative follows the conference deck / core-philosophy pillars.
Install section covers all four channels: install.sh, agentwheel, skills.sh, Claude Code plugin
marketplace.

## Marketing and measurement

- Privacy-friendly, cookie-free analytics from day one: GoatCounter (decided in the design
  session) — the marketing bet must be measurable (visits, referrers, pages).
- `llms.txt` at site root, generated at build time from `docs/core-philosophy.md`.
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
- Once the catalog page lands (deferred): a new or changed skill in agent-toolkit appears in it
  automatically — within a day via the nightly rebuild, with no manual copy step ever (cron kept
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
