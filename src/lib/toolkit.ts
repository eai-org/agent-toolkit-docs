import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export const toolkitDir = process.env.TOOLKIT_DIR ?? '../agent-toolkit';

export const GITHUB_BLOB = 'https://github.com/eai-org/agent-toolkit/blob/main';

/** false only when TOOLKIT_DIR is unset and the default checkout is absent */
export const toolkitExpected = () => process.env.TOOLKIT_DIR !== undefined || existsSync(toolkitDir);

export interface ToolkitItem {
  name: string;
  description: string;
}

function description(path: string): string {
  const fm = readFileSync(path, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const desc = fm && parse(fm[1])?.description;
  if (!desc) throw new Error(`no frontmatter description in ${path}`);
  return String(desc).trim();
}

export function readToolkit(): { skills: ToolkitItem[]; rules: ToolkitItem[] } {
  const skillsDir = join(toolkitDir, 'skills');
  const rulesDir = join(toolkitDir, 'rules');
  if (!existsSync(skillsDir) || !existsSync(rulesDir)) {
    throw new Error(`toolkit checkout not found: ${toolkitDir} (set TOOLKIT_DIR to an agent-toolkit checkout)`);
  }

  // a local checkout can carry harness-created dirs under skills/ with no SKILL.md
  const skills = readdirSync(skillsDir)
    .filter((name) => existsSync(join(skillsDir, name, 'SKILL.md')))
    .sort()
    .map((name) => ({ name, description: description(join(skillsDir, name, 'SKILL.md')) }));

  const rules = readdirSync(rulesDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => ({ name: f.replace(/\.md$/, ''), description: description(join(rulesDir, f)) }));

  return { skills, rules };
}
