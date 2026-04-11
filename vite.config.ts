import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포 경로: hon2be.github.io/hon2be-blog/
export default defineConfig({
  plugins: [react()],
  base: '/hon2be-blog/',
})
