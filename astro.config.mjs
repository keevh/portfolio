import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE,
  base: process.env.BASE_PATH,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: { host: true },
    resolve: {
      alias: { '@': '.' },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
    },
    ssr: {
      noExternal: ['lucide-react'],
    },
  },
});
