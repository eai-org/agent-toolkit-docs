import { createHash } from 'node:crypto';

export const CATALOGUE_TITLE = 'Skills and rules';

export const CATALOGUE_DESCRIPTION =
  'Every skill and rule in agent-toolkit on one page, grouped the way the site groups them, each linking to its source on GitHub.';

export interface CatalogueLine {
  /** the row text: a lowercase fragment with no trailing period */
  line: string;
  /** fingerprint of the description the line was written against; a mismatch only warns */
  desc: string;
  /** optional tag shown beside the name */
  chip?: string;
  /** optional command shown in inline code at the end of the line */
  code?: string;
}

/** skills first, then rules */
export const CATALOGUE_LINES: Record<string, CatalogueLine> = {
  'agentify-project': {
    line: 'gives a project a lean, agent-neutral setup: a short AGENTS.md index, shared skills and gitignore hygiene, re-runnable as an audit',
    desc: '224a687d',
  },
  'attach-to-ticket': {
    line: 'saves a screenshot or file you paste, or one you give by path or link, next to the ticket file and references it there, like an attachment the fetch could not download',
    desc: '1dadadb0',
  },
  'check-ticket-implementation': {
    line: 'checks how much of a ticket is already built, marking each requirement done, partial, not done or not verifiable in a TICKET-STATUS.md',
    desc: '8db3e932',
  },
  'compact-docs-writer': {
    line: 'writes or rewrites a doc to carry every rule and intent in the least text possible',
    desc: '47b1b5df',
  },
  'compact-skill-creator': {
    line: 'creates or edits skills, keeping them lean and effective',
    desc: 'af377441',
  },
  'context-checkup': {
    line: 'audits what auto-loads into a session before you type and suggests what to trim',
    desc: '02d5d186',
  },
  'create-implementation-plan': {
    line: 'defines the HOW: settles the technical decisions with you and writes a PLAN.md a fresh session can execute',
    desc: '654568d8',
  },
  'create-manual-test-instructions': {
    line: 'turns a ticket or its requirements into a MANUAL-TEST.md a non-author can follow',
    desc: '569b8173',
  },
  'execute-plan-tasks': {
    line: "runs one task of the PLAN.md checklist, then stops: it implements the task, runs your project's checks and ticks it off, so you review every task before the next one starts",
    desc: '366af407',
  },
  'explain-in-simple-language': {
    line: 'rewords answers, recaps and questions to you, and documents a teammate reads, so they are understood on the first read',
    desc: 'd390e33d',
  },
  'fetch-pr-review': {
    line: 'collects the comments reviewers left on your PR into a PR-REVIEW.md, ready to address or push back on',
    desc: '45e1d9a1',
  },
  'fetch-ticket': {
    line: 'downloads a ticket from Jira, GitHub, Azure DevOps or similar into a self-contained TICKET.md, with its attachments and a list of the tickets it links',
    desc: 'db3fb687',
  },
  'fresh-eyes-review': {
    line: 'a sub-agent with a clean context reviews a changeset and reports back what the session that wrote it misses',
    desc: '5fe31738',
  },
  'grill-me': {
    line: 'interviews you about any plan, design or idea, one question at a time, each with a recommended answer, until every branch is settled',
    desc: '12b460c9',
  },
  handover: {
    line: 'packages a finished change as a paste-ready PR description: what it does and why, the decisions worth knowing, where to look',
    desc: 'bbba69ab',
  },
  'harden-artifact': {
    line: 'checks a REQUIREMENTS.md or PLAN.md against the ticket, the code and the related tickets in a fresh session, and you decide each finding that survives',
    desc: '9cb15b5c',
  },
  'maintainer-review': {
    line: "reviews someone else's PR as the maintainer deciding whether it merges: every comment walked, every claim verified, nothing posted without your go-ahead",
    desc: '2b120f6a',
  },
  'memory-doctor': {
    line: 'cleans up the memory your agent keeps accumulating on its own, moving what matters to the right place',
    desc: '1501748b',
  },
  'prepare-prompt': {
    line: "writes the prompt that hands this session's work to a fresh session, as short as the next session allows",
    desc: 'fb848a99',
  },
  'refine-pr-review': {
    line: 'goes through a fetched review with you, comment by comment, drafting the replies and turning the accepted changes into a REQUIREMENTS.md',
    desc: '990efca7',
  },
  'refine-ticket': {
    line: 'defines the WHAT: checks the ticket, or a raw idea, against the codebase, settles the open decisions with you and saves a REQUIREMENTS.md',
    desc: 'cbb23048',
  },
  'review-code-assistant': {
    line: 'prepares your review of a PR or branch: concise comments with file and line, nothing posted',
    desc: '304436fb',
  },
  'review-ticket': {
    line: 'triages a ticket before anyone picks it up: a verdict, a feature walkthrough and the questions worth raising, saved in a TICKET-REVIEW.md',
    desc: '44627c7d',
  },
  'run-nx-checks': {
    line: 'formats, lints, tests and builds the projects your change affects, fixes what needs no judgment call and reports the rest. Not on Nx? Leave it out with',
    code: './install.sh --exclude run-nx-checks',
    chip: 'Nx workspaces only',
    desc: '1eae8717',
  },
  'self-improve': {
    line: "captures a lesson into the skill, doc or check that should have prevented the mistake, so it doesn't repeat",
    desc: '0b363068',
  },
  'self-review': {
    line: 'checks your branch before you ask anyone to review it: a sub-agent with a clean context reviews it the way a maintainer would, you go through each finding, and a short SELF-REVIEW.md goes into the PR',
    desc: '2254bb1e',
  },
  'split-plan-tasks': {
    line: 'breaks the plan into small tasks you can review and commit on their own, in groups that each make one PR, added to the end of PLAN.md as a checklist once you approve',
    desc: '60ffcd6b',
  },
  'use-conversational-language': {
    line: 'the voice for texts that should read as if a person typed them: PR comments, replies, commit messages, code comments',
    desc: '44f29ac6',
  },
  'verify-understanding': {
    line: 'a teach-back chat over a TICKET-REVIEW.md: you explain the feature in your own words, the agent probes and corrects',
    desc: '09455802',
  },

  'compact-governing-docs': {
    line: 'every edit to a skill or governing doc goes through the compaction skills first',
    desc: '37e708a6',
  },
  'git-read-only-by-default': {
    line: 'no commits, pushes or resets unless you asked for them',
    desc: 'bf7cffec',
  },
  'no-ai-attribution': {
    line: 'your work stays yours: no AI co-author, no "generated with" footer',
    desc: 'a30c6118',
  },
  'no-nonsense-comments': {
    line: 'only comments a future reader with zero context still needs',
    desc: '30093080',
  },
  'plans-directory': {
    line: "where planning documents go: one folder per task in the project's planning directory, .agents/plans/ by default",
    desc: 'ec14147b',
  },
  'read-other-repos-governing-docs': {
    line: "before the agent edits another repo, it reads and follows that repo's AGENTS.md or CLAUDE.md, since those load on their own only in the project you're working in",
    desc: '30bb8c0f',
  },
  'self-contained-docs': {
    line: 'planning docs, and prompts that hand work to a fresh session, carry everything that session needs and nothing more',
    desc: 'e1968fdc',
  },
  'self-improve-on-correction': {
    line: 'when you correct the agent on something a doc governs, it offers to capture the lesson with /self-improve',
    desc: 'd5f80899',
  },
  'write-realistic-texts': {
    line: 'texts other people read get the conversational voice, and you see the wording before anything is posted',
    desc: 'e893393b',
  },
  'write-simple-explanations': {
    line: 'applies explain-in-simple-language whenever the agent asks you something, explains, recaps or writes a document a person reads',
    desc: '608adadc',
  },
};

/** the copy-paste rule doc, which is not a file under rules/ */
export const SNIPPET = {
  name: 'use-my-mothertongue',
  path: 'docs/use-my-mothertongue-rule.md',
  line: 'a copy-paste snippet, not a file: your agent talks to you in your own language, while everything it writes into the project stays in English',
};

export const fingerprint = (description: string) =>
  createHash('sha1').update(description).digest('hex').slice(0, 8);

export function sanitizeDescription(d: string): string {
  return d
    .replace(/\s*Invoke manually only\.\s*/g, ' ')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/[‘’]/g, "'")
    .trim();
}

export const catalogueLine = (name: string, description: string) =>
  CATALOGUE_LINES[name]?.line ?? sanitizeDescription(description);
