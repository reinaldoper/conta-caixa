import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    /* setupFiles: './setupTests.js', */
    css: true,
    setupFiles: ['vitest-localstorage-mock', './setupTests.js'],
    mockReset: false,
    reporters: ['verbose'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [],
    }
  },
  server: {
    host: true,
    strictPort: true,
    port: 3001
  }
})
