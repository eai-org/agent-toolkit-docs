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
  /** what sits bottom-left on the card */
  count: string;
}

export const GROUPS: Group[] = [
  {
    slug: 'task-workflow',
    kicker: 'Task workflow',
    hue: 'green',
    title: 'Refine, plan, act',
    line: 'Turn a ticket into requirements, a plan, then code, with a clean handoff at every step.',
    count: '4 skills',
  },
  {
    slug: 'pr-review-assistants',
    kicker: 'PR reviews',
    hue: 'orange',
    title: 'Both sides of the review',
    line: "Triage the feedback your PR gets and review someone else's code.",
    count: '3 skills',
  },
  {
    slug: 'fresh-eyes-review',
    kicker: 'Fresh eyes review',
    hue: 'pink',
    title: 'Let a sub-agent review the code',
    line: 'A sub-agent with a clean context, seeing only the changeset, catches what the session that wrote the code misses.',
    count: '1 skill',
  },
  {
    slug: 'context-hygiene',
    kicker: 'Context & memory',
    hue: 'blue',
    title: 'Keep the context lean',
    line: 'See what auto-loads before you even type, and trim it without breaking anything.',
    count: '2 skills',
  },
  {
    slug: 'skills-docs-authoring',
    kicker: 'Skill & doc authoring',
    hue: 'purple',
    title: 'Teach your agent',
    line: 'Write skills and docs agents actually follow, and turn every correction into a lasting lesson.',
    count: '3 skills',
  },
  {
    slug: 'conversational-language',
    kicker: 'Conversational voice',
    hue: 'blue',
    title: 'Texts that sound like a real human typed them',
    short: 'Texts that sound like real humans',
    line: 'No em dashes, no "this valuable feedback". Just what you would have written yourself, faster.',
    count: '1 skill + 1 rule',
  },
];

/** the next two groups in GROUPS order, wrapping past the end */
export function siblingsOf(slug: string): Group[] {
  const i = GROUPS.findIndex((g) => g.slug === slug);
  if (i < 0) throw new Error(`unknown group: ${slug}`);
  return [GROUPS[(i + 1) % GROUPS.length], GROUPS[(i + 2) % GROUPS.length]];
}
