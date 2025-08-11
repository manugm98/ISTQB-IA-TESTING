import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Detecta si estamos en producción (GitHub Pages, Netlify, etc.)
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProd ? '/ISTQB-IA-TESTING/' : '/', // 👈 usa subcarpeta solo en producción
  plugins: [
    react(),
    tailwindcss()
  ],
})