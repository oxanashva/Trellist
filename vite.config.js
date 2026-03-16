import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  build: {
    outDir: "build",
    emptyOutDir: true
  },
  test: {
    // Enables global variables like 'describe', 'it', and 'expect'
    globals: true,

    // Simulates a browser environment in Node.js
    environment: 'jsdom',

    // Path to your test setup file (e.g., for MSW or custom matchers)
    setupFiles: ['./src/setupTests.ts'],

    // Recommended tooling for Logic, Utils, and React Components 
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/setupTests.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
