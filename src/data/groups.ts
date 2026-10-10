export type Hue = 'green' | 'blue' | 'orange' | 'purple' | 'pink';

export interface Group {
  /** route segment under the site base, e.g. 'task-workflow' */
  slug: string;
  kicker: string;
  hue: Hue;
  title: string;
  /** one-line stand-in for a long title on the compact footer cards */
  short?: string;
  /** one-line card description */
  line: string;
  /** names of the page's blocks that link their SKILL.md on GitHub, in page order */
  skills: string[];
  /** names of the page's blocks or bullets that link their rule file on GitHub, in page order */
  rules: string[];
  /** bottom-left of the card, derived from `skills` and `rules` */
  count: string;
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

export const countLabel = (skills: string[], rules: string[]) =>
  plural(skills.length, 'skill') + (rules.length ? ` + ${plural(rules.length, 'rule')}` : '');

const ENTRIES: Omit<Group, 'count'>[] = [
  {
    slug: 'task-workflow',
    kicker: 'Task workflow',
    hue: 'green',
    title: 'Refine, plan, act, consolidate',
    line: 'Turn a ticket into requirements, a plan, then reviewed code, with a clean handoff at every step.',
    skills: [
      'fetch-ticket',
      'attach-to-ticket',
      'refine-ticket',
      'create-implementation-plan',
      'harden-artifact',
      'split-plan-tasks',
      'execute-plan-tasks',
      'handover',
      'review-ticket',
      'verify-understanding',
      'create-manual-test-instructions',
      'check-ticket-implementation',
      'grill-me',
      'prepare-prompt',
    ],
    rules: ['plans-directory'],
  },
  {
    slug: 'pr-review-assistants',
    kicker: 'PR reviews',
    hue: 'orange',
    title: 'Both sides of the review',
    line: "Triage the feedback your PR gets, review someone else's code, and decide whether it merges.",
    skills: ['fetch-pr-review', 'refine-pr-review', 'review-code-assistant', 'maintainer-review'],
    rules: [],
  },
  {
    slug: 'fresh-eyes-review',
    kicker: 'Fresh eyes review',
    hue: 'pink',
    title: 'Let a sub-agent review the code',
    line: 'A sub-agent with a clean context sees your changes but not the reasoning behind them, so it catches what the session that wrote them misses.',
    skills: ['fresh-eyes-review', 'self-review'],
    rules: [],
  },
  {
    slug: 'context-hygiene',
    kicker: 'Context & memory',
    hue: 'blue',
    title: 'Keep the context lean',
    line: 'Give your project a lean agent setup, see what auto-loads before you even type, and trim it.',
    skills: ['context-checkup', 'memory-doctor', 'agentify-project'],
    rules: [],
  },
  {
    slug: 'skills-docs-authoring',
    kicker: 'Skill & doc authoring',
    hue: 'purple',
    title: 'Teach your agent',
    line: 'Write skills and docs agents actually follow, and turn every correction into a lasting lesson.',
    skills: ['compact-docs-writer', 'compact-skill-creator', 'self-improve'],
    rules: [
      'compact-governing-docs',
      'read-other-repos-governing-docs',
      'self-contained-docs',
      'self-improve-on-correction',
    ],
  },
  {
    slug: 'talking-to-humans',
    kicker: 'Talking to humans',
    hue: 'blue',
    title: 'Texts that sound like you, explanations you understand',
    short: 'Your voice, clear explanations',
    line: 'Texts that sound like you typed them, and explanations people understand on the first read, even in a second language.',
    skills: ['use-conversational-language', 'explain-in-simple-language'],
    rules: ['write-realistic-texts', 'no-nonsense-comments', 'write-simple-explanations'],
  },
];

export const GROUPS: Group[] = ENTRIES.map((g) => ({ ...g, count: countLabel(g.skills, g.rules) }));

/** the next two groups in GROUPS order, wrapping past the end */
export function siblingsOf(slug: string): Group[] {
  const i = GROUPS.findIndex((g) => g.slug === slug);
  if (i < 0) throw new Error(`unknown group: ${slug}`);
  return [GROUPS[(i + 1) % GROUPS.length], GROUPS[(i + 2) % GROUPS.length]];
}
