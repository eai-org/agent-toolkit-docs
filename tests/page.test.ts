import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

// per AGENTS.md the page checks only run when a build is present
const d = existsSync('dist/index.html') ? describe : describe.skip;
const read = (p: string) => readFileSync(p, 'utf8');

// The site base is '/agent-toolkit-docs' on Pages and '' on SITE_BASE=/ preview builds, and
// the preview workflow sets SITE_BASE on its build step only. So read the base back out of the
// build itself, off the favicon link that Base.astro emits on every page.
const baseFrom = () => read('dist/index.html').match(/href="([^"]*)\/favicon\.svg"/)![1];

d('homepage', () => {
  test('the install button points at the homepage anchor, not a bare hash', () => {
    const html = read('dist/index.html');
    expect(html).toContain(`href="${baseFrom()}/#install"`);
  });

  test('no curly apostrophes', () => {
    expect(read('dist/index.html')).not.toMatch(/[‘’]/);
  });
});
