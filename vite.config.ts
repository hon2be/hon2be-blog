import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base를 './'로 설정하면 GitHub Pages 서브디렉토리 배포에도 대응.
// 레포 이름이 고정된 경우 '/repo-name/'으로 변경하세요.
export default defineConfig({
  plugins: [react()],
  base: './',
})
