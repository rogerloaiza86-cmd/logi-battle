import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VERCEL ? '/' : '/logi-battle/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
