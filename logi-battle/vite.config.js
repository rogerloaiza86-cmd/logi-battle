import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/logi-battle/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
