import path from 'path';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all'), tsconfigPaths()],
  server: { port: 3003 },
  preview: { port: 3001 },
  build: {
    outDir: 'build',
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
