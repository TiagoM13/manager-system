import path from 'path';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  server: {
    port: 3003,
  },
  preview: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
