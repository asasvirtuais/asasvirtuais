import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: '../../public/bundles/gallery-slider',
    rollupOptions: {
      output: {
        entryFileNames: `bundle.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
      cache: false
    }
  },
})
