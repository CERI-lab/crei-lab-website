import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public review draft; replace with the approved Tufts origin before launch.
export default defineConfig({
  site: 'https://ceri-lab.github.io',
  base: '/crei-lab-website',
  output: 'static',
  // Teaching folded into About and Contact into Opportunities (2026-10-15); keep old links working.
  redirects: {
    '/teaching': '/about',
    '/contact': '/join',
  },
  integrations: [sitemap()],
});
