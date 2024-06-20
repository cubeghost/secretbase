import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import virtualBaseDimensions from './dimensions.plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), virtualBaseDimensions()],
  build: {
    outDir: 'dist/server',
    copyPublicDir: false,
    minify: false,
    ssr: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/components/StaticRender.tsx'),
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});
