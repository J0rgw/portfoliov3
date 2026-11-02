import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// The site is served from the root of a custom domain (portfolio.jarcas.dev),
// so no `base` is needed. Prerendering: scripts/prerender.mjs.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
  },
});
