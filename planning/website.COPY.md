# COPY: agent-toolkit website

This file mirrors the shipped user-visible copy: the source code is the truth and every copy
change syncs here (see AGENTS.md; process changed 2026-08-02, no approval gate since). Earlier
approval history: 2026-07-27 copy session including block order; §5-§10 page metadata
2026-07-31; §5-§8 page URLs and titles 2026-08-01; group cards (§2b), slimmed homepage and the
four reworked meta descriptions 2026-08-02. `website.DESIGN.md` holds layout/visuals,
`website.DECISIONS.md` the tech and scope. The site is a homepage overview plus one page per skill group (§5-§10), an About page (§15) and the generated catalogue `/skills/` (§16). Homepage block order: §1 hero, §2 problem, §2b card grid, §2c skills chain, §3 principles, §4 philosophy,
§11 rules, §12 feedback. The §5-§10 blocks and their demos live only on their group pages,
structured per §14. Bullet items render as the deck pattern:
**bold lead** followed by a muted detail span (no literal dash between them). Skill names in
bullets are mono. Demo lines: `>` input box, `✻` muted spinner, `⏺` agent output; numbered
options with `❯` on the highlighted one and `(recommended)` in green. In voice demos the `⏺` is
pink for the stiff AI reply and green for the human one.

## 0. Nav (every page)

- Wordmark (mono green, links home): agent-toolkit — prefixed with a ← arrow on subpages
- Theme toggle (icon-only: dark/light/system)
- Skills, to `/skills/` (2026-10-10)
- About us, to `/about` (added 2026-08-03); below `sm` it reads `About`
- Below `sm` the GitHub link is the 16px Lucide icon, `aria-label="GitHub"`, instead of the word
- GitHub, with the star count appended (`★ 1,284`), to the repo
- Install button, to the hero install terminal

## 1. Hero (centered)

Demo window (traffic-light dots, two exchanges):

```
> Draft an answer for my colleague
⏺ (pink) "Thank you for this valuable feedback! You are absolutely right about the code
  duplication. I have carefully refactored the implementation by extracting the shared logic
  into a dedicated helper method, ensuring improved maintainability and adherence to the DRY
  principle."
> /use-conversational-language Draft an answer for my colleague
✻ Drafting in a human voice…
⏺ (green) "good catch, I extracted the duplicate code to a shared method"
```

- h1 (mono): `agent-toolkit` + blinking green cursor
- Tagline: Minimalistic skills and rules for AI coding agents that assist your daily work in any
  software engineering project
- Chips: `Project-agnostic` (green) · `Works with any agent` (blue) · `MIT` (orange)
- Install terminal (copy button): comment `# install with one command`, command
  `git clone https://github.com/eai-org/agent-toolkit.git && cd agent-toolkit && ./install.sh`
  (The sticky nav's install button anchors here from every page; the standalone "Get it" section
  was dropped.)
- Below it (muted sans 13px, max 600px, added 2026-10-10): On Claude Code it also adds a hook that
  pulls the repo and reruns your install once a day, so your skills and rules follow the repo.
  Turn it off with `./install.sh --no-auto-update`. (The command is an inline code chip, the
  final period outside it.)
- Below that, one mono line (added 2026-10-10, replaces the single 2026-07-27 link, Francesco's
  2026-10-10 decision): `Other ways to install:` muted, then four blue links, same tab:
  [agentwheel](https://github.com/eai-org/agent-toolkit/blob/main/docs/install-with-agentwheel.md) ·
  [skills.sh](https://github.com/eai-org/agent-toolkit/blob/main/docs/install-skills.md#install-via-skillssh) ·
  [Claude Code plugin](https://github.com/eai-org/agent-toolkit/blob/main/docs/install-skills.md#install-via-claude-code-plugin-marketplace) ·
  [README →](https://github.com/eai-org/agent-toolkit#how-to-install-the-skills)
- Star line (last in the hero, below these lines, orange ★): This toolkit is entirely open source and free to
  use. [Give us a star on GitHub](https://github.com/eai-org/agent-toolkit) to support us.

## 2. The problem (pink)

- Kicker: The problem
- Heading: Different projects, same repetitive tasks
- **Every project is a different world** tech stacks, trackers, conventions, AI adoption
- **Yet the daily tasks repeat everywhere** fetch a ticket, refine it, plan, review, reply
- **agent-toolkit lets AI assist exactly those** generic skills that can be used in any project
- Quote panel: "I kept rebuilding the same AI setup in every project, so I built one that works
  everywhere."

## 2b. What's inside (blue)

- Kicker: What's inside
- Heading: Several groups of skills
- Six cards in a 2-col grid, one per group page; each card: kicker in the group hue, bold title,
  muted line, count bottom-left, blue `Open →`. The same cards, compact (kicker + title only),
  reappear two at a time in the "Keep going" footer of every group page (§14); there a title too
  long for one line gets a compact stand-in — `/talking-to-humans`: "Your voice, clear explanations". Card copy:

| page | kicker (hue) | title | line |
|---|---|---|---|
| `/task-workflow` | Task workflow (green) | Refine, plan, act, consolidate | Turn a ticket into requirements, a plan, then reviewed code, with a clean handoff at every step. |
| `/pr-review-assistants` | PR reviews (orange) | Both sides of the review | Triage the feedback your PR gets, review someone else's code, and decide whether it merges. |
| `/fresh-eyes-review` | Fresh eyes review (pink) | Let a sub-agent review the code | A sub-agent with a clean context sees your changes but not the reasoning behind them, so it catches what the session that wrote them misses. |
| `/context-hygiene` | Context & memory (blue) | Keep the context lean | Give your project a lean agent setup, see what auto-loads before you even type, and trim it. |
| `/skills-docs-authoring` | Skill & doc authoring (purple) | Teach your agent | Write skills and docs agents actually follow, and turn every correction into a lasting lesson. |
| `/talking-to-humans` | Talking to humans (blue) | Texts that sound like you, explanations you understand | Texts that sound like you typed them, and explanations people understand on the first read, even in a second language. |

Under the grid (muted): Looking for one skill by name? [Every skill and rule →](`/skills/`)

The card count is derived from the page's `skills` and `rules` arrays in `src/data/groups.ts` as "N skills + M rules" (singular for one, the rules part only when the page has rules).

## 2c. How they fit together (purple)

- Kicker: How they fit together
- Heading: One routine, from ticket to pull request
- Muted intro: Follow them in this order, and skip the steps a small task doesn't need.
- Chips are mono, in the group hue ("Execute the plan" in the text colour), joined by muted →
  arrows; each is a same-tab link to its block, `/<slug>/#<name>` ("Execute the plan" to
  `/task-workflow/#act`). Rows:
  - A task, start to finish: `/fetch-ticket` → `/refine-ticket` → `/create-implementation-plan` →
    Execute the plan → `/self-review` → `/handover`
  - Optional check: `/harden-artifact`
  - Task by task: `/split-plan-tasks` → `/execute-plan-tasks`
  - Before you pick the ticket up: `/review-ticket` → `/verify-understanding`, then muted, unlinked
    "then `/refine-ticket`"
  - When the review comes back: `/fetch-pr-review` → `/refine-pr-review`, then muted, unlinked
    "then apply the changes, or plan them first with `/create-implementation-plan`"
- Mono link, new tab: See how the skills connect, on GitHub →
  (`https://github.com/eai-org/agent-toolkit/tree/main#artifact-relationships`)

## 3. Principles (green)

- Kicker: Principles
- Heading: Core ideas behind every skill
- Six panes, 2-col grid, bold lead + small muted detail; inline links are mono blue,
  `target="_blank"`:
  1. **Keep the context window sharp** Atomic skills: one job each, nothing else loaded.
     [why →](https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-context-window-sharp-7255d83a8949)
  2. **Offload to files, pick up fresh** Every phase ends in a doc a new session can pick up,
     and a fresh session can check it.
     [how →](https://medium.com/engineering-in-the-age-of-ai/the-refine-plan-act-pattern-for-agentic-ai-coding-59ee013e4427)
  3. **Human in the loop** The agent recommends, you decide, and it explains things so you
     get them on the first read. Nothing runs behind your back.
  4. **Never guess** It reads the existing code first and asks you when in doubt.
  5. **Learn from mistakes** Every correction, and every review finding you accept,
     becomes a durable lesson.
     [more →](https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd)
  6. **Versatile by design** Any project, any stack, team or solo.
- No footer link (no /core-concepts page; the Medium links cover further reading).

## 4. Philosophy (green)

- Kicker: Philosophy
- Heading: A toolkit, not a framework
- Intro (muted): Great frameworks exist that auto-activate around everything you do. This one
  deliberately takes the other road:
- Two comparison panels (stack on mobile):
  - `auto-activating frameworks` (muted title): a whole methodology / the agent drives / fuller
    context, less to remember
  - `agent-toolkit` (green title): use only the parts you need / you drive, the agent assists /
    lean context, predictable behavior
- No trade-off quote.

## 5. Task workflow (green)

- Heading: Refine, Plan, Act, Consolidate
- Intro (muted, two paragraphs, bold as marked; "RPAC pattern" is an inline link):
  1. The **Task workflow** skills are a set of utilities that support any developer through a
     standard development task, from fetching the ticket to handing the finished code over to
     review.
  2. They are based on the [RPAC pattern](https://medium.com/engineering-in-the-age-of-ai/the-refine-plan-act-pattern-for-agentic-ai-coding-59ee013e4427):
     Refine, Plan, Act, Consolidate. Misunderstandings surface in a reviewable document before
     any code is written, and a failed attempt costs a retry from the last file, not the whole
     task.
- Flow: five equal-size stage boxes (stretch grid, arrows between), same-page links to the first
  block of their phase (Ticket to fetch-ticket, Refine to refine-ticket, Plan to
  create-implementation-plan, Act to Execute the plan, Consolidate to the Consolidate
  cross-link). Bold marks: WHAT, HOW, file names and commands (file names and commands also mono).
  - **Ticket** (muted border): download **TICKET.md** from your tracking board or create it
    manually
  - **Refine** (green): defines the **WHAT** and outputs **REQUIREMENTS.md**
  - **Plan** (blue): defines the **HOW** and outputs **PLAN.md**. Optional: **/harden-artifact** checks it with fresh eyes
  - **Act** (orange): executes the plan, writing code and running checks. Or task by task:
    **/split-plan-tasks**, then **/execute-plan-tasks**
  - **Consolidate** (purple): stabilizes the work: review it with fresh eyes using
    **/self-review**, then hand over the knowledge in **HANDOVER.md**
- Demo scripts live with their block copy in §14.
- Page `/task-workflow` — title `Task workflow · agent-toolkit`; meta description `Refine, plan,
  act, consolidate: turn a ticket into requirements, a plan, then reviewed code, with a clean
  handoff at every step.`;
  footer link (`target="_blank"`): [Read more about the task workflow →](https://medium.com/engineering-in-the-age-of-ai/how-i-use-ai-agents-to-solve-programming-tasks-daily-2a68a5828b8e)

## 6. Review assistants (orange)

Rewritten 2026-08-06 from the PR-review article, linked in the footer since it went live
2026-08-07.

- Heading: Help on both sides of the code review
- Intro (muted, two paragraphs, bold as marked): (1) Now that AI helps developers push code
  faster, there is more to review than ever: code review is the new bottleneck. (2) These
  skills assist in both directions: when **others leave feedback on your PRs**, and when **you
  review someone else's code**. Unlike fully automated review bots, they work with you,
  locally: the agent suggests, you decide, and nothing reaches your teammates without passing
  through your hands.
- **fetch-pr-review** (no demo): Give it a PR link and it downloads all the feedback your PR
  received into a self-contained **PR-REVIEW.md**. Works with GitHub, Azure DevOps or whatever
  platform your agent can access (private repos need the right access tokens or MCP server
  configured). Fetching is all it does: the thinking happens in a fresh session.
- **refine-pr-review**: Goes through that file with you, comment by comment. For each one the
  agent reads the code the comment is about, then says what it would do: address it, address
  part of it, or push back, with its reasoning and a reply you can post. The debatable ones come
  one at a time, the obvious ones in a single batch, so you spend your time where it matters.
  You end up with two files: an **ANSWERS.md** with a reply per comment, to paste once your
  fixes are in, and a **REQUIREMENTS.md** with the changes you accepted, ready to apply right
  away when the fixes are small, or to hand to **/create-implementation-plan** when they need a
  plan (named as plain mono text, not linked: the sibling-links test limits internal links to
  the Keep-going siblings). Comments that point at a habit, not a one off slip, end up as
  lessons at the bottom of **ANSWERS.md**, ready for **/self-improve** (mono, not linked) so
  your agent doesn't repeat them on the next task. Your PR is never touched. Demo (two steps
  with /clear between, extended 2026-08-06 to the output files and the hand-off line, and
  2026-10-09 to the quoted comment, a muted reasoning line, partial recommended and the batch
  confirmation):

```
> /fetch-pr-review https://github.com/project/repo/pull/1234
✻ Fetching threads, verdicts and bot comments…
⏺ Saved 1234-users.PR-REVIEW.md: 12 comments, bots kept separate
> /clear
> /refine-pr-review 1234-users.PR-REVIEW.md
✻ Reading the code behind each comment…
⏺ The comment "serializeUsers should live in the service layer":
⏺ (muted) Moving it is right, but the CSV export reuses it, so keep a thin
  wrapper
    1. address
  ❯ 2. partial (recommended)
    3. push back
> 2
⏺ 8 more look straightforward to address: confirm them all?
> y
✻ Working through the remaining comments…
⏺ Saved 1234-users.PR-REVIEW.ANSWERS.md: a drafted reply per comment
⏺ Saved 1234-users.PR-REVIEW.REQUIREMENTS.md: the accepted changes
⏺ (muted) Next: /clear, then /create-implementation-plan
  1234-users.PR-REVIEW.REQUIREMENTS.md
```

- **review-code-assistant**: A quick pass that prepares a review with you, locally in your
  terminal, and posts nothing. Point it at a PR link or a branch: it reads the same diff the
  platform shows, the PR
  intent and the project's convention docs, then suggests candidate comments in a human voice,
  ordered exactly like the diff so you can scroll the PR and the terminal side by side. A
  comment may only exist when it points to concrete evidence: an actual failure, a cited
  convention, a provable simplification. Zero comments is a valid outcome. **You** decide what
  to post. Demo (added 2026-08-06; heading line, expected-vs-actual explanation and the
  suggested comment as three outputs since 2026-10-09; the suggested comment renders green, the
  human-voice color):

```
> /review-code-assistant https://github.com/project/repo/pull/5678
✻ Diffing 5678-orders against main, reading the PR intent…
✻ Running the project conventions against every changed file…
⏺ Adds the pending_review status to the order list. 1 comment:
⏺ 1 · src/orders/order-list.component.ts:87
⏺ The list keeps only orders with status === 'pending', but this PR
  adds 'pending_review': orders under review drop out of the list, with
  no error.
⏺ (green) Suggested comment: "should this also match 'pending_review'?
  otherwise orders under review won't show up in the list"
```

- **maintainer-review** (added 2026-10-09), two paragraphs: (1) For when the merge is your
  call. Give it a link to someone else's PR and it reads everything first: the description,
  every linked issue and PR, and every comment, bot comments included. For each comment it
  checks two things: was it answered, and does it still apply to the latest code. A claim like
  "fixed in the latest push" is something to verify, never a fact, whoever wrote it. (2) Then
  it reviews the diff the same way **/review-code-assistant** does, and lets a sub-agent with
  fresh eyes double check its own findings before you see them. You get one verdict: does
  anything block the merge? Nothing gets posted, approved or pushed until you say so, and you
  see the wording first. If you ask, it can push a fix to the contributor's branch, without
  ever rewriting their history. Demo:

```
> /maintainer-review https://github.com/project/repo/pull/912
✻ Fetching the PR, 2 linked issues and 14 comments…
✻ Checking every comment against the latest push…
✻ Reviewing the diff, then double checking with fresh eyes…
⏺ Verdict: blocks the merge until 1 is fixed
⏺ 1 · src/billing/invoice.ts:212 the discount is applied after
  rounding, so totals can be off by a cent (blocking)
⏺ @dana, 3 Oct: "fixed in the latest push" answered, but still applies
⏺ (muted) Next: draft a comment on 1 for the author. Nothing gets posted until
  you say so.
```

- Page `/pr-review-assistants` — title `PR review assistants · agent-toolkit`; meta description
  `Code review is the new bottleneck. These skills assist both sides of it: triage the feedback
  your PR gets, and prepare your review of someone else's code. The agent suggests, you
  decide.`;
  footer link (`target="_blank"`): [Read more about the PR review skills →](https://medium.com/engineering-in-the-age-of-ai/let-ai-speed-up-both-sides-of-your-code-reviews-while-you-stay-in-full-control-3b059506ef39)

## 7. Fresh eyes review (pink)

Revamped 2026-08-14 alongside the "More powerful AI reviews with fresh eyes" article; the page
copy stays plain and newcomer-friendly, it does not quote the article.

- Heading: Let a sub-agent review the code
The two contexts are named "authoring session" and "reviewing session" (per user, 2026-08-14),
never "the session that did the work" or "the reviewer"; the user's own rewording (2026-08-15)
also uses "your main session" / "the main authoring session" for the authoring side, so those
casual variants are fine.

The whole page copy below is the user's own rewording (2026-08-15), applied with grammar fixes
only; do not reword it without asking.

- Intro (muted, two paragraphs): Ask an AI agent to review the code it just wrote, and it will
  not find much. Show the same changes to a fresh session, and it will return with many more
  findings. Some valid, some minor, others just noise. Even the best models behave like this:
  the authoring session is biased by its own reasoning. / After all, people are no different:
  finding mistakes in your own text is hard, while a colleague often spots them more easily.
  This skill gives your agent that colleague: a sub-agent that starts with a clean context.
- Flow diagram closing the intro (round trip per the user's sketch, 2026-08-15): one tall
  Authoring session box on the left, a smaller Reviewing session box on the right, two
  diagonal arrows out of the tall box's upper edge and back into its lower edge, a label along
  each. On mobile the loop unrolls into three stacked boxes (the judging text becomes its own
  Authoring session box) with `↓ label` lines between them.
  - Authoring session (orange, tall): top text: The session that did the work (or has the
    reference: the TICKET, REQUIREMENTS, PLAN, etc.) and knows the goal. This is where you
    launch `/fresh-eyes-review` (mono).; bottom text: Receives the findings from the reviewing
    session and judges them, recommending which ones to address. (both texts per user,
    2026-08-15, uppercase doc names included; gap between them roughly 3-4 line breaks)
  - Arrow out, down right, label `the changes and their goal`
  - Reviewing session (pink, middle right): A clean context: it sees the changes, has full
    access to the codebase, and gets a summary of the goal (or the TICKET). It never sees the
    authoring session's reasoning: no PLAN or similar docs. (user's draft, 2026-08-15,
    grammar smoothed)
  - Arrow back, down left, label `the findings`
- **fresh-eyes-review** (three paragraphs; leads with how to invoke it, per user 2026-08-15:
  the copy must say you can name what to review in the command and that inferring is the
  no-input fallback): Run it from your main session and tell it what to review: it can be a
  branch, a commit, a git diff, a couple of files, even a document (for example a PLAN.md).
  Or just invoke it without arguments and it will figure out what to review on its own and
  ask you to confirm the prompt for the reviewing session. Approve it, or tweak it first, and
  the review will start in a clean context. / The reviewing session sees the changes and
  their goal, and is free to check the whole codebase. It also looks for what the change
  forgot: when a file format, a payload or a config changes, it checks the samples, fixtures
  and docs that should have changed with it. What it never sees is the **reasoning** (bold on
  page) of the authoring session (no plan, notes, chat history, etc.). This part matters: hand
  it the reasoning that produced a bug, and chances are that it will overlook the bug for the
  same reason the authoring session did. It doesn't leave anything behind in your project: the
  tests it runs keep their reports out of it, and if it still creates a file, that file is
  removed before the findings come back (any file it changed is pointed out to you). /
  Findings come back to the
  main session: each one points at a file and describes how it actually breaks. No minor
  style nitpicks, no vague concerns, and "nothing found" is a valid answer by design. The
  reviewing session can't always distinguish a bug from an intentional choice, so the
  judgment is left to the main authoring session, which knows more about the task and will
  help you judge each finding. Then you decide what needs to be addressed.
- **self-review** (new copy added 2026-10-10, not part of the user's 2026-08-15 wording above; pink
  title, default GitHub link, no article link), three paragraphs: Run **/self-review** (mono) on
  your branch before you ask anyone to review it. A sub-agent with a clean context checks the
  changes the way a maintainer would: would anything here block the merge? It also checks them
  against your project's own docs (contributing guide, code style) and looks for leftovers like
  debug prints and stray TODOs. It gets the branch and a short summary of the goal, not the plan
  or notes behind it. / Then you go through the findings one at a time, each with a recommended
  answer: fix it, dismiss it with a reason a maintainer can follow, defer it to a follow-up, or
  just discuss it. A fix gets a new round that checks the fix and what it touches, not the whole
  branch again. / It all ends up in a short **SELF-REVIEW.md** (mono) you paste into the PR, so
  whoever reviews your PR sees at a glance that the work was checked. Nothing is committed or
  pushed for you, and the PR description itself is a job for
  [/handover](/task-workflow/#handover) (same tab). Someone else's PR? That is what
  [/maintainer-review](/pr-review-assistants/#maintainer-review) (same tab) is for.
- Demo:

```
> /self-review
⏺ (muted) Goal: export users as CSV, without deleted users
✻ Reviewing 1234-users against main in a clean context…
⏺ 2 findings. One at a time:
⏺ 1 · src/users/exporter.ts:44 a leftover console.log dumps every row
  ❯ 1. Fix it (recommended)
    2. Dismiss
    3. Defer
    4. Discuss
> 1
⏺ 2 · src/users/exporter.ts:12 the empty-list guard repeats the
  controller's check at export.controller.ts:30
  ❯ 1. Dismiss: the nightly job calls it too, unguarded (recommended)
    2. Fix it
    3. Defer
    4. Discuss
> 1
✻ Round 2, checking the fix and what it touches…
⏺ Round 2 clean. Saved 1234-users.SELF-REVIEW.md: 1 fixed, 1 dismissed
⏺ (muted) Commit the fix, then run /self-review again to stamp the report
⏺ (muted) Run your checks, then paste the report into the PR. Never commit it.
```

- Closing subsection "More than a code reviewer" (sans-serif h2, muted, two paragraphs):
  Reviewing code is the classic case, but not the only one! You can easily point
  it at a document: type `/fresh-eyes-review the PLAN.md against the REQUIREMENTS.md` (mono,
  the whole typed command) even before any code is written. The same works for a requirements
  doc against its original ticket, and so on. / Other skills use `/fresh-eyes-review` (mono)
  as a building block. /self-review runs it on your branch before you open a PR,
  /harden-artifact runs it on a REQUIREMENTS.md or PLAN.md against its ticket, and
  /maintainer-review uses it to double check its own findings on someone else's PR, even when
  it found nothing. They pass in the changes, the goal and the review instructions themselves,
  so the review starts without asking you to confirm the prompt. Works with any agent that can
  spawn sub-agents. If yours can't, the review runs in the same session and the result is
  flagged as weaker. (/self-review links the self-review block on this page, `#self-review`;
  /maintainer-review links its block on /pr-review-assistants,
  `/pr-review-assistants/#maintainer-review`; /harden-artifact links its block on /task-workflow,
  `/task-workflow/#harden-artifact`; all same tab.)
- Demo:

```
> /fresh-eyes-review the 4521-archive branch
✻ Collecting the diff on 4521-archive…
⏺ The reviewing session will get: the diff on 4521-archive (6 files),
  the goal ("orders can be archived from the list") and the review
  rules. Not the plan, not this session's notes.
  ❯ 1. Spawn the reviewing session (recommended)
    2. Change the prompt
> 1
✻ Reviewing with fresh eyes in a clean context…
⏺ The reviewing session found 3 issues. Judged against the task:
⏺ 1 · src/orders/archive.service.ts:58 archived orders still count
  toward the open-orders badge
⏺ 2 · db/seed/orders.sql has no archived_at values, so the seeded list
  never shows an archived order and the archive filter can't be tried
  locally
⏺ (muted) 3 · "archiving has no undo": intentional, undo is out of scope for
  this ticket
  ❯ 1. Fix 1 and 2, dismiss 3 (recommended)
    2. Fix all three
    3. Chat about the findings
```

- Page `/fresh-eyes-review` — title `Fresh eyes review · agent-toolkit`; meta description
  `An AI agent reviewing its own code will tell you everything looks fine, while a fresh
  session finds the real problems. One command spawns a reviewing session with a clean
  context: it sees the changes but never the author's reasoning, and catches what the author
  can't.`;
  footer link (`target="_blank"`): [Read more about reviewing with fresh eyes →](https://medium.com/engineering-in-the-age-of-ai/more-powerful-ai-reviews-with-fresh-eyes-bfad221748c0)

## 8. Context & memory hygiene (blue)

- Heading: Your context is often cluttered before you even type
- **context-checkup**: Audits everything that auto-loads at startup: the governing-doc chain,
  skill descriptions, MCP servers, memory. It measures each source instead of guessing, ranks
  the trims by payoff and keeps every change reversible. Nothing is touched without your
  approval.
- **memory-doctor**: Auto-memory is a hidden side-channel into every session's context: facts
  pile up there that you never review. This skill drains it block by block, relocating each
  entry to a home you control (a doc, a skill, a rule) or archiving it. You confirm every
  action. Memory works best as an inbox, not a filing cabinet: entries land, get reviewed and
  move on.
- Demo:

```
> /context-checkup
✻ Measuring what auto-loads…
⏺ Tool search is off, so MCP schemas load eagerly. Top cost: the
  unused "jira" MCP server (6.2k of 18.4k)
  ❯ 1. Disable it in this project (recommended)
    2. Keep it
    3. Show the full report
> 1
⏺ Done. Next startup: 12.2k tokens. Reversible in
  .claude/settings.json
```

- Memory-doctor demo:

```
> /memory-doctor
✻ Scanning the project memory…
⏺ 7 blocks found. Block 1: "always mock the clock in unit tests"
  belongs in docs/unit-testing-guidelines.md
  ❯ 1. Move it there (recommended)
    2. Archive it
    3. Keep it
    4. Something else
```

- **agentify-project** (added 2026-10-09, last block, no article link): Gets a project ready
  for a team where everyone may use a different agent. It audits the current setup, then moves
  it step by step to one shared, lean structure: a short AGENTS.md linking to detail docs that
  load only when needed, a CLAUDE.md that points to it, skills every agent can find, and the
  right gitignore entries. Run **/agentify-project audit** (mono) any time to see what drifted.
  Each step waits for your approval, and it never commits. Demo (runs the full mode; the real
  menu is multi-select, rendered single-select with All):

```
> /agentify-project
✻ Auditing the agent setup…
⏺ CLAUDE.md is 180 lines and there is no AGENTS.md. What should I fix?
  ❯ 1. All (recommended)
    2. Entry files: AGENTS.md plus a CLAUDE.md pointer
    3. Slim AGENTS.md into linked docs
    4. Gitignore hygiene
> 1
⏺ Step 1: rename CLAUDE.md to AGENTS.md and turn CLAUDE.md into a
  pointer to it. Apply?
> y
⏺ Step 2: move 4 sections into docs/, linked from AGENTS.md. Apply?
> y
⏺ Step 3: add the agent entries to .gitignore. Apply?
> y
⏺ Done. All steps applied, every reference checked.
⏺ (muted) Next: /memory-doctor, then /context-checkup
```

- Page `/context-hygiene` — title `Context hygiene · agent-toolkit`; meta description `Give your
  project a lean agent setup, see what auto-loads before you even type, and trim it.`; no
  footer link.

## 9. Skill & doc authoring (purple)

- Heading: Create and continuously improve the skills and docs your agents rely on
- Intro (muted): Every skill and doc you add is reloaded into the agent's context over and over,
  and verbose ones get skimmed or ignored. These three skills keep your skills and docs compact
  and effective, and turn every correction into a lasting lesson.
- Intro link, its own line under the intro (`target="_blank"`; same article as the
  Learn-from-mistakes pane in Principles, accepted overlap): [Read more about this approach →](https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd)
- **compact-docs-writer** rewrites a doc, or drafts a new one, to carry every rule and intent in
  the least text possible. You get a measured word delta proving nothing was lost, and the diff
  is applied only after your approval.
- **compact-skill-creator** creates or edits skills on top of compact-docs-writer, adding the
  skill-specific craft: a sharp description (the most expensive text, loaded in every session),
  the right trigger type, and progressive disclosure. Before showing you the draft it checks
  the skill against itself, and every edit to an existing skill comes with a version bump, so
  you never have to remember it.
- **self-improve** when the agent makes a mistake or doesn't behave the way you want, this skill
  captures the lesson as a diff to the skill or doc that should have prevented it. You approve
  where it lands, and the mistake doesn't repeat. Other skills feed it too: memory-doctor moves
  stray memories into the right doc through it, and refine-pr-review, self-review and
  harden-artifact hand it the lessons from a review.
- compact-docs-writer demo (the rewrite renders as git diff lines: pink `-` on faint red
  background, green `+` on faint green):

```
> /compact-docs-writer docs/onboarding.md
✻ Compacting the doc…
⏺ Suggested rewrite for docs/onboarding.md (excerpt):
- In order to run the tests, first install all of the dependencies.
+ Install the dependencies before running the tests.
⏺ Nothing lost: 128 words down to 74, measured with wc -w. Apply?
```

- compact-skill-creator demo:

```
> /compact-skill-creator create a skill that writes release notes from the merged PRs
⏺ How should this skill be triggered?
  ❯ 1. Manual: you invoke it yourself (recommended)
    2. Mandatory: auto-loads for release-notes work
✻ Drafting via compact-docs-writer…
⏺ Draft ready: skills/release-notes/SKILL.md, 84 words. Apply?
```

- self-improve demo (correction → lesson; the addition renders as a git diff line, green `+` on
  faint green background; since 2026-10-09 it ends on the word delta, no options menu):

```
> Some of the methods you generated are not called outside the service, change them to private
⏺ Done, buildHeader() and formatRow() are now private
> /self-improve
✻ Drafting via compact-docs-writer…
⏺ Suggested addition to docs/coding-standards.md:
+ Keep helper methods private unless they are used outside the class.
⏺ Not applied yet: +11 words, measured with wc -w. Apply?
```

- Rules subsection, hairline-separated before the Keep-going footer — sans-serif h2
  `Opinionated rules that support this approach`; intro (muted): Optional and not installed by
  default: four rules that support this authoring approach. Bullets, each closing with a mono
  [Read the rule →] link to its file under `rules/` on GitHub:
  - **compact-governing-docs** every edit to a skill or governing doc goes through the
    compaction skills first.
  - **read-other-repos-governing-docs** governing docs load on their own only in the project
    you're working in, so before the agent edits another repo, like the one your skills live in,
    it reads and follows that repo's **AGENTS.md** (mono) or **CLAUDE.md** (mono).
  - **self-contained-docs** planning docs, and prompts that hand work to a fresh session, carry
    everything that session needs and nothing more. Prompts are written with
    **/prepare-prompt** (mono, not linked).
  - **self-improve-on-correction** when you correct the agent on something a doc governs, it
    offers to capture the lesson with /self-improve.
- Page `/skills-docs-authoring` — title `Skills & docs authoring · agent-toolkit`; meta
  description `Write skills and docs your agents actually follow, and turn every correction into
  a lasting lesson.`; no footer link (the article link moved into the intro).

## 10. Talking to humans (blue)

- Heading: Texts that sound like you, explanations you understand
- Intro (muted, two paragraphs, reframed 2026-10-09): (1) The agent writes two kinds of text for
  people. Some go out under your name, like a PR comment or a commit message, so they should
  sound like you. The rest is the agent explaining things: to you in the session, or to a
  teammate who reads its ticket review or test steps. Those should be clear on the first read,
  even for someone who reads English as a second language. (2) One skill for each, and opt-in
  rules that apply them without being asked.
- Subsection `Texts that go out under your name` (sans-serif h2, hairline above), intro (muted):
  We often ask AI to help draft texts that other people will read: chat replies, PR comments,
  commit messages. The agent is great at drafting them quickly, but not at matching the tone to
  the context: a chat reply doesn't want the polish of a README, yet everything comes out in the
  same overly formal, fancy prose that readers recognize as AI at a glance.
- **use-conversational-language** tells the agent to write in simple, human language instead of
  sophisticated AI prose full of — em dashes — and fancy terms. It adapts the voice to the kind
  of text (a PR comment, a chat reply, a commit message, a code comment) and changes the wording
  only, never the content. Second paragraph, before the demo (names plain, no links): Other
  skills use it too: /handover writes your PR description with it, and review skills like
  /review-code-assistant and /refine-pr-review word the comments and replies they draft for you
  with it. The block carries a second link after `Read the SKILL.md →` (`target="_blank"`):
  [Read more about the conversational voice →](https://medium.com/engineering-in-the-age-of-ai/how-to-use-ai-to-generate-texts-that-sound-like-a-human-would-actually-write-them-c7eef78e0b42)
- **write-realistic-texts** opt-in rule that applies the skill automatically whenever the agent
  writes something other people will read as if you wrote it, like a commit message, a PR
  comment or a chat message, even when writing wasn't the task you gave it. Before it posts a
  comment, a PR description or a chat message for you, it shows you the exact wording and waits
  for your go-ahead. Asking it to approve a PR or close a ticket doesn't approve the comment
  that goes with it.
- **no-nonsense-comments** (rule, added 2026-10-09, no demo) opt-in rule for code comments: the
  agent writes one only when a future reader with no idea of your session still needs it, like
  a non-obvious why or an easily missed edge case. No notes about the session ("as discussed",
  "now also handles X") and no lines that restate the code. The comments it keeps go through
  the skill above, so they read like a colleague jotted them down.
- Demo (two exchanges, pink/green ⏺ like the hero):

```
> Write a message to my colleagues on why we needed this refactor
⏺ (pink) "As part of this refactoring initiative, we have extracted the serializeUsers() method
  into a dedicated shared service — a strategic change that enhances reusability and paves the
  way for JIRA-1234, where the newly extracted method will be leveraged."
> /use-conversational-language Write a message to my colleagues on why we needed this refactor
✻ Drafting in a human voice…
⏺ (green) "extracted serializeUsers() to a shared service so we can reuse it in JIRA-1234"
```

- Subsection `Explanations written to be understood` (sans-serif h2, hairline above), intro
  (muted, two paragraphs): (1) The agent explains things to someone who did not see the files
  and tool output it just read. It tends to write in its own shorthand, so an answer can be
  correct and still hard to follow. (2) Not a native English speaker? One more rule makes your
  agent talk to you in your own language, while everything it writes into the project stays in
  English. Inline link (`target="_blank"`): [Get the use-my-mothertongue rule →](https://github.com/eai-org/agent-toolkit/blob/main/docs/use-my-mothertongue-rule.md)
- **explain-in-simple-language** (added 2026-10-10) Rewords answers, recaps and questions to you, and
  documents a teammate reads, like a **TICKET-REVIEW.md** (mono) or test steps, so they are
  understood on the first read. Ask with **/explain-in-simple-language** (mono), or let the agent
  use it on its own. It changes the wording only, never the content, without dumbing it down or
  hiding that an agent wrote it. Second paragraph, before the demo (names plain, no links): Most
  skills in the toolkit use it when it's installed, from the questions /refine-ticket and
  /create-implementation-plan ask you to the TICKET-REVIEW.md that /review-ticket writes.
- Demo (before/after, pink/green ⏺ like the hero):

```
> Why do we pass the index here?
⏺ (pink) The class serves both directions, and the index only matters in one
  of them.
> /explain-in-simple-language Why do we pass the index here?
✻ Rewording for the first read…
⏺ (green) The class does two jobs: reading the file the user uploads and
  writing the one they download. The index only matters for the reading
  job.
```

- **write-simple-explanations** (rule, added 2026-10-10, no demo) Opt-in rule that applies the skill
  every time the agent asks you something, explains a decision, how something works or why
  something failed, gives you a recap, or writes a document a person reads, like a ticket review
  or test steps. It also kicks in when you ask for an explanation or say you didn't get it. Short
  status lines ("done, tests pass") and documents written for other agents, like plans, stay as
  they are, except the questions in them meant for you. Questions and messages to you need no
  go-ahead.
- Page `/talking-to-humans` — title `Talking to humans · agent-toolkit`; meta description
  `Texts that sound like you typed them, and explanations people understand on the first read,
  even in a second language.`; `/conversational-language` redirects here (Astro redirect stub);
  no page-level footer link (the voice article is a block link on use-conversational-language).

## 11. Opinionated rules (pink)

- Kicker: Opinionated rules
- No heading, no demo (deliberately short).
- Intro (muted): Optional and not installed by default: get them all with
  `./install-opinionated-rules.sh` or pick only the ones you want. Examples:
- **git-read-only-by-default** no commits, pushes or resets unless you asked for them
- **no-ai-attribution** your work stays yours: no AI co-author, no "generated with" footer
- **no-nonsense-comments** only comments a future reader with zero context still needs
- After the bullets (muted, added 2026-10-09): Not a native English speaker? One more rule makes
  your agent talk to you in your own language, while everything it writes into the project
  stays in English. Link (`target="_blank"`): [Get the use-my-mothertongue rule →](https://github.com/eai-org/agent-toolkit/blob/main/docs/use-my-mothertongue-rule.md)
- Footer link (same tab): [Check the full list of available rules →](`/skills/#rules`)
- Second footer link, on its own line (`target="_blank"`, added 2026-10-10): [Install skills and rules together with agentwheel →](https://github.com/eai-org/agent-toolkit/blob/main/docs/install-with-agentwheel.md)

## 12. Share your feedback (green, centered)

- Kicker: Share your feedback
- No heading.
- Line (muted): Got an issue or an idea? Please report it on GitHub.
- Link (mono blue, to the repo's GitHub issues): Open an issue →

## 13. Footer

No credits section. The page ends with the feedback block, then the mono footer:
`agent-toolkit · MIT`.

## 14. Group page blocks (shipped 2026-08-02)

Each group page opens with a big centered mono h1 title (titles below; no kicker), then the
§5-§10 block heading demoted to h2 with its intro (/task-workflow keeps the flow strip, whose boxes link to their phase), then
one hairline-separated block per skill — mono skill name as h2 in the group hue,
muted text, the demo inside the block of the skill it shows, mono link
`Read the SKILL.md →` to the skill on GitHub (rules: `Read the rule →`) — then the approved
page-level article link where §5-§10 defines one, then the closing "Keep going" footer: two §2b
cards in compact form, plus an `All groups →` link and an `Every skill and rule →` link. Block copy (file names mono, bold as
marked):

- Page titles (2026-08-01, "Task workflow skills" is Francesco's wording, the rest drafted):
  Task workflow skills · PR review assistants · Fresh eyes review · Context hygiene skills ·
  Skills & docs authoring · Talking to humans.
- /task-workflow, under the flow strip: Each phase runs in a fresh session and hands over a file,
  not chat history, so the context stays sharp.

The /task-workflow entries below are the 2026-08-02 RPAC revamp. The closing `Next:` line of a
demo renders muted.

- fetch-ticket: Every task starts with a ticket. This skill downloads it from Jira, GitHub, Azure
  DevOps or similar into a self-contained **TICKET.md**, attachments and linked tickets included.
  No tracker? Write the file by hand and the workflow stays the same. An attachment it can't
  download gets flagged, so you can add it with **/attach-to-ticket** (mono). Demo:

```
> /fetch-ticket https://yourproject.atlassian.net/browse/XX-1234
✻ Downloading the ticket and its attachments…
⏺ Saved to 1234-users.TICKET.md, attachments and linked tickets included
⏺ Next: /clear, then /refine-ticket 1234-users.TICKET.md
```

- attach-to-ticket (added 2026-10-09, no demo): Some attachments never make it through the
  fetch: a screenshot from a chat, a file behind a login. Paste it, or give its path or link,
  and the agent saves it next to **TICKET.md** and adds it to the ticket file with a short
  caption, so the next session sees it too. It asks before filling a missing attachment or
  writing a caption. It only touches your local files: your tracker stays untouched.
- refine-ticket: Defines the **WHAT**. The agent checks the ticket against the actual codebase
  and interviews you, one question at a time, each with a recommended answer. No silent
  assumptions: you decide. The result is a validated **REQUIREMENTS.md**. No ticket yet? Give
  it a raw idea and it grills you on the goal and the scope first. Demo:

```
> /refine-ticket 1234-users.TICKET.md
✻ Reading the ticket and the code…
⏺ Should deleted users stay in the export?
  ❯ 1. exclude them (recommended)
    2. include, flagged
✻ Working through the remaining questions…
⏺ Saved 1234-users.REQUIREMENTS.md
⏺ Next: /clear, then /create-implementation-plan 1234-users.REQUIREMENTS.md
```

- create-implementation-plan: Defines the **HOW**. The agent studies the code, settles the
  technical decisions with you and writes a self-contained **PLAN.md** that a fresh session can
  execute step by step. Demo:

```
> /create-implementation-plan 1234-users.REQUIREMENTS.md
✻ Studying the requirements and the code…
⏺ The export needs a serializer. Where should it live?
  ❯ 1. extend the existing UsersService (recommended)
    2. create a new UserExportService
✻ Settling the remaining decisions…
⏺ Saved 1234-users.PLAN.md
⏺ Next: /clear, then "Execute the plan 1234-users.PLAN.md"
```

- harden-artifact (added 2026-10-10; links: the default Read the SKILL.md → to GitHub, plus How the fresh
  eyes review works → to /fresh-eyes-review/, same tab; anchor #harden-artifact): An optional
  check between a document and the phase that builds on it. Run it on a **REQUIREMENTS.md** or a
  **PLAN.md** in a fresh session, not the one that wrote it: a sub-agent with a clean context
  checks it against the ticket, the code and the related tickets, and your session tries to
  disprove each finding. You decide the ones that survive, one at a time, each with a
  recommendation: fix, dismiss or defer. When the document is ready, you get the commands that
  start the next phase. **/refine-ticket** (mono) and **/create-implementation-plan** (mono) both
  offer it when they finish. Demo:

```
> /harden-artifact 1234-users.PLAN.md
✻ Reviewing the plan in a clean context against ticket and code…
⏺ 2 findings. Challenged them: 1 disproved, 1 proven.
⏺ No step excludes deleted users, which the requirements demand
  (1234-users.REQUIREMENTS.md:41 "deleted users are excluded")
  ❯ 1. Fix it in the plan (recommended)
    2. Dismiss
    3. Defer
> 1
✻ Round 2: a new reviewer on the fixed plan…
⏺ No new findings. Ready for the next phase, in a fresh session:
⏺ (muted) claude --name execute-plan-1234-users "Execute the plan
  1234-users.PLAN.md"
⏺ (muted) claude --name split-plan-tasks-1234-users "/split-plan-tasks
  1234-users.PLAN.md"
```

- Execute the plan (non-skill block: neutral-foreground mono title, no GitHub link): two
  paragraphs: (1) You can run the **Act** phase without a skill. Open a fresh session and ask the
  agent to execute the plan: everything it needs is in **PLAN.md**. Ask it to run your project's
  checks too, so it verifies its own work. (2) Prefer to review the work in small steps instead
  of all at once? **/split-plan-tasks** (mono) and **/execute-plan-tasks** (mono) below split the
  plan into tasks and run them one at a time. Demo:

```
> Execute the plan 1234-users.PLAN.md and run all the checks
✻ Executing step 4/6: wire the export button…
⏺ All 6 steps done. Lint, tests and build passing.
```

- split-plan-tasks (added 2026-10-10): Breaks the plan into small tasks you can review and commit
  on their own, each one leaving the project building and its tests passing. Tasks are grouped so
  that each group makes one PR, and they're ordered so you get something to click or run as early
  as the plan allows. You approve the breakdown, then it's added to the end of **PLAN.md** as a
  checklist. Nothing else in the plan changes. Demo:

```
> /split-plan-tasks 1234-users.PLAN.md
✻ Reading the plan and working out the split…
⏺ 5 tasks in 2 groups, each group one PR. Group 1 ships the CSV export
  end to end, so you can try it right away.
⏺ One boundary to settle: where does the audit log entry go?
  ❯ 1. In the second PR, keeps the first one small (recommended)
    2. With the export, in the first PR
> 1
⏺ Append this breakdown to 1234-users.PLAN.md?
> y
⏺ Task list added at the end of 1234-users.PLAN.md, the rest untouched
⏺ (muted) Next: /clear, then /execute-plan-tasks 1234-users.PLAN.md
```

- execute-plan-tasks (added 2026-10-10): Runs one task of that checklist, then stops: it
  implements the task, runs your project's checks and ticks it off in **PLAN.md**, so you review
  every task before the next one starts. You get a commit subject and the command for the next
  task; it never commits for you. It also tells you when a group is ready to become a PR. Demo:

```
> /execute-plan-tasks 1234-users.PLAN.md
⏺ Task 1.3: wire the export button. 1.1 and 1.2 are ticked.
✻ Implementing task 1.3, then running the checks…
⏺ Done: 3 files changed, lint, tests and build passing. Ticked 1.3 in
  1234-users.PLAN.md
⏺ (green) Commit once reviewed: feat(users): wire the export button
⏺ Group 1 is complete: ready for a PR
⏺ (muted) Next: /clear, then /execute-plan-tasks 1234-users.PLAN.md 2.1
```

- self-review cross-link on /task-workflow (pink title, no GitHub link, no demo; `id="consolidate"`;
  internal link `See self-review on the fresh eyes page →` to `/fresh-eyes-review/#self-review`,
  same tab): First step of **Consolidate**: before handing over, run **/self-review** (mono) on
  your branch. A sub-agent with a clean context checks your changes as a maintainer would, you
  settle each finding, and a short report goes into the PR.
- handover: Closes the task. Give it a ticket id, or nothing at all, and it finds the task's
  planning files, gathers the decisions made along the way, from the ticket to the session
  itself, matches the plan against the actual diff and writes a **HANDOVER.md**: a paste-ready
  PR description with the decisions worth knowing, where to look and what's still open, so
  reviewers never reconstruct intent from the diff. Your repo has a PR template? It fills that
  in instead, ticking only the boxes it can back up. Block link (`target="_blank"`):
  [Read more about handover →](https://medium.com/engineering-in-the-age-of-ai/the-missing-step-in-agentic-coding-the-handover-d1963c3d2c1d).
  Demo:

```
> /handover 1234
✻ Reading the task artifacts, the related ticket and the diff…
⏺ Found the ticket, requirements and plan for 1234-users
⏺ One thing the plan doesn't cover: the retry in exporter.ts:88
  ❯ 1. Ask me why it's there (recommended)
    2. Ship it flagged as unexplained
> 2
⏺ Saved 1234-users.HANDOVER.md, paste-ready as your PR description
```

- Before you pick the ticket up, a plain section after handover (sans-serif h2 like the page intro
  heading, muted intro, added 2026-10-10): Two checks before you start: is the ticket ready, and do you
  understand it well enough to build it.
- review-ticket (under Before you pick the ticket up): A triage glance before anyone picks a ticket up:
  compares it against the codebase and reports whether it's ready, plus the questions worth
  asking whoever owns the requirements. Each question survived an adversarial hunt for its answer
  across code, tracker, designs and docs, so you're never asked what the sources could have
  answered. A gap that is another team's or another repo's to fix comes back as a handoff, with
  a message ready to send to its owner. Verdict and briefing land in a **TICKET-REVIEW.md** next
  to the ticket, and /refine-ticket (plain) picks it up later, starting from whether those
  questions got an answer. Demo:

```
> /review-ticket 1234-users.TICKET.md
✻ Comparing the ticket against the codebase…
✻ Challenging 3 candidate questions…
⏺ 1 answered by the backend repo, 2 to raise
⏺ 2 questions to resolve before starting
⏺ Saved 1234-users.TICKET-REVIEW.md with briefing and questions
⏺ (muted) Next: /verify-understanding 1234-users.TICKET-REVIEW.md
```

- verify-understanding (under Before you pick the ticket up, added 2026-10-09): The other skills write
  files for the next agent session. This one is for you. Run it on the **TICKET-REVIEW.md**,
  right after the review or days later just before you start coding. It asks you to explain the
  feature in your own words: who uses it, what they see and do, why it exists, and what each
  ticket adds. Then it digs into one weak spot at a time and corrects you using only the review
  and the tickets, saying so when they don't settle something instead of making up an answer.
  It plays the part of that last chat with your product owner before development starts. It
  writes no files: the conversation is the point. Demo:

```
> /verify-understanding 1234-users.TICKET-REVIEW.md
⏺ Tell me about this feature in your own words: who uses it, what they
  do with it, and why it exists.
> Admins export the user list so support can find inactive accounts
⏺ Almost. The review says finance uses the export for license billing,
  not support. So who needs it to be right every month?
> Finance, so deleted users must not show up in it
⏺ Right, that's the whole journey. Still open: the review doesn't say
  whether users deleted mid-month count for that month's bill, ask your
  PO before you start.
⏺ (muted) Next: /refine-ticket 1234-users.TICKET.md
```

- Along the way, a plain section after verify-understanding (same shape, added 2026-10-10): For when
  the task calls for them: test steps for QA once the requirements are set, a check of how much
  is already built, a grilling for a shaky plan, a prompt that hands the work to a fresh session.
- create-manual-test-instructions (under Along the way, "Optional last step:" prefix
  dropped): Turns a ticket or its requirements into a concise **MANUAL-TEST.md** a non-author
  can follow: what changed, how to get there, before vs after, and what to verify. Demo:

```
> /create-manual-test-instructions 1234-users.REQUIREMENTS.md
✻ Reading the requirements and the code they cite…
⏺ Saved 1234-users.MANUAL-TEST.md, followable by someone unfamiliar
  with the ticket
```

- check-ticket-implementation (under Along the way, added 2026-08-07), two paragraphs:
  (1) Answers one question: how much of this ticket is already built? It splits the ticket into
  individual requirements and judges each one against the code, so the verdict lands per
  requirement instead of on the ticket as a whole: done, partially done, not done, or not
  verifiable from the code, each with a short note and the **file:line** where it was checked.
  (2) The report goes into a **TICKET-STATUS.md**, headed by the tally and the requirements that
  need attention. Useful when you pick up a branch someone else started, or before you call a
  ticket finished. Give it a ticket link and it fetches the ticket first. Apart from that, the
  report is the only file it writes: your code and the ticket stay untouched. Demo:

```
> /check-ticket-implementation 1234-users.TICKET.md
✻ Splitting the ticket into requirement blocks…
✻ Judging 8 blocks against the working tree…
⏺ 5 ✅ done · 2 🟡 partial · 1 🟥 not done
⏺ Needs attention: CSV export, audit log entry
⏺ 🟡 CSV export: the endpoint ignores the format param, so it always
  returns JSON (src/users/export.controller.ts:41)
⏺ Saved 1234-users.TICKET-STATUS.md
```

- grill-me (under Along the way, added 2026-10-09, no demo; block link
  `target="_blank"`: [See the original by Matt Pocock →](https://github.com/mattpocock/skills)):
  The interview that refine-ticket and create-implementation-plan run, on its own. Bring any
  plan, design or idea and say **grill me** (mono): the agent asks one question at a time, each
  with its recommended answer, until every branch is settled. What the code can answer, it looks
  up instead of asking you. Want a REQUIREMENTS.md at the end? Use refine-ticket instead.
  Second paragraph (credit, both links `target="_blank"`): This skill was originally created by
  [Matt Pocock](https://github.com/mattpocock). We made it available in this toolkit with one
  small edit: it words its questions with
  [/explain-in-simple-language](https://github.com/eai-org/agent-toolkit/blob/main/skills/explain-in-simple-language/SKILL.md),
  so they are easy to follow.
- prepare-prompt (under Along the way, added 2026-10-09, no demo): Every phase above
  ends with a ready command for the next session. For anything else there's this skill: when a
  fresh session should continue the work, check it, or pick up what was left open, it writes
  the prompt to paste there. It keeps only what the next session can't find on its own, points
  at files instead of pasting them, and checks every path and command it prints. Asking a new
  session to check the work? It leaves out its own conclusions, so they can't steer the check.
- **plans-directory** (rule, added 2026-10-10, no demo), the last block on the page, after
  prepare-prompt and before the page-level article link: Opt-in rule for where planning
  documents go: one folder per task in the project's planning directory, with file names that
  say what each file is. The default is **.agents/plans/** (mono), so every planning file the
  demos on this page save, like **1234-users.TICKET.md** (mono) or **1234-users.HANDOVER.md**
  (mono), lands in **.agents/plans/1234-users/** (mono). Most skills on this page already save
  their files this way, and with the rule installed, **/fetch-ticket** (mono) no longer has to
  ask you where your plans live. The agent also follows it for any other planning document it
  writes, like a design note or an investigation. If your project already has a planning
  directory of its own, that one wins. `./install-opinionated-rules.sh` installs it along with
  all the other rules, or you can pick only the ones you want.
- /fresh-eyes-review: full copy and demo script in §7.
- /context-hygiene intro, two paragraphs: (1) AI agents work at their best when the context
  window is lean. Reasoning is sharpest in the first part of the window and degrades well
  before the hard limit, so every token you load has to earn its place. The smaller the
  context, the sharper the agent. (2) Much of that context is spent before you even type:
  governing docs, skills, MCP servers and auto-memory all load at startup. Run these three
  skills from time to time to keep it in check: one measures what loads and trims it, one
  clears out what your agent saved on its own, and one gives your project a lean setup to start
  from.
- agentify-project is the last block on /context-hygiene: copy and demo script in §8.
- context-checkup block link (`target="_blank"`): [Read more about the context window →](https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-context-window-sharp-7255d83a8949)
- memory-doctor: full description and second demo script in §8 (shipped 2026-08-02), demo label
  `memory-doctor relocating a block`. Block link
  (`target="_blank"`): [Read more about memory-doctor →](https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-memory-clean-and-organized-with-memory-doctor-a79f7174f257)
- /skills-docs-authoring (reworked 2026-08-02): full copy in the rewritten §9. Layout
  deviations: the page-level article link sits in the intro as a more-link line, not a closing
  block, and a compact rules subsection (h2, muted intro, four rule bullets with per-rule
  GitHub links) sits before the Keep-going footer.

## 15. About page (added 2026-08-03)

- Page `/about` — title `About us · agent-toolkit`; meta description `agent-toolkit is made by
  Engineering in the Age of AI: every skill and rule is used, tested and refined in real-world
  projects, and released as free software under the MIT license.` Reached only via the nav (§0).
- h1 `About us`, h2 `Engineering in the Age of AI`; intro (muted): Engineering in the Age of AI
  explores the craft of software engineering in the era of the biggest technology shift since
  the internet. agent-toolkit is the part we practice daily: every skill and rule is used,
  tested and refined in real-world projects.
- Three channel cards (§2b card look, external links, `target="_blank"`, 3-col on desktop);
  the action is the card's mono blue bottom line:

| kicker (hue) | title | line | action → href |
|---|---|---|---|
| Medium (green) | Read the articles | The ideas behind the toolkit, in depth: context hygiene, agentic skills, real-world AI workflows. | Read on Medium → https://medium.com/engineering-in-the-age-of-ai |
| Discord (purple) | Join the community | Questions, feedback and shop talk with people using AI agents in real projects. | Join the server → https://discord.com/invite/QaMTM8Cqy5 |
| LinkedIn (blue) | Follow the updates | New articles and toolkit news, where your feed already is. | Follow us → https://www.linkedin.com/company/engineering-in-the-age-of-ai/ |

- Closing block, kicker `Free software` (orange): We love open-sourcing what we build.
  agent-toolkit is completely free software, released under the MIT license. Link (mono blue,
  to the repo): Browse the source on GitHub →
- No demos, no Keep-going footer.

## 16. Skills and rules catalogue (2026-10-10)

- Page `/skills/`, title `Skills and rules · agent-toolkit`; meta description `Every skill and rule in agent-toolkit on one page, grouped the way the site groups them, each linking to its source on GitHub.`
- h1 `Skills and rules`, h2 `Every skill and rule, on one page`; intro (muted): Looking for one by name? This is everything the toolkit ships, grouped the way the pages group them. Pick a name to jump to its page, or open its file on GitHub. The list is rebuilt from the toolkit repo every night.
- One section per group: hue kicker, h2 linking the group page, rows, `Open /<slug> →`.
- "Also in the toolkit" (only when non-empty), intro: The SKILL.md says what each one does.
- Rules section (`#rules`), pink kicker `Opinionated rules`, no h2; intro: Opt-in and installed separately: get them all with `./install-opinionated-rules.sh` (code chip) or pick only the ones you want. The use-my-mothertongue snippet row comes last.
- Rows: name link, muted line, `Read the SKILL.md →` / `Read the rule →` only for names placed on a group page. Lines are in `src/data/catalogue.ts`; a name with none shows its frontmatter description, sanitized (run-nx-checks has a chip and an inline-code command, see its row below).

Skill lines:

| skill | line |
|---|---|
| agentify-project | gives a project a lean, agent-neutral setup: a short AGENTS.md index, shared skills and gitignore hygiene, re-runnable as an audit |
| attach-to-ticket | saves a screenshot or file you paste, or one you give by path or link, next to the ticket file and references it there, like an attachment the fetch could not download |
| check-ticket-implementation | checks how much of a ticket is already built, marking each requirement done, partial, not done or not verifiable in a TICKET-STATUS.md |
| compact-docs-writer | writes or rewrites a doc to carry every rule and intent in the least text possible |
| compact-skill-creator | creates or edits skills, keeping them lean and effective |
| context-checkup | audits what auto-loads into a session before you type and suggests what to trim |
| create-implementation-plan | defines the HOW: settles the technical decisions with you and writes a PLAN.md a fresh session can execute |
| create-manual-test-instructions | turns a ticket or its requirements into a MANUAL-TEST.md a non-author can follow |
| execute-plan-tasks | runs one task of the PLAN.md checklist, then stops: it implements the task, runs your project's checks and ticks it off, so you review every task before the next one starts |
| explain-in-simple-language | rewords answers, recaps and questions to you, and documents a teammate reads, so they are understood on the first read |
| fetch-pr-review | collects the comments reviewers left on your PR into a PR-REVIEW.md, ready to address or push back on |
| fetch-ticket | downloads a ticket from Jira, GitHub, Azure DevOps or similar into a self-contained TICKET.md, with its attachments and a list of the tickets it links |
| fresh-eyes-review | a sub-agent with a clean context reviews a changeset and reports back what the session that wrote it misses |
| grill-me | interviews you about any plan, design or idea, one question at a time, each with a recommended answer, until every branch is settled |
| handover | packages a finished change as a paste-ready PR description: what it does and why, the decisions worth knowing, where to look |
| harden-artifact | checks a REQUIREMENTS.md or PLAN.md against the ticket, the code and the related tickets in a fresh session, and you decide each finding that survives |
| maintainer-review | reviews someone else's PR as the maintainer deciding whether it merges: every comment walked, every claim verified, nothing posted without your go-ahead |
| memory-doctor | cleans up the memory your agent keeps accumulating on its own, moving what matters to the right place |
| prepare-prompt | writes the prompt that hands this session's work to a fresh session, as short as the next session allows |
| refine-pr-review | goes through a fetched review with you, comment by comment, drafting the replies and turning the accepted changes into a REQUIREMENTS.md |
| refine-ticket | defines the WHAT: checks the ticket, or a raw idea, against the codebase, settles the open decisions with you and saves a REQUIREMENTS.md |
| review-code-assistant | prepares your review of a PR or branch: concise comments with file and line, nothing posted |
| review-ticket | triages a ticket before anyone picks it up: a verdict, a feature walkthrough and the questions worth raising, saved in a TICKET-REVIEW.md |
| run-nx-checks | formats, lints, tests and builds the projects your change affects, fixes what needs no judgment call and reports the rest. Not on Nx? Leave it out with `./install.sh --exclude run-nx-checks` (chip: Nx workspaces only) |
| self-improve | captures a lesson into the skill, doc or check that should have prevented the mistake, so it doesn't repeat |
| self-review | checks your branch before you ask anyone to review it: a sub-agent with a clean context reviews it the way a maintainer would, you go through each finding, and a short SELF-REVIEW.md goes into the PR |
| split-plan-tasks | breaks the plan into small tasks you can review and commit on their own, in groups that each make one PR, added to the end of PLAN.md as a checklist once you approve |
| use-conversational-language | the voice for texts that should read as if a person typed them: PR comments, replies, commit messages, code comments |
| verify-understanding | a teach-back chat over a TICKET-REVIEW.md: you explain the feature in your own words, the agent probes and corrects |

Rule lines:

| rule | line |
|---|---|
| compact-governing-docs | every edit to a skill or governing doc goes through the compaction skills first |
| git-read-only-by-default | no commits, pushes or resets unless you asked for them |
| no-ai-attribution | your work stays yours: no AI co-author, no "generated with" footer |
| no-nonsense-comments | only comments a future reader with zero context still needs |
| plans-directory | where planning documents go: one folder per task in the project's planning directory, .agents/plans/ by default |
| read-other-repos-governing-docs | before the agent edits another repo, it reads and follows that repo's AGENTS.md or CLAUDE.md, since those load on their own only in the project you're working in |
| self-contained-docs | planning docs, and prompts that hand work to a fresh session, carry everything that session needs and nothing more |
| self-improve-on-correction | when you correct the agent on something a doc governs, it offers to capture the lesson with /self-improve |
| write-realistic-texts | texts other people read get the conversational voice, and you see the wording before anything is posted |
| write-simple-explanations | applies explain-in-simple-language whenever the agent asks you something, explains, recaps or writes a document a person reads |
| use-my-mothertongue | a copy-paste snippet, not a file: your agent talks to you in your own language, while everything it writes into the project stays in English |
