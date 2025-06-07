import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/junior-dev-gallery' : '/', // Set base only for production
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['@radix-ui/react-toast', '@radix-ui/react-tooltip']
        }
      }
    },
  },
  server: {
    host: "::",
    port: 3005,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
// Removing duplicate config that was causing issues
// This was a duplicate defineConfig that would never be reached


