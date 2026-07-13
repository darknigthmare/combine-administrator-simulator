import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const host = process.env.TAURI_DEV_HOST

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  clearScreen: false,
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20 * 1024,
          maxSize: 420 * 1024,
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
              priority: 40,
              includeDependenciesRecursively: false,
            },
            {
              name: 'charts-vendor',
              test: /node_modules[\\/](?:recharts|d3-|victory-vendor|decimal\.js)/,
              priority: 35,
              includeDependenciesRecursively: false,
            },
            {
              name: 'icons-vendor',
              test: /node_modules[\\/]lucide-react[\\/]/,
              priority: 35,
              includeDependenciesRecursively: false,
            },
            {
              name: 'game-data',
              test: (id) => /[\\/]src[\\/]data[\\/]/.test(id) && !id.endsWith('crisisEvents.ts'),
              priority: 30,
              maxSize: 360 * 1024,
              includeDependenciesRecursively: false,
            },
            {
              name: 'game-systems',
              test: /[\\/]src[\\/]systems[\\/]/,
              priority: 25,
              maxSize: 360 * 1024,
              includeDependenciesRecursively: false,
            },
          ],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 5173,
        }
      : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
})
