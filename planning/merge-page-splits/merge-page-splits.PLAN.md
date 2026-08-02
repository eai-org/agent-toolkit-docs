# Merge the two page splits (main into multi-page-split)

## Situation

The repo sits mid-merge on branch `multi-page-split` (do NOT abort or restart the merge).
Francesco (main) and Stefanos (multi-page-split) independently split the one-page site into
per-group pages. Francesco merged `main` into `multi-page-split`; 9 paths are unmerged, the rest
auto-merged and staged. All decisions below were made by Francesco; execute them without re-asking.
Ask before anything not covered here.

Who owns what in conflict markers: `HEAD`/`--ours` = Stefanos, `main`/`--theirs` = Francesco.

## Outcome in one paragraph

Stefanos's homepage, nav (no page links, theme toggle, memoized stars) and dark/light theme
survive. Francesco's six group pages and URLs survive: `task-workflow`, `pr-review-assistants`,
`fresh-eyes-review`, `context-hygiene`, `skills-docs-authoring`, `conversational-language`
(fresh eyes stays its own page, so the homepage grid grows to six cards). Every group page gets
Stefanos's "Keep going" footer, reworked to show all six groups compactly. All block separator
lines become content-width. Do not reword any user-visible copy beyond what this plan specifies
(AGENTS.md: copy needs Francesco's approval).

## Conflict resolutions (git add/rm of these paths is authorized; nothing else)

1. `src/components/Nav.astro` — keep Stefanos's side entirely:
   `git checkout --ours -- src/components/Nav.astro && git add src/components/Nav.astro`
2. `src/components/SkillBlock.astro` — keep Francesco's side entirely:
   `git checkout --theirs -- src/components/SkillBlock.astro && git add src/components/SkillBlock.astro`
3. Delete: `git rm` these (only Francesco's old homepage used the sections; his six pages replace
   Stefanos's five pages; the homepage Refine/Plan/Act block is dropped since the cards grid
   already routes there):
   - `src/components/sections/{Authoring,Conversational,FreshEyes,Hygiene,Reviews,Workflow}.astro`
   - `src/pages/{workflow,reviews,hygiene,authoring,conversational}.astro`
4. `tests/page.test.ts` — rebuild by hand (see Tests below), then `git add`.

Already staged and correct as-is: `scripts/lib/cast.ts`, `tests/cast.test.ts` (Francesco's
end-hold improvement), `src/components/{PageHeader,RpaFlow}.astro`, the six pages (edited below).

## Edits

### `src/pages/index.astro`
Remove the `Workflow` import and `<Workflow />`. Nothing else changes.

### `src/components/Section.astro`
Move `border-t border-border` from the `<section>` to the inner `max-w-page` div (separators get
content width). Keep everything else, including the `level` prop.

### `src/components/KeepGoing.astro`
Rework: render ALL entries of `GROUPS` as compact `GroupCard`s (no `current` prop, no
`siblingsOf`), grid `md:grid-cols-3`, keep the "Keep going" label, delete the "All five groups"
link. Move `border-t border-border` from the `<section>` onto the inner `max-w-page` div, like
Section.astro. (Base.astro's site footer keeps its full-width border: both branches had it.)

### `src/data/groups.ts`
Remove `wide` (from the interface and data), `groupBySlug`, and `siblingsOf` (all unused after the
KeepGoing rework; also drop `wide` handling in `GroupCard.astro`). Fix the slug doc-comment example.
Replace `GROUPS` with exactly (copy approved by Francesco):

| slug | kicker | hue | title | line | count |
|---|---|---|---|---|---|
| task-workflow | Task workflow | green | Refine, plan, act | Turn a ticket into requirements, a plan, then code, with a clean handoff at every step. | 4 skills |
| pr-review-assistants | PR reviews | orange | Both sides of the review | Triage the feedback your PR gets and review someone else's code. | 3 skills |
| fresh-eyes-review | Fresh eyes review | pink | Let a sub-agent review the code | A sub-agent with a clean context, seeing only the changeset, catches what the session that wrote the code misses. | 1 skill |
| context-hygiene | Context & memory | blue | Keep the context lean | See what auto-loads before you even type, and trim it without breaking anything. | 2 skills |
| skills-docs-authoring | Skill & doc authoring | purple | Teach your agent | Write skills and docs agents actually follow, and turn every correction into a lasting lesson. | 3 skills |
| conversational-language | Conversational voice | blue | Texts that sound like a real human typed them | No em dashes, no "this valuable feedback". Just what you would have written yourself, faster. | 1 skill + 1 rule |

### `src/components/sections/WhatsInside.astro`
Heading: `Five groups of skills` → `Several groups of skills` (future-proof; approved wording).

### `src/styles/global.css`
Remove `--container-nav` and its comment (only Francesco's dropped nav used it). Keep everything
else in the merged file: the light-dark theme tokens, `.terminal { color-scheme: dark }`, the
global `.sk`, and `.stage`/`.arrow` (RpaFlow uses them).

### The six pages in `src/pages/`
On all six: pass `back` to `<Base>` (shows the ← in the nav) and add `<KeepGoing />` as the last
child of `<Base>` (import it). Replace four meta `description`s with Stefanos's wording
(page content itself stays untouched):
- task-workflow: `Refine, plan, act: turn a ticket into requirements, a plan, then code, with a clean handoff at every step.`
- context-hygiene: `See what auto-loads into your agent before you even type, and trim it without breaking anything.`
- skills-docs-authoring: `Write skills and docs your agents actually follow, and turn every correction into a lasting lesson.`
- conversational-language: `Texts that sound like a real human typed them, not sophisticated AI prose.`
`pr-review-assistants` and `fresh-eyes-review` keep their current descriptions.

## Tests (`tests/page.test.ts`)

Rebuild as one coherent file (both sides' versions describe dead structures; the conflicted file
mixes them). Keep the `dist/` guard and the base-from-favicon helper. Contents:

- **Group pages** — keep main's `groupPages`/`describe.each` block (titles, meta description,
  canonical/og, single h1, h2 heading without kicker, content-width separator check, one cast per
  page, install link, SKILL.md/rule GitHub links, article links, em-dash and apostrophe guards)
  with the four descriptions updated to match the pages. DROP the nav-link tests (`navLinks`,
  middot separators, `aria-current`): the nav no longer carries page links.
- **Homepage** — Stefanos's ORDER block-sequence test with `'Refine, Plan, Act'` removed and
  `'Five groups of skills'` → `'Several groups of skills'`; hero cast is the only cast; a card per
  group (six new slugs) inside `id="whats-inside"`; no em dashes; keep main's "article links moved
  off the homepage" and "rules block links to GitHub rules list" tests.
- **Site-wide** (pages = index + the six from `GROUPS`) — keep Stefanos's: every page built, seven
  casts each on exactly one page, theme toggle + inline pre-paint script, unique canonicals,
  unique non-empty titles, no curly apostrophes, em dashes only on the conversational page (2),
  install reachable from every page. Add: every group page links to all six group pages (the
  footer), and no page has `<section` carrying `border-t` (separators are content-width).

## Planning docs

`planning/website.{COPY,DECISIONS,DESIGN}.md` auto-merged and may assert both dead structures.
Update them to describe the final site (six pages with Francesco's URLs, nav without links, footer,
content-width separators, the copy above). AGENTS.md references them, so per Francesco's rules run
`/compact-docs-writer` before editing.

## Verify

1. `npm run build` (compiles demos + llms.txt + social card, needs the `../agent-toolkit`
   checkout, then `astro build`).
2. `npm test` — cast tests and, with `dist/` present, all page checks must pass.
3. `git status` must show no unmerged paths and no unexpected files.

## Explicitly out of scope

- Do NOT `git commit` (nor any other git write beyond the adds/removes listed above): Francesco
  reviews the resolved tree and commits the merge himself.
- No copy rewording beyond the strings quoted here.
