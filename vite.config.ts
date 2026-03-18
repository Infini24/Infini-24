import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || "AIzaSyCptks3o8KyGv8aA0tdW62el7ozulCta48"),
    'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "AIzaSyCptks3o8KyGv8aA0tdW62el7ozulCta48"),
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  },
});