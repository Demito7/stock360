import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  base: '/', // 🔧 importante para Vercel
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // permite usar @ como alias de src
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});
