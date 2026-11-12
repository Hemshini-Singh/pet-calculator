// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// `site` is REQUIRED — it drives the sitemap, canonical URLs and og:url.
// Update this when the final domain is confirmed (PROJECT.md §1.4).
export default defineConfig({
  site: 'https://petcalc.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
  },
});
