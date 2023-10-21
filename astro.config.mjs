import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import checker from 'vite-plugin-checker';

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'hybrid',
  adapter: netlify(),
  // eslint-disable-next-line no-undef
  site: 'https://delightful-seahorse-b526e2.netlify.app',
  vite: {
    plugins: [checker({
      typescript: true,
      overlay: {
        initialIsOpen: false,
        badgeStyle: 'left: 55px; bottom: 8px;'
      },
      enableBuild: false // we already check that in `yarn ci:check`
    })],

    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    },
    build: {
      sourcemap: true /* B2B:CONFIG consider disabling sourcemaps for production */
    }
  },

  server: {
    port: 3000
  }
});