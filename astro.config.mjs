import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://eai-org.github.io',
  base: '/agent-toolkit-docs',
  vite: { plugins: [tailwindcss()] },
});
