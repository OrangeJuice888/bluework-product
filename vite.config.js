import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bluework-product',
  // server: {
  //   port: 5273,
  //   strictPort: true,
  // },
})
