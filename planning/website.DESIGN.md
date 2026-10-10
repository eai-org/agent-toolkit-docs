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
  bullet list with `b` + muted detail span, chip (the homepage skills chain reuses it as a link, on
  `bg-panel` in the light theme so the hue text passes WCAG AA, dark theme unchanged; quiet hover:
  `a.chip:hover` turns the border muted, no transition; non-link chips unchanged), panel, quote-in-panel, terminal window with
  traffic-light dots, RPA flow strip.
- Hue per group, reusing the deck's five accents: workflow green, reviews orange, fresh-eyes
  pink, talking to humans blue, hygiene blue, authoring purple, rules pink. Green doubles as the
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
  ← arrow on group pages), theme toggle, `Skills` and `About us` links, GitHub link with star count, green install button
  anchoring to the hero install terminal from every page. Nothing else, no hamburger, no
  dropdowns. Below `md` the star count hides; below `sm` the wordmark, links and install button
  shrink to 12-13px, the page gutter is 1rem, the back arrow hides, GitHub is the 16px Lucide icon
  (`aria-label="GitHub"`) and `About us` reads `About`, so the bar fits 360px in one row.
- Motion: per DECISIONS — demo players only, plus CSS blinking cursor after the hero h1.

## Homepage (approved skeleton; final copy in `website.COPY.md`)

The homepage is a compact overview (slimmed in the 2026-08-02 merge); the group blocks and
their demos live on the group pages. Block order:

1. Hero, centered: two-exchange voice TUI demo → h1 mono `agent-toolkit` + blinking cursor →
   tagline → chips → one-line install terminal with copy button → muted sans
   line disclosing the daily Claude Code update hook, with the `./install.sh --no-auto-update`
   code chip → mono line "Other ways to install:" with agentwheel, skills.sh, Claude Code plugin
   and README links → star line (orange ★, link to the repo).
2. The problem (pink): "Different projects, same repetitive tasks", 3 bullets, quote panel.
3. What's inside (blue, anchor `#whats-inside`): "Several groups of skills", six group cards in
   a 2-col grid, each linking its group page (copy in `website.COPY.md` §2b), then a muted "Looking for one skill by name?" line with an `Every skill and rule →` link to `/skills/`.
4. How they fit together (purple, anchor `#skills-chain`): "One routine, from ticket to pull
   request", muted intro, the main lane with its label above, two option rows with inline labels,
   two satellite rows with labels above and muted unlinked tails; linked mono chips in the group
   hue joined by muted → text arrows, rows wrap on phones; a mono new-tab link to the README
   relationship graph. No demo, no grid, no SVG, no JS (copy in `website.COPY.md` §2c).
5. Principles (green): six panes in a 2-col grid, three inline Medium links, no footer link.
6. Philosophy (green): "A toolkit, not a framework", comparison panels, no quote.
7. Opinionated rules (pink, short: no heading, no demo, a muted use-my-mothertongue line with
   its GitHub link after the bullets, footer link to `/skills/#rules`, same tab, then a second footer link on its own line to the
   agentwheel install doc on GitHub, new tab).
8. Share your feedback (green, centered): kicker + one line + "Open an issue →" (GitHub issues).
9. Mono footer (`agent-toolkit · MIT`). No standalone install section (hero covers it, nav
   install button anchors to the hero terminal) and no credits section.

Demo players below the hero lazy-load (Lighthouse 95+ budget).

## Group pages

Each of the six shipped pages (`/task-workflow`, `/pr-review-assistants`, `/fresh-eyes-review`,
`/context-hygiene`, `/skills-docs-authoring`, `/talking-to-humans`) is built in the
standard shell as (expansion built 2026-08-01, block copy draft in `website.COPY.md` §14):

1. Nav (same bar, wordmark prefixed with a ← back arrow).
2. Page title: big centered mono h1, hero-style, no kicker (`PageHeader.astro`; titles in COPY
   §14).
3. Intro section, borderless: the block heading demoted to h2, intro line(s); /task-workflow
   keeps the flow strip, whose boxes link to their phase (see its deviations).
4. One hairline-separated block per skill (`SkillBlock.astro`, py-10 vs the sections' py-14):
   mono skill name as h2 in the group hue, 1-3 muted lines, the demo inside the block of the
   skill it shows, mono `Read the SKILL.md →` link to GitHub (rules: `Read the rule →`), plus the
   per-block article links COPY §14 defines. No icons yet (open item). Each block's `<section>`
   carries an anchor id: the `id` prop when passed, else the block `name` on blocks that link
   GitHub (rule blocks included); a `github={false}` block gets none unless passed one. A global
   `[id] { scroll-margin-top: 4rem }` in `global.css` keeps every anchor jump below the sticky nav;
   no per-component scroll margin.
5. Page-level article link where the copy defines one, as a slim closing block.
6. "Keep going" footer (`KeepGoing.astro`): the next two groups in order, wrapping, as compact
   2-col cards (kicker + one-line title, long titles swapped for their short stand-in), plus an
   `All groups →` link to the homepage grid and an `Every skill and rule →` link to `/skills/`.

/task-workflow deviations (RPAC revamp 2026-08-02): a five-stage flow strip (Consolidate added,
purple); a non-skill block "Execute the plan" (neutral-foreground mono title, no GitHub link); an
internal cross-link block for self-review, the first Consolidate step (pink title, `BASE_URL`-based link to
`/fresh-eyes-review/#self-review`, no demo); two extras subsections after handover, "Before you pick the ticket up" and "Along the way" (sans-serif h2 + muted
intro each, like the page intro heading); the flow strip is the page's map (added 2026-10-10): each box is a same-page link (`<a class="stage">`, existing look, `panel2` background on hover through an unlayered `a.stage:hover` rule, the global focus outline, no smooth scroll) to `#fetch-ticket`, `#refine-ticket`, `#create-implementation-plan`, `#act`, `#consolidate`; commands and file names in a box are mono `<b class="file">`; horizontal with arrows from `lg` (1024px), stacked full width without arrows below `lg` (phones and tablets); "Execute the plan" carries `id="act"` and the Consolidate cross-link `id="consolidate"`; the harden-artifact block (added 2026-10-10) is the first block with
both its GitHub link and an internal link (`How the fresh eyes review works →` to
`/fresh-eyes-review/`, same tab).

/skills-docs-authoring deviations (2026-08-02; each rule bullet carries `id="<rule-name>"`): the page-level article link renders in the intro
as a more-link line instead of a closing block, and a compact rules subsection sits before the
Keep-going footer — sans-serif h2, muted intro, bulleted mono rule names, each with its own
`Read the rule →` link.

/fresh-eyes-review deviations (revamp 2026-08-14, diagram reshaped to the user's sketch
2026-08-15): a round-trip flow diagram closing the intro (`FreshEyesFlow.astro`): one tall
full-height Authoring session `.stage` box (orange) on the left with its run text at the top
and its judging text pinned to the bottom (`mt-auto` div, since `.stage > span` would
override the margin), a smaller vertically centered Reviewing session box (pink) on the
right, joined by two diagonal SVG arrows (muted currentColor stroke, marker arrowheads) —
out of the tall box's upper edge, back into its lower edge — each with a muted label rotated
along it; the desktop layout is a fixed-aspect relative container with absolutely positioned
boxes so the percentage-anchored arrows stay attached at any width — 900/175 at lg (keeps the
gap between the tall box's two texts at roughly 3-4 line breaks, per user 2026-08-15) and a
taller 900/210 in the md range, where the wrapped texts need the room (the SVG viewBox stays
900x175 and stretches, which shifts the arrow angles a couple of degrees there); below md
it swaps for three stacked boxes (the judging text as its own Authoring session box) with
centered `↓ label` lines between them (unlike the RPAC strip, which hides its arrows below lg, on phones and tablets); a second skill block, self-review (pink, demo 25), right after the fresh-eyes-review block; a non-skill closing subsection "More than a code reviewer" (sans-serif h2 + muted
paragraphs, whose building-block paragraph links /self-review to the self-review block (`#self-review`), /harden-artifact to its block on /task-workflow and /maintainer-review to its block on /pr-review-assistants, all same tab) between the self-review block and the page-level article link.

/talking-to-humans deviations (2026-10-10): two subsections in the /task-workflow section shape (hairline, sans-serif h2, muted intro). First "Texts that go out under your name" (use-conversational-language, write-realistic-texts, no-nonsense-comments), then "Explanations written to be understood" (explain-in-simple-language, write-simple-explanations), whose two-paragraph intro closes on the inline new-tab "Get the use-my-mothertongue rule →" more-link. No page-level closing link: the voice article link sits in the use-conversational-language block (article prop), as on /context-hygiene.

/rules (still deferred) would frame everything as opt-in; its demo shows a rule steering behavior
(git-read-only-by-default declining an unrequested push and asking for confirmation).

## About page (2026-08-03)

`/about`, a nav page link (after `Skills`, before GitHub, on every page).
Standard shell: back-arrow wordmark, PageHeader (h1 + h2 + muted intro), then a 3-col grid
(stacks on mobile) of channel cards in the group-card look — Medium green, Discord purple,
LinkedIn blue, each an external link closing on a mono blue action line — then a
hairline-separated Free software block (orange kicker) ending on the repo link. No demos, no
Keep-going footer. Copy in COPY §15.

## Catalogue page (2026-10-10)

`/skills/`, a Group-pages variant: back-arrow shell, PageHeader (h1 + h2 + muted intro), no KeepGoing, no demo. One `py-10` hairline section per group (hue kicker, h2 linking the group page, bullet rows, `Open /<slug> →`), an "Also in the toolkit" section only when a skill sits on no page, then `#rules`: pink kicker, no h2, intro with the install command as a `whitespace-nowrap` code chip, one row per rule, the mothertongue snippet row last. Row: blue mono name link (to the block on the group page, else to GitHub), muted line, `Read the SKILL.md →` / `Read the rule →` only for placed names. A row may also carry an optional `.chip` beside the name (mono, 12px, bold like the Hero chips, no hue) and an optional inline-code command at the end of its line (the `Rules.astro` code style, `whitespace-nowrap`); both render only when set in `src/data/catalogue.ts`. The run-nx-checks row uses both (chip `Nx workspaces only`, command `./install.sh --exclude run-nx-checks`).

## Demo lineup (v1, one spec file each)

The hero demo lives on the homepage, the other twenty-five on their group pages; scripts are written
out in `website.COPY.md`.

1. use-conversational-language two-exchange "draft an answer" — hero.
2. refine-ticket grilling (one question, recommendation, then the save and the next-step
   hand-off) — /task-workflow.
3. fetch-pr-review → /clear → refine-pr-review triage (the comment quoted by its opening words,
   a muted reasoning line, address / partial (recommended) / push back, the typed 2, then the
   batch confirmation, extended 2026-10-09; extended 2026-08-06 through the verdict pick to the
   ANSWERS and REQUIREMENTS saves and the /create-implementation-plan hand-off) —
   /pr-review-assistants.
4. fresh-eyes-review invoked with an explicit target (the 4521-archive branch, per user
   2026-08-15 so the demo shows the input mode the copy leads with), prompt approval, then 3
   findings judged against the task, one dismissed as intentional (extended 2026-08-14 from
   the single findings line) — /fresh-eyes-review.
5. context-checkup audit with a proposed trim, accepted, ending on the savings line —
   /context-hygiene.
6. self-improve turning a correction into a doc diff, ending on the "Not applied yet" word-delta
   line with no options menu (2026-10-09) — /skills-docs-authoring.
7. use-conversational-language two-exchange "write a message on why we needed this refactor" — /talking-to-humans, first subsection.
8. fetch-ticket saving a ticket into a self-contained file, then the next-step hand-off —
   /task-workflow.
9. create-implementation-plan asking where the serializer should live, then the save and the
   next-step hand-off — /task-workflow.
10. plain-prompt plan execution running the checks (no skill invoked) — /task-workflow.
11. handover saving a paste-ready PR description — /task-workflow.
12. create-manual-test-instructions saving a manual test file — /task-workflow, under Along the way.
13. review-ticket delivering its triage verdict, closing on the muted `/verify-understanding`
    hand-off — /task-workflow, under Before you pick the ticket up.
14. compact-docs-writer minimal rewrite diff with a measured word delta (spec `14-compact-doc`) —
    /skills-docs-authoring.
15. compact-skill-creator trigger-type intake, then the drafted skill (spec `15-create-skill`) —
    /skills-docs-authoring.
16. memory-doctor relocating one block into its doc, four options ending in "Something else"
    (spec `16-memory-doctor`) — /context-hygiene, second demo on that page.
17. review-code-assistant surfacing one grounded finding as three outputs: the heading line, the
    expected-vs-actual explanation and the green paste-ready suggested comment (spec
    `17-review-code-assistant`, added 2026-08-06) — /pr-review-assistants, second
    demo on that page.
18. check-ticket-implementation reporting the tally, the requirements needing attention and one
    partial block with its evidence ref (spec `18-check-ticket`, added 2026-08-07) —
    /task-workflow, under Along the way. Only demo carrying status emoji.
19. agentify-project audit, the multi-select menu rendered single-select with All
    recommended, each of the three steps proposed and approved, the run confirmed, then the
    memory-doctor and context-checkup hand-off (spec `19-agentify-project`, added 2026-10-09) —
    /context-hygiene, last demo on that page.
20. maintainer-review verdict, one blocking finding, one walked comment answered but still
    applying, then the recommended next action (spec `20-maintainer-review`, added 2026-10-09) —
    /pr-review-assistants, third demo on that page.
21. verify-understanding teach-back: the developer explains the 1234-users export, is
    corrected from the review, and gets the open question to raise with the PO, then the
    refine-ticket hand-off (spec `21-verify-understanding`, added 2026-10-09) — /task-workflow,
    under Before you pick the ticket up.
22. split-plan-tasks splitting the 1234-users plan into 5 tasks in 2 PR-sized groups, one
    boundary question (where the audit log entry goes) answered with the typed 1, the approval
    question answered y, then the task list appended to the plan and the muted
    execute-plan-tasks hand-off (spec `22-split-plan-tasks`, added 2026-10-10) — /task-workflow,
    after Execute the plan.
23. execute-plan-tasks running task 1.3 (wire the export button), checks passing and the task
    ticked, the green commit subject, the group-complete line, then the muted hand-off to task
    2.1 (spec `23-execute-plan-tasks`, added 2026-10-10) — /task-workflow, after
    split-plan-tasks.
24. harden-artifact on the 1234-users plan: one proven finding fixed, a clean second round, then
    the two launch commands for the next phase (spec `24-harden-artifact`, added 2026-10-10) —
    /task-workflow, after create-implementation-plan.
25. self-review with no argument on the 1234-users branch: the goal it judges against, two
    findings walked one at a time, a leftover fixed and a redundancy dismissed with a reason, a
    round 2 on the fix, the saved report and the commit, stamp, checks and paste reminders (spec
    `25-self-review`, added 2026-10-10) — /fresh-eyes-review, second demo on that page.
26. explain-in-simple-language before/after: the same question "Why do we pass the index here?" answered with a stand-in (pink), then reworded through the skill (green), the SKILL.md's own example pair (spec `26-explain-simple`, added 2026-10-10) — /talking-to-humans, under Explanations written to be understood.

The flow demos (2, 3, 8, 9, 22, 23) close with the skill's real hand-off suggestion, rendered muted:
`Next: /clear, then <command for the next phase or task>`. Demos 13, 19, 20 and 21 also close on a
muted `Next:` line naming the next step, without the `/clear`. Demo 24 closes instead on the two
launch commands harden-artifact prints, muted, with no `Next:` and no `/clear`.

The git-read-only-by-default demo was tied to the /rules page and is deferred with it.

## Copy status

Copy lives in `website.COPY.md`, which mirrors the shipped code (the code is the truth, see
AGENTS.md) and wins over any text shown in this doc or the mockups. New copy stays short, human,
non-salesy, per the DECISIONS copy rules (no dashes as punctuation, straight apostrophes).

## Accessibility & performance

Per DECISIONS acceptance criteria: renders with JS disabled except playback, visible focus
(2px green outline like the reference), reduced motion respected, responsive to mobile,
Lighthouse performance and accessibility 95+, OpenGraph/social meta on every page.

## Open items

- Lucide icon picks per section and per skill block.
