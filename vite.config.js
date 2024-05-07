import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets' : '/src/assets',
      '@components' : '/src/components',
      '@hooks' : '/src/hooks',
      '@pages' : '/src/pages',
      '@styles': '/src/styles',
      '@router': '/src/router'
    }
  }
})
