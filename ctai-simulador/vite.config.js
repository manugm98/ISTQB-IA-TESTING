import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProd ? '/ISTQB-IA-TESTING/' : '/',
  plugins: [
    react(),
    tailwindcss()
  ],
})