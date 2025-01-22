import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources')
    }
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js', 
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
        dir: path.resolve(__dirname, 'dist'),
      },
    },
  },
})
