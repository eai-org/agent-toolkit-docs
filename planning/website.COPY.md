# COPY: agent-toolkit website — homepage (approved)

Homepage copy approved by Francesco in the copy session of 2026-07-27, including the block order.
This is the authoritative text for the build; `website.DESIGN.md` holds layout/visuals,
`website.DECISIONS.md` the tech and scope. **v1 is a one-page site**: the homepage is the whole
site, group pages may come later. Bullet items render as the deck pattern: **bold lead** followed
by a muted detail span (no literal dash between them). Skill names in bullets are mono. Demo
lines: `>` input box, `✻` muted spinner, `⏺` agent output; numbered options with `❯` on the
highlighted one and `(recommended)` in green. In voice demos the `⏺` is pink for the stiff AI
reply and green for the human one.

Sections 6, 7, 8 and 10 have no footer link for now; their "Read more …" links return if group
pages are added later.

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
  (The sticky nav's install button anchors here; the standalone "Get it" section was dropped.)
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

## 3. Principles (green)

- Kicker: Principles
- Heading: Core ideas behind every skill
- Six panes, 2×3 grid; inline links are mono blue, Medium ones `target="_blank"`:
  1. **Keep the context window sharp** Atomic skills: do one thing, do it well, load nothing
     else. [Why this matters →](https://medium.com/engineering-in-the-age-of-ai/keep-your-ai-agents-context-window-sharp-7255d83a8949)
  2. **Offload to files, pick up fresh** Each phase ends in a self-contained doc a fresh session
     can pick up. Clean handoffs, easy parallelism. [The RPA workflow →](https://medium.com/@borzifrancesco/the-rpa-pattern-for-agentic-ai-coding-59ee013e4427)
  3. **Human in the loop** You keep full control: nothing runs behind your back. The agent
     recommends, you decide.
  4. **Never guess** The agent checks the existing code first and asks you when in doubt.
  5. **Learn from mistakes** Every correction you make becomes a durable lesson, so your agents
     get smarter every day. [Learn more →](https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd)
  6. **Versatile by design** Skills that work in any project and tech stack, in any type of team
     or solo.
- No footer link (no /core-concepts page; the Medium links cover further reading).

## 4. Philosophy (green)

- Kicker: Philosophy
- Heading: A minimalistic toolkit, not a framework
- Intro (muted): There are great skill frameworks out there that auto-activate around everything
  you do. The **agent-toolkit** deliberately takes the other road:
- Two comparison panels (stack on mobile):
  - `auto-activating frameworks` (muted title): a whole methodology / skills activate before any
    task / the agent drives / pulls you in at its checkpoints / fuller context, less to remember
  - `agent-toolkit` (green title): modular, use only the parts you need / primarily user
    invoked / you drive, the agent assists / human in the loop by design / lean context,
    predictable behavior
- No trade-off quote.

## 5. Task workflow (green)

- Kicker: Task workflow
- Heading: Refine, Plan, Act
- Intro (muted): A development workflow suitable for any kind of project
- Flow: four equal-size stage boxes (stretch grid, arrows between). Bold marks: WHAT, HOW and
  file names (file names also mono).
  - **Ticket** (muted border): download **TICKET.md** from your tracking board or create it
    manually
  - **Refine** (green): defines the **WHAT** and outputs **REQUIREMENTS.md**
  - **Plan** (blue): defines the **HOW** and outputs **PLAN.md** with the implementation steps
  - **Act** (orange): executes the plan, writing code and running checks
- Demo:

```
> /refine-ticket 1234-users.TICKET.md
✻ Reading the ticket and the code…
⏺ Should deleted users stay in the export?
  ❯ 1. exclude them (recommended)
    2. include, flagged
```

- Footer link (`target="_blank"`): [Read more about the task workflow →](https://medium.com/engineering-in-the-age-of-ai/how-i-use-ai-agents-to-solve-programming-tasks-daily-2a68a5828b8e)

## 6. Review assistants (orange)

- Kicker: Review assistants
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

- No footer link for now.

## 7. Fresh eyes review (orange)

- Kicker: Fresh eyes review
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

- No footer link for now.

## 8. Context & memory hygiene (blue)

- Kicker: Context & memory hygiene
- Heading: Your context is often cluttered before you even type
- **context-checkup** audits everything that auto-loads at startup (governing docs, skills, MCP
  servers), measures the token cost and proposes lean, reversible trims
- **memory-doctor** drains the agent's auto-memory block by block, relocating each entry to a
  home you control or archiving it. You confirm every action
- Demo:

```
> /context-checkup
✻ Measuring what auto-loads…
⏺ 18.4k tokens at startup. Top cost: the unused "jira" MCP server (6.2k)
  ❯ 1. Disable it in this project (recommended)
    2. Keep it
    3. Show the full report
```

- No footer link for now.

## 9. Skill & doc authoring (purple)

- Kicker: Skill & doc authoring
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

- Footer link (`target="_blank"`, same article as the Learn-from-mistakes pane in Principles,
  accepted overlap): [Read more about the authoring skills →](https://medium.com/engineering-in-the-age-of-ai/my-approach-to-agentic-skills-e08dc6c0d1cd)

## 10. Conversational voice (blue)

- Kicker: Conversational voice
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

- No footer link for now.

## 11. Opinionated rules (pink)

- Kicker: Opinionated rules
- No heading, no demo (deliberately short).
- Intro (muted): Optional and not installed by default: get them all with
  `./install-opinionated-rules.sh` or pick only the ones you want. Examples:
- **git-read-only-by-default** prevents the agent from performing git write operations such as
  commit, push, reset, etc. unless explicitly instructed
- **no-ai-attribution** no AI co-author additions on commits and no "Generated with" footers on
  PRs
- **no-nonsense-comments** write only code comments that still make sense to a future reader
  with zero context, prefer no comment over a low-value one, and voice them via
  use-conversational-language
- and more… (muted last bullet)
- Footer link (`target="_blank"`, no /rules page): [Check the full list of available rules →](https://github.com/eai-org/agent-toolkit/tree/main#rules)

## 12. Share your feedback (green, centered)

- Kicker: Share your feedback
- No heading.
- Line (muted): Got an issue or an idea? Please report it on GitHub.
- Link (mono blue, to the repo's GitHub issues): Open an issue →

## 13. Footer

No credits section. The page ends with the feedback block, then the mono footer:
`agent-toolkit · MIT`.
