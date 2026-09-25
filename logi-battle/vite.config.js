import { copyFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      copyFileSync('dist/index.html', 'dist/404.html')
    },
  }
}

export default defineConfig({
  base: process.env.VERCEL ? '/' : '/logi-battle/',
  plugins: [react(), githubPagesSpaFallback()],
  server: {
    port: 3000,
    host: true
  }
})
