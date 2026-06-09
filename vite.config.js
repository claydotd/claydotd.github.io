import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function ghPagesSpaFallback() {
  return {
    name: 'gh-pages-spa-fallback',
    closeBundle() {
      const index = join(process.cwd(), 'dist', 'index.html')
      copyFileSync(index, join(process.cwd(), 'dist', '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react(), ghPagesSpaFallback()],
    base: env.BASE_PATH || '/',
  }
})
