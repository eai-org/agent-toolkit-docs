# COPY: agent-toolkit website

This file mirrors the shipped user-visible copy: the source code is the truth and every copy
change syncs here (see AGENTS.md; process changed 2026-08-02, no approval gate since). Earlier
approval history: 2026-07-27 copy session including block order; §5-§10 page metadata
2026-07-31; §5-§8 page URLs and titles 2026-08-01; group cards (§2b), slimmed homepage and the
four reworked meta descriptions 2026-08-02. `website.DESIGN.md` holds layout/visuals,
`website.DECISIONS.md` the tech and scope. The site is a homepage overview plus one page per skill group (§5-§10, no `/rules` page
yet) and an About page (§15). Homepage block order: §1 hero, §2 problem, §2b card grid, §3 principles, §4 philosophy,
§11 rules, §12 feedback. The §5-§10 blocks and their demos live only on their group pages,
structured per §14. Bullet items render as the deck pattern:
**bold lead** followed by a muted detail span (no literal dash between them). Skill names in
bullets are mono. Demo lines: `>` input box, `✻` muted spinner, `⏺` agent output; numbered
options with `❯` on the highlighted one and `(recommended)` in green. In voice demos the `⏺` is
pink for the stiff AI reply and green for the human one.

## 0. Nav (every page)

- Wordmark (mono green, links home): agent-toolkit — prefixed with a ← arrow on subpages
- Theme toggle (icon-only: dark/light/system)
- About us, to `/about` — the only page link (added 2026-08-03)
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
| `/skills-docs-authoring` | Skill & doc authoring (purple) | Teach your agent | Write skills and docs agents actually follow, and turn every correction into a lasting lesson. | 3 skills + 3 rules |
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
  fixes are in, and a **REQUIREMENTS.md** with the changes you accepted, ready to hand to
  **/create-implementation-plan** (named as plain mono text, not linked: the sibling-links test
  limits internal links to the Keep-going siblings). Your PR is never touched. Demo (two steps
  with /clear between, extended 2026-08-06 to the output files and the hand-off line):

```
> /fetch-pr-review https://github.com/project/repo/pull/1234
✻ Fetching threads, verdicts and bot comments…
⏺ Saved 1234-users.PR-REVIEW.md: 12 comments, bots kept separate
> /clear
> /refine-pr-review 1234-users.PR-REVIEW.md
✻ Reading the code behind each comment…
⏺ Comment 3/12: "serializeUsers should live in the service layer"
  ❯ 1. address (recommended)
    2. address partially
    3. push back
> 1
✻ Working through the remaining comments…
⏺ Saved 1234-users.PR-REVIEW.ANSWERS.md: a drafted reply per comment
⏺ Saved 1234-users.PR-REVIEW.REQUIREMENTS.md: the accepted changes
⏺ Next: /clear, then /create-implementation-plan
  1234-users.PR-REVIEW.REQUIREMENTS.md          (muted)
```

- **review-code-assistant**: Prepares a review with you, locally in your terminal, and posts
  nothing. Point it at a PR link or a branch: it reads the same diff the platform shows, the PR
  intent and the project's convention docs, then suggests candidate comments in a human voice,
  ordered exactly like the diff so you can scroll the PR and the terminal side by side. A
  comment may only exist when it points to concrete evidence: an actual failure, a cited
  convention, a provable simplification. Zero comments is a valid outcome. **You** decide what
  to post. Demo (added 2026-08-06; the suggested comment renders green, the human-voice color):

```
> /review-code-assistant https://github.com/project/repo/pull/5678
✻ Diffing 5678-orders against main, reading the PR intent…
✻ Running the project conventions against every changed file…
⏺ Adds the pending_review status to the order list. 1 comment:
⏺ 1 · src/orders/order-list.component.ts:87 checks status === 'pending'
  but the new status is 'pending_review', so these orders would
  silently disappear from the list
⏺ (green) Suggested comment: "looks like this checks for 'pending' but
  the new status is 'pending_review', so these orders would disappear
  from the list"
```

- Page `/pr-review-assistants` — title `PR review assistants · agent-toolkit`; meta description
  `Code review is the new bottleneck. These skills assist both sides of it: triage the feedback
  your PR gets, and prepare your review of someone else's code. The agent suggests, you
  decide.`;
  footer link (`target="_blank"`): [Read more about the PR review skills →](https://medium.com/engineering-in-the-age-of-ai/let-ai-speed-up-both-sides-of-your-code-reviews-while-you-stay-in-full-control-3b059506ef39)

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
  the right trigger type, and progressive disclosure.
- **self-improve** when the agent makes a mistake or doesn't behave the way you want, this skill
  captures the lesson as a diff to the skill or doc that should have prevented it. You approve
  where it lands, and the mistake doesn't repeat.
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
  faint green background):

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

- Rules subsection, hairline-separated before the Keep-going footer — sans-serif h2
  `Opinionated rules that support this approach`; intro (muted): Optional and not installed by
  default: three rules that support this authoring approach. Bullets, each closing with a mono
  [Read the rule →] link to its file under `rules/` on GitHub:
  - **compact-governing-docs** every edit to a skill or governing doc goes through the
    compaction skills first.
  - **self-contained-docs** planning docs carry everything a fresh session needs, and nothing
    more.
  - **self-improve-on-correction** when you correct the agent on something a doc governs, it
    offers to capture the lesson with /self-improve.
- Page `/skills-docs-authoring` — title `Skills & docs authoring · agent-toolkit`; meta
  description `Write skills and docs your agents actually follow, and turn every correction into
  a lasting lesson.`; no footer link (the article link moved into the intro).

## 10. Conversational voice (blue)

- Heading: Texts that sound like a real human typed them
- Intro (muted, two paragraphs, revamped 2026-08-03 after the voice article): (1) We often ask
  AI to help draft texts that other people will read: chat replies, PR comments, commit
  messages. The agent is great at drafting them quickly, but not at matching the tone to the
  context: a chat reply doesn't want the polish of a README, yet everything comes out in the
  same overly formal, fancy prose that readers recognize as AI at a glance. (2) The skill and
  rule below take the best of both worlds: the agent's speed, your voice.
- **use-conversational-language** tells the agent to write in simple, human language instead of
  sophisticated AI prose full of — em dashes — and fancy terms. It adapts the voice to the kind
  of text (a PR comment, a chat reply, a code comment) and changes the wording only, never the
  content: you still review every text before it goes out.
- **write-realistic-texts** opt-in rule that applies the skill automatically whenever the agent
  writes something a human will read as if a person wrote it, even when writing wasn't the task
  you gave it.
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
  description `Texts that sound like a real human typed them, not sophisticated AI prose.`;
  footer link (`target="_blank"`): [Read more about the conversational voice →](https://medium.com/engineering-in-the-age-of-ai/how-to-use-ai-to-generate-texts-that-sound-like-a-human-would-actually-write-them-c7eef78e0b42)

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
- handover: Closes the task. Give it a ticket id, or nothing at all, and it finds the task's
  planning files, gathers the decisions made along the way, from the ticket to the session
  itself, matches the plan against the actual diff and writes a **HANDOVER.md**: a paste-ready
  PR description with the decisions worth knowing, where to look and what's still open, so
  reviewers never reconstruct intent from the diff. Demo:

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
  asking whoever owns the requirements. Each question survived an adversarial hunt for its answer
  across code, tracker, designs and docs, so you're never asked what the sources could have
  answered. Verdict and briefing land in a **TICKET-REVIEW.md** next to the ticket. Demo:

```
> /review-ticket 1234-users.TICKET.md
✻ Comparing the ticket against the codebase…
✻ Challenging 3 candidate questions…
⏺ 1 answered by the backend repo, 2 to raise
⏺ 2 questions to resolve before starting
⏺ Saved 1234-users.TICKET-REVIEW.md with briefing and questions
```

- check-ticket-implementation (under Extra workflow skills, added 2026-08-07), two paragraphs:
  (1) Answers one question: how much of this ticket is already built? It splits the ticket into
  individual requirements and judges each one against the code, so the verdict lands per
  requirement instead of on the ticket as a whole: done, partially done, not done, or not
  verifiable from the code, each with a short note and the **file:line** where it was checked.
  (2) The report goes into a **TICKET-STATUS.md**, headed by the tally and the requirements that
  need attention. Useful when you pick up a branch someone else started, or before you call a
  ticket finished. It writes that one file and nothing else: your code and the ticket stay
  untouched. Demo:

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
- /skills-docs-authoring (reworked 2026-08-02): full copy in the rewritten §9. Layout
  deviations: the page-level article link sits in the intro as a more-link line, not a closing
  block, and a compact rules subsection (h2, muted intro, three rule bullets with per-rule
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
