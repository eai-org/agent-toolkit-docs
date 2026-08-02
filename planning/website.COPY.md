# COPY: agent-toolkit website

This file mirrors the shipped user-visible copy: the source code is the truth and every copy
change syncs here (see AGENTS.md; process changed 2026-08-02, no approval gate since). Earlier
approval history: 2026-07-27 copy session including block order; §5-§10 page metadata
2026-07-31; §5-§8 page URLs and titles 2026-08-01; group cards (§2b), slimmed homepage and the
four reworked meta descriptions 2026-08-02. `website.DESIGN.md` holds layout/visuals,
`website.DECISIONS.md` the tech and scope. The site is a homepage overview plus one page per skill group (§5-§10, no `/rules` page
yet). Homepage block order: §1 hero, §2 problem, §2b card grid, §3 principles, §4 philosophy,
§11 rules, §12 feedback. The §5-§10 blocks and their demos live only on their group pages,
structured per §14. Bullet items render as the deck pattern:
**bold lead** followed by a muted detail span (no literal dash between them). Skill names in
bullets are mono. Demo lines: `>` input box, `✻` muted spinner, `⏺` agent output; numbered
options with `❯` on the highlighted one and `(recommended)` in green. In voice demos the `⏺` is
pink for the stiff AI reply and green for the human one.

## 0. Nav (every page)

- Wordmark (mono green, links home): agent-toolkit — prefixed with a ← arrow on group pages
- Theme toggle (icon-only: dark/light/system)
- GitHub, with the star count appended (`★ 1,284`), to the repo
- Install button, to the hero install terminal
- No page links.

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
- Below it, mono blue link: `Other ways to install →` — to the README install section on GitHub.
  (The sticky nav's install button anchors here from every page; the standalone "Get it" section
  was dropped.)
- Star line (below the install link, orange ★): This toolkit is entirely open source and free to
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
  long for one line gets a compact stand-in — `/conversational-language`: "Texts that sound like
  real humans". Card copy:

| page | kicker (hue) | title | line | count |
|---|---|---|---|---|
| `/task-workflow` | Task workflow (green) | Refine, plan, act, consolidate | Turn a ticket into requirements, a plan, then code, with a clean handoff at every step. | 6 skills |
| `/pr-review-assistants` | PR reviews (orange) | Both sides of the review | Triage the feedback your PR gets and review someone else's code. | 3 skills |
| `/fresh-eyes-review` | Fresh eyes review (pink) | Let a sub-agent review the code | A sub-agent with a clean context, seeing only the changeset, catches what the session that wrote the code misses. | 1 skill |
| `/context-hygiene` | Context & memory (blue) | Keep the context lean | See what auto-loads before you even type, and trim it without breaking anything. | 2 skills |
| `/skills-docs-authoring` | Skill & doc authoring (purple) | Teach your agent | Write skills and docs agents actually follow, and turn every correction into a lasting lesson. | 3 skills |
| `/conversational-language` | Conversational voice (blue) | Texts that sound like a real human typed them | No em dashes, no "this valuable feedback". Just what you would have written yourself, faster. | 1 skill + 1 rule |

## 3. Principles (green)

- Kicker: Principles
- Heading: Core ideas behind every skill
- Six panes, 2-col grid, bold lead + small muted detail; inline links are mono blue,
  `target="_blank"`:
  1. **Keep the context window sharp** Atomic skills: one job each, nothing else loaded.
     [why →](https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-context-window-sharp-7255d83a8949)
  2. **Offload to files, pick up fresh** Every phase ends in a doc a new session can pick up.
     [how →](https://medium.com/@borzifrancesco/the-rpa-pattern-for-agentic-ai-coding-59ee013e4427)
  3. **Human in the loop** The agent recommends, you decide. Nothing runs behind your back.
  4. **Never guess** It reads the existing code first and asks you when in doubt.
  5. **Learn from mistakes** Every correction becomes a durable lesson.
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
  2. They are based on the [RPAC pattern](https://medium.com/@borzifrancesco/the-rpa-pattern-for-agentic-ai-coding-59ee013e4427):
     Refine, Plan, Act, Consolidate. Misunderstandings surface in a reviewable document before
     any code is written, and a failed attempt costs a retry from the last file, not the whole
     task.
- Flow: five equal-size stage boxes (stretch grid, arrows between). Bold marks: WHAT, HOW and
  file names (file names also mono).
  - **Ticket** (muted border): download **TICKET.md** from your tracking board or create it
    manually
  - **Refine** (green): defines the **WHAT** and outputs **REQUIREMENTS.md**
  - **Plan** (blue): defines the **HOW** and outputs **PLAN.md** with the implementation steps
  - **Act** (orange): executes the plan, writing code and running checks
  - **Consolidate** (purple): stabilizes the work: review with fresh eyes, then hand over the
    knowledge in **HANDOVER.md**
- Demo scripts live with their block copy in §14.
- Page `/task-workflow` — title `Task workflow · agent-toolkit`; meta description `Refine, plan,
  act, consolidate: turn a ticket into requirements, a plan, then reviewed code, with a clean
  handoff at every step.`;
  footer link (`target="_blank"`): [Read more about the task workflow →](https://medium.com/engineering-in-the-age-of-ai/how-i-use-ai-agents-to-solve-programming-tasks-daily-2a68a5828b8e)

## 6. Review assistants (orange)

- Heading: Help on both sides of the code review
- Intro (muted): Code review is still a key part of most teams' workflow. These skills assist in
  both directions: when **others leave feedback on your PRs**, and when **you review someone
  else's code**. (bold as marked)
- **fetch-pr-review** downloads all the comments your PR received into a self-contained document
  that refine-pr-review can consume
- **refine-pr-review** assists you in triaging the feedback, comment by comment: address,
  partial or push back
- **review-code-assistant** reviews someone else's PR locally (works for self-review too),
  suggesting human-voiced comments and explanations. **You** decide what to post
- Demo (two steps with /clear between):

```
> /fetch-pr-review https://github.com/project/repo/pull/1234
✻ Fetching comments…
⏺ Saved to 1234-users.PR-REVIEW.md
> /clear
> /refine-pr-review 1234-users.PR-REVIEW.md
✻ Reading 12 comments…
⏺ Comment 3/12: "serializeUsers should live in the service layer"
  ❯ 1. address (recommended)
    2. address partially
    3. push back
```

- Page `/pr-review-assistants` — title `PR review assistants · agent-toolkit`; meta description
  `Code review is still a key part of most teams' workflow. These skills assist in both
  directions: when others leave feedback on your PRs, and when you review someone else's code.`;
  no footer link.

## 7. Fresh eyes review (orange)

- Heading: Let a sub-agent review the code
- Intro (muted): A fresh perspective works for AI just like it does for humans: a sub-agent with
  a clean context, seeing only the changeset and a minimal description, catches surprisingly
  more regressions and issues than the session that wrote the code.
- No bullet list.
- Demo:

```
> /fresh-eyes-review
✻ Spawning one subagent to review the changes with a clean context…
⏺ The subagent returned with 3 new findings: 1 major and 2 minor
  ❯ 1. Address all of them (recommended)
    2. Address only the major issue
    3. Chat about this
```

- Page `/fresh-eyes-review` — title `Fresh eyes review · agent-toolkit`; meta description
  `A fresh perspective works for AI just like it does for humans: a sub-agent with a clean
  context, seeing only the changeset and a minimal description, catches surprisingly more
  regressions and issues than the session that wrote the code.`; no footer link.

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
⏺ 18.4k tokens at startup. Top cost: the unused "jira" MCP server (6.2k)
  ❯ 1. Disable it in this project (recommended)
    2. Keep it
    3. Show the full report
> 1
⏺ Done. Next startup: 12.2k tokens. Reversible in .claude/settings.json
```

- Memory-doctor demo:

```
> /memory-doctor
✻ Scanning the project memory…
⏺ 7 blocks found. Block 1: "always mock the clock in unit tests" belongs in docs/unit-testing-guidelines.md
  ❯ 1. Move it there (recommended)
    2. Archive it
    3. Keep it
```

- Page `/context-hygiene` — title `Context hygiene · agent-toolkit`; meta description `See what
  auto-loads into your agent before you even type, and trim it without breaking anything.`; no
  footer link.

## 9. Skill & doc authoring (purple)

- Heading: Create and continuously improve the skills and docs your agents rely on
- **compact-docs-writer** writes docs with maximum token economy
- **compact-skill-creator** creates or edits skills, combining compact-docs-writer with a set of
  best practices for effective skills
- **self-improve** when the agent makes a mistake or doesn't behave the way you want, this skill
  captures the lesson so it won't repeat the same mistake again
- Demo (correction → lesson; the addition renders as a git diff line, green `+` on faint green
  background):

```
> Some of the methods you generated are not called outside the service, change them to private
⏺ Done, buildHeader() and formatRow() are now private
> /self-improve
✻ Capturing the lesson…
⏺ Suggested addition to docs/coding-standards.md:
+ Keep helper methods private unless they are used outside the class.
  ❯ 1. Apply the diff (recommended)
    2. Edit it first
    3. Choose another location
    4. Chat about this
```

- Page `/skills-docs-authoring` — title `Skills & docs authoring · agent-toolkit`; meta
  description `Write skills and docs your agents actually follow, and turn every correction into
  a lasting lesson.`; footer link (`target="_blank"`, same article as the Learn-from-mistakes
  pane in Principles, accepted overlap): [Read more about the authoring skills →](https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd)

## 10. Conversational voice (blue)

- Heading: Texts that sound like a real human typed them
- Intro (muted): We often ask AI to help draft texts that other people will read:
- **use-conversational-language** tells the agent to write in simple, human language instead of
  sophisticated AI prose full of — em dashes — and fancy terms
- **write-realistic-texts** opt-in rule that applies the human voice automatically whenever a
  text is meant for other humans (code comments, PR replies, chat messages…)
- Demo (two exchanges, pink/green ⏺ like the hero):

```
> Help me explain to my colleagues why we needed this refactor
⏺ (pink) "As part of this refactoring initiative, we have extracted the serializeUsers() method
  into a dedicated shared service — a strategic change that enhances reusability and paves the
  way for JIRA-1234, where the newly extracted method will be leveraged."
> /use-conversational-language Help me explain to my colleagues why we needed this refactor
✻ Drafting in a human voice…
⏺ (green) "extracted serializeUsers() to a shared service so we can reuse it in JIRA-1234"
```

- Page `/conversational-language` — title `Conversational language · agent-toolkit`; meta
  description `Texts that sound like a real human typed them, not sophisticated AI prose.`; no
  footer link.

## 11. Opinionated rules (pink)

- Kicker: Opinionated rules
- No heading, no demo (deliberately short).
- Intro (muted): Optional and not installed by default: get them all with
  `./install-opinionated-rules.sh` or pick only the ones you want. Examples:
- **git-read-only-by-default** no commits, pushes or resets unless you asked for them
- **no-ai-attribution** your work stays yours: no AI co-author, no "generated with" footer
- **no-nonsense-comments** only comments a future reader with zero context still needs
- Footer link (`target="_blank"`, no /rules page): [Check the full list of available rules →](https://github.com/eai-org/agent-toolkit/tree/main#rules)

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
§5-§10 block heading demoted to h2 with its intro (/task-workflow keeps the flow strip), then
one hairline-separated block per skill — mono skill name as h2 in the group hue,
muted text, the demo inside the block of the skill it shows, mono link
`Read the SKILL.md →` to the skill on GitHub (rules: `Read the rule →`) — then the approved
page-level article link where §5-§10 defines one, then the closing "Keep going" footer: two §2b
cards in compact form, plus an `All six groups →` link. Block copy (file names mono, bold as
marked):

- Page titles (2026-08-01, "Task workflow skills" is Francesco's wording, the rest drafted):
  Task workflow skills · PR review assistants · Fresh eyes review · Context hygiene skills ·
  Skills & docs authoring · Conversational language.
- /task-workflow, under the flow strip: Each phase runs in a fresh session and hands over a file,
  not chat history, so the context stays sharp.

The /task-workflow entries below are the 2026-08-02 RPAC revamp. The closing `Next:` line of a
demo renders muted.

- fetch-ticket: Every task starts with a ticket. This skill downloads it from Jira, GitHub, Azure
  DevOps or similar into a self-contained **TICKET.md**, attachments and linked tickets included.
  No tracker? Write the file by hand and the workflow stays the same. Demo:

```
> /fetch-ticket https://yourproject.atlassian.net/browse/XX-1234
✻ Downloading the ticket and its attachments…
⏺ Saved to 1234-users.TICKET.md, attachments and linked tickets included
⏺ Next: /clear, then /refine-ticket 1234-users.TICKET.md
```

- refine-ticket: Defines the **WHAT**. The agent checks the ticket against the actual codebase
  and interviews you, one question at a time, each with a recommended answer. No silent
  assumptions: you decide. The result is a validated **REQUIREMENTS.md**. Demo:

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
⏺ Next: /clear, then "Execute 1234-users.PLAN.md"
```

- Execute the plan (non-skill block: neutral-foreground mono title, no GitHub link): The **Act**
  phase needs no skill at all. Open a fresh session and ask the agent to execute the plan:
  everything it needs is in **PLAN.md**. Ask it to run your project's checks too, so it verifies
  its own work. Demo:

```
> Execute 1234-users.PLAN.md, then make sure all checks pass
✻ Executing step 4/6: wire the export button…
⏺ All 6 steps done. Lint, tests and build passing.
```

- fresh-eyes-review cross-link on /task-workflow (pink title, no GitHub link, no demo; internal
  link `See the fresh eyes review →` to `/fresh-eyes-review/`, same tab): First step of
  **Consolidate**: before handing over, let a sub-agent with a clean context review the
  changeset. It catches what the session that wrote the code misses.
- handover: Closes the task. The agent gathers the decisions made along the way, from the ticket
  to the session itself, matches the plan against the actual diff and writes a **HANDOVER.md**:
  a paste-ready PR description with real test evidence and known gaps, so reviewers never
  reconstruct intent from the diff. Demo:

```
> /handover
✻ Reading the diff, the plan and the decisions…
⏺ Saved 1234-users.HANDOVER.md, paste-ready as your PR description
```

- Extra workflow skills, a plain section after handover (sans-serif h2 like the page intro
  heading, muted intro): Not part of the main flow, but handy when the task calls for them.
- create-manual-test-instructions (under Extra workflow skills, "Optional last step:" prefix
  dropped): Turns the requirements into a concise **MANUAL-TEST.md** a non-author can follow:
  what changed, how to get there, before vs after, and what to verify. Demo:

```
> /create-manual-test-instructions 1234-users.REQUIREMENTS.md
✻ Reading the requirements and the code they cite…
⏺ Saved 1234-users.MANUAL-TEST.md, followable by someone unfamiliar
  with the ticket
```

- review-ticket (under Extra workflow skills): A triage glance before anyone picks a ticket up:
  compares it against the codebase and reports whether it's ready, plus the questions worth
  asking whoever owns the requirements. Verdict and briefing land in a **TICKET-REVIEW.md**
  next to the ticket. Demo:

```
> /review-ticket 1234-users.TICKET.md
✻ Comparing the ticket against the codebase…
⏺ 2 questions to resolve before starting
⏺ Saved 1234-users.TICKET-REVIEW.md with briefing and questions
```
- refine-pr-review, second sentence added to the §6 bullet: It drafts each reply and collects the
  accepted changes into requirements you can feed back into the task workflow.
- fresh-eyes-review: One command: the sub-agent reviews the changeset and comes back with its
  findings, sorted by severity. You choose which ones to address.
- /context-hygiene intro, two paragraphs: (1) AI agents work at their best when the context
  window is lean. Reasoning is sharpest in the first part of the window and degrades well
  before the hard limit, so every token you load has to earn its place. The smaller the
  context, the sharper the agent. (2) Much of that context is spent before you even type:
  governing docs, skills, MCP servers and auto-memory all load at startup. These two skills
  tackle the two places where clutter builds up: your setup and your agent's memory.
- context-checkup block link (`target="_blank"`): [Read more about the context window →](https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-context-window-sharp-7255d83a8949)
- memory-doctor: full description and second demo script in §8 (shipped 2026-08-02), demo label
  `memory-doctor relocating a block`. Block link
  (`target="_blank"`): [Read more about memory-doctor →](https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-memory-clean-and-organized-with-memory-doctor-a79f7174f257)
- /skills-docs-authoring intro: Skills, rules and governing docs are what your agents run on.
  These three keep them compact, effective and improving with every mistake.
- compact-docs-writer, sentence added to the §9 bullet: Agents reread these files over and over,
  so every token counts.
