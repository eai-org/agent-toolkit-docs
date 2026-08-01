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

d('/workflow', () => {
  const html = () => read('dist/workflow/index.html');

  test('has its own h1 and intro', () => {
    expect(html()).toContain('From a ticket to shipped code');
    expect(html()).toContain('<h1');
  });

  test('lists its four skills', () => {
    for (const s of ['fetch-ticket', 'refine-ticket', 'create-implementation-plan', 'create-manual-test-instructions']) {
      expect(html()).toContain(s);
    }
  });

  test('carries the refine-ticket demo', () => {
    expect(html()).toContain('02-refine-ticket.cast');
  });

  test('links onward to two siblings and back to all groups', () => {
    expect(html()).toContain(`${baseFrom()}/reviews/`);
    expect(html()).toContain(`${baseFrom()}/hygiene/`);
    expect(html()).toContain(`${baseFrom()}/#whats-inside`);
  });
});

d('/reviews', () => {
  const html = () => read('dist/reviews/index.html');

  test('has its own h1', () => {
    expect(html()).toContain('Help on both sides of the review');
    expect(html()).toContain('<h1');
  });

  test('lists its four skills including fresh eyes', () => {
    for (const s of ['fetch-pr-review', 'refine-pr-review', 'review-code-assistant', 'fresh-eyes-review']) {
      expect(html()).toContain(s);
    }
  });

  test('carries both review demos', () => {
    expect(html()).toContain('03-pr-review.cast');
    expect(html()).toContain('04-fresh-eyes.cast');
  });

  test('keeps fresh eyes as its own sub-section', () => {
    expect(html()).toContain('Let a sub-agent take a fresh look');
  });
});

d('/hygiene', () => {
  const html = () => read('dist/hygiene/index.html');

  test('has its own h1', () => {
    expect(html()).toContain('Your context is often cluttered before you even type');
    expect(html()).toContain('<h1');
  });

  test('lists its two skills', () => {
    expect(html()).toContain('context-checkup');
    expect(html()).toContain('memory-doctor');
  });

  test('carries the context-checkup demo', () => {
    expect(html()).toContain('05-context-checkup.cast');
  });
});
