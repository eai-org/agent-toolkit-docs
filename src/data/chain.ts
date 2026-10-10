import { GROUPS, type Hue } from './groups';

export type ChainNode = string | { label: string; slug: string; anchor: string };

export interface ChainRow {
  kind: 'lane' | 'option' | 'satellite';
  label: string;
  nodes: ChainNode[];
  tail?: { text: string; command: string };
}

export const CHAIN_ROWS: ChainRow[] = [
  {
    kind: 'lane',
    label: 'A task, start to finish',
    nodes: [
      'fetch-ticket',
      'refine-ticket',
      'create-implementation-plan',
      { label: 'Execute the plan', slug: 'task-workflow', anchor: 'act' },
      'self-review',
      'handover',
    ],
  },
  { kind: 'option', label: 'Optional check:', nodes: ['harden-artifact'] },
  { kind: 'option', label: 'Task by task:', nodes: ['split-plan-tasks', 'execute-plan-tasks'] },
  {
    kind: 'satellite',
    label: 'Before you pick the ticket up',
    nodes: ['review-ticket', 'verify-understanding'],
    tail: { text: 'then', command: '/refine-ticket' },
  },
  {
    kind: 'satellite',
    label: 'When the review comes back',
    nodes: ['fetch-pr-review', 'refine-pr-review'],
    tail: {
      text: 'then apply the changes, or plan them first with',
      command: '/create-implementation-plan',
    },
  },
];

export interface ChainTarget {
  text: string;
  slug: string;
  anchor: string;
  hue: Hue | 'text';
}

export function chainTarget(node: ChainNode): ChainTarget {
  if (typeof node !== 'string') {
    return { text: node.label, slug: node.slug, anchor: node.anchor, hue: 'text' };
  }
  const owners = GROUPS.filter((g) => g.skills.includes(node));
  if (owners.length !== 1) {
    throw new Error(`chain node "${node}" sits in ${owners.length} groups, expected exactly 1`);
  }
  return { text: `/${node}`, slug: owners[0].slug, anchor: node, hue: owners[0].hue };
}
