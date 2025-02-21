import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          components: [
            './src/components/BlogCard.tsx',
            './src/components/Categories.tsx',
            './src/components/Footer.tsx',
            './src/components/Hero.tsx',
            './src/components/Navigation.tsx',
            './src/components/Newsletter.tsx',
            './src/components/Testimonials.tsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
