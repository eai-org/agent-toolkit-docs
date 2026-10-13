import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.SITE_BASE ?? '/agent-toolkit-docs';

export default defineConfig({
  site: 'https://eai-org.github.io',
  // PR previews are served from a domain root, so they build with SITE_BASE=/
  base,
  // Astro doesn't prefix redirect targets with the base
  redirects: {
    '/conversational-language': `${base.replace(/\/$/, '')}/talking-to-humans/`,
  },
  vite: { plugins: [tailwindcss()] },
});
