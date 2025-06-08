import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/junior-dev-gallery/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: '', // Important: fixes broken relative paths
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['@radix-ui/react-toast', '@radix-ui/react-tooltip'],
        },
      },
    },
  },
  server: {
    host: '::',
    port: 3005,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
