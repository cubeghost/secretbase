import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import virtualBaseDimensions from './dimensions.plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), virtualBaseDimensions()],
  build: {
    target: 'esnext',
    outDir: 'dist/client',
    manifest: true
  },
  server: {
    proxy: {
      '^/assets/index-.*\.css': {
        target: 'http://localhost:5173',
        rewrite: (path) => path.replace(/^\/assets/, '/dist/client/assets'),
      }
    }
  }
});
