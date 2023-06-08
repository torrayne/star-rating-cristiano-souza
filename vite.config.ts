import { defineConfig, createLogger } from 'vite'
import react from '@vitejs/plugin-react'
import mix from 'vite-plugin-mix'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      include: ['./src/App.jsx', './src/components/*.jsx', './src/components/*.tsx'] // it's unnecessary and cause the page full-reload
    }),
    mix({
      handler: './_/index.js'
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      clientPort: parseInt(process.env.WEBSOCKET_PORT!),
    },
  },
  customLogger: createLogger('info', { prefix: '[coderpad]' }),
})
