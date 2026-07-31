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
  the only git-style diff is the self-improve demo's suggested addition (green `+` line).
- Rendered by asciinema-player from generated casts (per DECISIONS), capped at 624px
  (`--container-demo`) so terminal text stays ~14px; each loops while in view (GIF-like),
  paused offscreen, holding its finished frame for at least 3s (longer the more it printed)
  before restarting. `prefers-reduced-motion`: static first frame until play.

## Layout system

- Single centered column, `max-width` ~960px, sections separated by 1px `--border`, generous
  vertical padding. No sidebars, no split panes.
- Section pattern (homepage and group pages alike): kicker → heading → ≤3 short lines →
  optional panel/quote → optional demo → mono `more →` link. Never long prose.
- Only grids: the deck's own — principles panels (2-col, pillar 5 spanning), comparison (2-col).
  Both stack on mobile like the deck's `.cols`.
- Nav: sticky minimal bar — mono green wordmark, one mono link per group page (labels in
  `website.COPY.md`; muted, split by hairline middots, green for the page you are on), GitHub
  link with star count, green install button anchoring to the hero install terminal from every
  page. Nothing else, no hamburger, no dropdowns. It sits in a wider container than the page
  column (`--container-nav` 88rem) so the links fit on one row; below 1408px they drop to a
  second row that scrolls sideways if it has to.
- Motion: per DECISIONS — demo players only, plus CSS blinking cursor after the hero h1.

## Homepage (approved skeleton; final copy in `website.COPY.md`)

The homepage carries the whole pitch; blocks 5-10 hand their demo to the group page they link
to (see below). Approved block order (reorder session 2026-07-27):

1. Hero, centered: two-exchange voice TUI demo → h1 mono `agent-toolkit` + blinking cursor →
   tagline → chips → one-line install terminal with copy button → mono link
   "Other ways to install →" (README install section on GitHub) → star line (orange ★, link to
   the repo).
2. The problem (pink): "Different projects, same repetitive tasks", 3 bullets, quote panel.
3. Principles (green): six panes in a 2×3 grid, three inline Medium links, no footer link.
4. Philosophy (green): "A minimalistic toolkit, not a framework", comparison panels, no quote.
5. Task workflow (green): "Refine, Plan, Act", four equal-size stage boxes
   (Ticket/Refine/Plan/Act), footer link to `/task-workflow`.
6. One compact section per remaining group, order: reviews (orange), fresh-eyes (orange),
   hygiene (blue), authoring (purple), conversational (blue), each with a footer link to its
   group page; rules (pink, short: no heading, no demo, footer link to the README rules section
   on GitHub).
7. Share your feedback (green, centered): kicker + one line + "Open an issue →" (GitHub issues).
8. Mono footer (`agent-toolkit · MIT`). No standalone install section (hero covers it, nav
   install button anchors to the hero terminal) and no credits section.

Demo players below the hero lazy-load (Lighthouse 95+ budget).

## Group pages

Each of the six shipped pages (`/task-workflow`, `/pr-review-assistants`, `/fresh-eyes-review`,
`/context-hygiene`, `/skills-docs-authoring`, `/conversational-language`) renders its homepage
block plus that block's demo in the standard shell, with the block heading as the page h1. The richer template below is the later expansion, per the
approved /conversational-language example — everything stacked, single column:

1. Nav (same bar).
2. Title: skill/group name (mono) + one concise description line.
3. Demo block(s): for /conversational-language, two windows — "without the skill" (stiff AI
   reply) and "with the skill" (human reply). Other pages: at least the flagship demo.
4. Per-skill mini sections following the section pattern (icon, 1-2 lines each).
5. Links: each skill's SKILL.md on GitHub (rule files for /rules) + install.

/rules would frame everything as opt-in; its demo shows a rule steering behavior
(git-read-only-by-default declining an unrequested push and asking for confirmation).

## Demo lineup (v1, one spec file each)

The hero demo lives on the homepage, the other six on their group pages; scripts are written out
in `website.COPY.md`.

1. use-conversational-language two-exchange "draft an answer" — hero.
2. refine-ticket grilling (one question, recommendation) — workflow section.
3. fetch-pr-review → /clear → refine-pr-review triage (comment 3/12: address / partial / push
   back) — reviews section.
4. fresh-eyes-review returning 3 findings with address options — fresh-eyes section.
5. context-checkup audit with a proposed trim — hygiene section.
6. self-improve turning a correction into a doc diff — authoring section.
7. use-conversational-language two-exchange "explain the refactor" — conversational section.

The git-read-only-by-default demo was tied to the /rules page and is deferred with it.

## Copy status

Homepage copy and block order are approved (copy session 2026-07-27) and live in
`website.COPY.md` — that file wins over any text shown in this doc or the mockups. The group
pages reuse those blocks; their metadata and link labels were approved 2026-07-31. Any further
group-page copy follows the same process:
short, human, non-salesy, per the DECISIONS copy rules (no dashes as punctuation, straight
apostrophes), reviewed with Francesco section by section.

## Accessibility & performance

Per DECISIONS acceptance criteria: renders with JS disabled except playback, visible focus
(2px green outline like the reference), reduced motion respected, responsive to mobile,
Lighthouse performance and accessibility 95+, OpenGraph/social meta on every page.

## Open items

- Lucide icon picks per section.
- Whether/when to expand the group pages beyond their homepage blocks, and to add the catalog.
