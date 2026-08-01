import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://eai-org.github.io',
  // PR previews are served from a domain root, so they build with SITE_BASE=/
  base: process.env.SITE_BASE ?? '/agent-toolkit-docs',
  vite: { plugins: [tailwindcss()] },
});
