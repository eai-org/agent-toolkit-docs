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
  paused offscreen. `prefers-reduced-motion`: static first frame until play.

## Layout system

- Single centered column, `max-width` ~960px, sections separated by 1px `--border`, generous
  vertical padding. No sidebars, no split panes.
- Section pattern (homepage and group pages alike): kicker → heading → ≤3 short lines →
  optional panel/quote → optional demo → mono `more →` link. Never long prose.
- Only grids: the deck's own — principles panels (2-col, pillar 5 spanning), comparison (2-col).
  Both stack on mobile like the deck's `.cols`.
- Nav: sticky minimal bar — mono green wordmark, GitHub link with star count, green install
  button anchoring to the hero install terminal. No other links (one-page site), no hamburger,
  no dropdowns.
- Motion: per DECISIONS — demo players only, plus CSS blinking cursor after the hero h1.

## Homepage (approved skeleton; final copy in `website.COPY.md`)

v1 is a one-page site: this page is the whole site; group pages may come later. Approved block
order (reorder session 2026-07-27):

1. Hero, centered: two-exchange voice TUI demo → h1 mono `agent-toolkit` + blinking cursor →
   tagline → chips → one-line install terminal with copy button → mono link
   "Other ways to install →" (README install section on GitHub) → star line (orange ★, link to
   the repo).
2. The problem (pink): "Different projects, same repetitive tasks", 3 bullets, quote panel.
3. Principles (green): six panes in a 2×3 grid, three inline Medium links, no footer link.
4. Philosophy (green): "A minimalistic toolkit, not a framework", comparison panels, no quote.
5. Task workflow (green): "Refine, Plan, Act", four equal-size stage boxes
   (Ticket/Refine/Plan/Act), refine-ticket grilling demo, footer link to a Medium article.
6. One compact section per remaining group, order: reviews (orange, fetch → /clear → refine
   demo), fresh-eyes (orange, findings demo), hygiene (blue, context-checkup demo), authoring
   (purple, self-improve demo, footer link to a Medium article), conversational (blue,
   two-exchange refactor demo), rules (pink, short: no heading, no demo, footer link to the
   README rules section on GitHub). Only workflow, authoring and rules have footer links; the
   others' "Read more" links return if group pages are added later.
7. Share your feedback (green, centered): kicker + one line + "Open an issue →" (GitHub issues).
8. Mono footer (`agent-toolkit · MIT`). No standalone install section (hero covers it, nav
   install button anchors to the hero terminal) and no credits section.

Demo players below the hero lazy-load (Lighthouse 95+ budget).

## Group page template (deferred — not in v1)

Kept for a possible later expansion beyond the one-page site. Per the approved /conversational
example — everything stacked, single column:

1. Nav (same bar).
2. Title: skill/group name (mono) + one concise description line.
3. Demo block(s): for /conversational, two windows — "without the skill" (stiff AI reply) and
   "with the skill" (human reply). Other pages: at least the flagship demo.
4. Per-skill mini sections following the section pattern (icon, 1-2 lines each).
5. Links: each skill's SKILL.md on GitHub (rule files for /rules) + install.

/rules would frame everything as opt-in; its demo shows a rule steering behavior
(git-read-only-by-default declining an unrequested push and asking for confirmation).

## Demo lineup (v1, one spec file each)

All seven demos live on the homepage; scripts are written out in `website.COPY.md`.

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
`website.COPY.md` — that file wins over any text shown in this doc or the mockups. v1 has no
other pages, so the copy pass is complete. Any future group-page copy follows the same process:
short, human, non-salesy, per the DECISIONS copy rules (no dashes as punctuation, straight
apostrophes), reviewed with Francesco section by section.

## Accessibility & performance

Per DECISIONS acceptance criteria: renders with JS disabled except playback, visible focus
(2px green outline like the reference), reduced motion respected, responsive to mobile,
Lighthouse performance and accessibility 95+, OpenGraph/social meta on every page.

## Open items

- Lucide icon picks per section.
- Whether/when to add group pages and the catalog beyond the one-page v1.
