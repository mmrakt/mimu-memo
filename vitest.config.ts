import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // @ts-ignore Bun resolves two Vite type copies; suppress mismatched plugin signature.
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    includeSource: ['app/**/*.{js,ts,jsx,tsx}'],
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
  define: {
    global: 'globalThis',
  },
});
