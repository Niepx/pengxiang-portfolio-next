import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/pengxiang-portfolio-next/',
  plugins: [react()],
  server: {
    watch: { usePolling: true, interval: 300 },
  },
});
