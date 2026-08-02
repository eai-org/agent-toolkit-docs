# DESIGN: agent-toolkit website

Approved visual/UX design (design session 2026-07-26/27). Companion to `website.DECISIONS.md`
(authoritative for goal, scope, pages, tech, acceptance criteria); this doc settles how the site
looks and is laid out. Approved reference mockup:
`.superpowers/brainstorm/47126-1785086001/content/homepage-v4.html` (local, gitignored — copy to
the site repo's planning directory together with the DECISIONS doc and reference HTML). All copy
shown here is draft; a dedicated text pass happens before build (see Copy status).

## Design concept

The conference deck's minimalism, plus live demos. One centered column, one idea at a time, short
texts, hairline dividers — the deck's rhythm and components untouched — with generic agent-TUI
demo players placed in the flow where the deck had screenshots. Explicitly rejected during the
session: split-pane sections, numbered section eyebrows, multi-column install grids, agentwheel's
dense skeleton ("too chaotic — humans are lazy, we need simple, quick, effective").

## Visual identity

- Tokens: colors, `--radius`, spacing per DECISIONS/reference HTML. Font stacks per DECISIONS
  (modern system stacks; mono for display/kickers/terminals/links-as-commands, sans for body).
- Deck component inventory, reused as-is: kicker (mono, uppercase, tracked, accent-colored), h2,
  bullet list with `b` + muted detail span, chip, panel, quote-in-panel, terminal window with
  traffic-light dots, RPA flow strip.
- Hue per group, reusing the deck's five accents: workflow green, reviews orange, fresh-eyes
  orange, conversational blue, hygiene blue, authoring purple, rules pink. Green doubles as the
  general accent (CTAs, links-as-commands, cursor).
- Icons: one Lucide icon per section header, inlined SVG, picked at build (per DECISIONS).
- Dark and light theme (2026-08-02): every color token is a `light-dark()` pair — dark side = the
  deck palette, light side GitHub-light. The nav toggle cycles dark/light/system by setting
  `data-theme` (which sets `color-scheme`); an inline pre-paint `<head>` script restores the
  stored choice so the wrong theme never flashes; with JS off the OS preference wins. Terminal
  demos stay dark in light mode (casts bake dark ANSI colors).
- Signature element: the agent-TUI demo windows — especially the hero's two-exchange voice demo
  (stiff AI reply, then the same prompt with the skill and a human reply) — inside an otherwise
  still, deck-calm page.

## Agent-TUI demo chrome

Demos depict a Claude Code-like agent app, never a bash shell (no `$` prompts):

- Window: panel background, hairline border, radius, traffic-light dots (pink/orange/green).
- User input: bordered box on page background, `>` prefix, skill name in green
  (`> /refine-ticket 1234-users.TICKET.md`).
- Spinner line: `✻ Drafting in a human voice…` (muted).
- Agent output lines: `⏺` prefix.
- Grilling questions: numbered options, `❯` on the highlighted one, `(recommended)` in green.
- Voice before/after: two exchanges in one window — plain prompt → stiff AI answer (`⏺` pink),
  then the same prompt with the skill → spinner → human answer (`⏺` green). Never diff markers;
  the only git-style diffs are the self-improve suggested addition (green `+` on faint green)
  and the compact-docs-writer rewrite pair (pink `-` on faint red, green `+` on faint green).
- Rendered by asciinema-player from generated casts (per DECISIONS), capped at 624px
  (`--container-demo`) so terminal text stays ~14px; each loops while in view (GIF-like),
  paused offscreen, holding its finished frame for at least 3s (longer the more it printed)
  before restarting. `prefers-reduced-motion`: static first frame until play.

## Layout system

- Single centered column, `max-width` ~960px, sections separated by 1px `--border` lines,
  generous vertical padding. No sidebars, no split panes. Separators sit on the inner
  `max-w-page` div, spanning the content column, never the full viewport (site-wide since the
  2026-08-02 merge); only the site footer keeps a full-width border.
- Section pattern (homepage and group pages alike): kicker → heading → ≤3 short lines →
  optional panel/quote → optional demo → mono `more →` link. Never long prose.
- Only grids: principles panes (2-col), comparison (2-col), group cards (2-col on the homepage,
  3-col compact in the group-page footer). All stack on mobile like the deck's `.cols`.
- Nav: sticky minimal bar in the page column — mono green wordmark linking home (prefixed with a
  ← arrow on group pages), theme toggle, GitHub link with star count, green install button
  anchoring to the hero install terminal from every page. No page links, nothing else, no
  hamburger, no dropdowns.
- Motion: per DECISIONS — demo players only, plus CSS blinking cursor after the hero h1.

## Homepage (approved skeleton; final copy in `website.COPY.md`)

The homepage is a compact overview (slimmed in the 2026-08-02 merge); the group blocks and
their demos live on the group pages. Block order:

1. Hero, centered: two-exchange voice TUI demo → h1 mono `agent-toolkit` + blinking cursor →
   tagline → chips → one-line install terminal with copy button → mono link
   "Other ways to install →" (README install section on GitHub) → star line (orange ★, link to
   the repo).
2. The problem (pink): "Different projects, same repetitive tasks", 3 bullets, quote panel.
3. What's inside (blue, anchor `#whats-inside`): "Several groups of skills", six group cards in
   a 2-col grid, each linking its group page (copy in `website.COPY.md` §2b).
4. Principles (green): six panes in a 2-col grid, three inline Medium links, no footer link.
5. Philosophy (green): "A toolkit, not a framework", comparison panels, no quote.
6. Opinionated rules (pink, short: no heading, no demo, footer link to the README rules section
   on GitHub).
7. Share your feedback (green, centered): kicker + one line + "Open an issue →" (GitHub issues).
8. Mono footer (`agent-toolkit · MIT`). No standalone install section (hero covers it, nav
   install button anchors to the hero terminal) and no credits section.

Demo players below the hero lazy-load (Lighthouse 95+ budget).

## Group pages

Each of the six shipped pages (`/task-workflow`, `/pr-review-assistants`, `/fresh-eyes-review`,
`/context-hygiene`, `/skills-docs-authoring`, `/conversational-language`) is built in the
standard shell as (expansion built 2026-08-01, block copy draft in `website.COPY.md` §14):

1. Nav (same bar, wordmark prefixed with a ← back arrow).
2. Page title: big centered mono h1, hero-style, no kicker (`PageHeader.astro`; titles in COPY
   §14).
3. Intro section, borderless: the block heading demoted to h2, intro line(s); /task-workflow
   keeps the flow strip.
4. One hairline-separated block per skill (`SkillBlock.astro`, py-10 vs the sections' py-14):
   mono skill name as h2 in the group hue, 1-3 muted lines, the demo inside the block of the
   skill it shows, mono `Read the SKILL.md →` link to GitHub (rules: `Read the rule →`), plus the
   per-block article links COPY §14 defines. No icons yet (open item).
5. Page-level article link where the copy defines one, as a slim closing block.
6. "Keep going" footer (`KeepGoing.astro`): the next two groups in order, wrapping, as compact
   2-col cards (kicker + one-line title, long titles swapped for their short stand-in), plus an
   `All six groups →` link to the homepage grid.

/skills-docs-authoring deviations (2026-08-02): the page-level article link renders in the intro
as a more-link line instead of a closing block, and a compact rules subsection sits before the
Keep-going footer — sans-serif h2, muted intro, bulleted mono rule names, each with its own
`Read the rule →` link.

/rules (still deferred) would frame everything as opt-in; its demo shows a rule steering behavior
(git-read-only-by-default declining an unrequested push and asking for confirmation).

## Demo lineup (v1, one spec file each)

The hero demo lives on the homepage, the other eight on their group pages; scripts are written
out in `website.COPY.md`.

1. use-conversational-language two-exchange "draft an answer" — hero.
2. refine-ticket grilling (one question, recommendation) — /task-workflow.
3. fetch-pr-review → /clear → refine-pr-review triage (comment 3/12: address / partial / push
   back) — /pr-review-assistants.
4. fresh-eyes-review returning 3 findings with address options — /fresh-eyes-review.
5. context-checkup audit with a proposed trim — /context-hygiene.
6. self-improve turning a correction into a doc diff — /skills-docs-authoring.
7. use-conversational-language two-exchange "explain the refactor" — /conversational-language.
8. compact-docs-writer minimal rewrite diff with a measured word delta (spec `14-compact-doc`) —
   /skills-docs-authoring.
9. compact-skill-creator trigger-type intake, then the drafted skill (spec `15-create-skill`) —
   /skills-docs-authoring.

Specs `08`-`13` (a task-workflow demo expansion) are committed but not yet played on any page, so
the two new demos take `14` and `15`.

The git-read-only-by-default demo was tied to the /rules page and is deferred with it.

## Copy status

Homepage copy and block order are approved (copy session 2026-07-27) and live in
`website.COPY.md` — that file wins over any text shown in this doc or the mockups. The group
pages carry the §5-§10 blocks; metadata approved 2026-07-31, page URLs and titles 2026-08-01,
group cards and the slimmed homepage 2026-08-02. Any further
group-page copy follows the same process:
short, human, non-salesy, per the DECISIONS copy rules (no dashes as punctuation, straight
apostrophes), reviewed with Francesco section by section.

## Accessibility & performance

Per DECISIONS acceptance criteria: renders with JS disabled except playback, visible focus
(2px green outline like the reference), reduced motion respected, responsive to mobile,
Lighthouse performance and accessibility 95+, OpenGraph/social meta on every page.

## Open items

- Lucide icon picks per section and per skill block.
- When to add the catalog page.
