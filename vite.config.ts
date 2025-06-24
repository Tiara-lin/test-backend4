import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 用 defineConfig 包裝可以自動提供型別提示
export default defineConfig({
  base: '/test-backend3/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});