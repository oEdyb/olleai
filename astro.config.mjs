// @ts-check
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  output: 'server',
  adapter: cloudflare(),
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
