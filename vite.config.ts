import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        story: 'story/index.html',
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('three')) return 'three'
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('leaflet')) return 'leaflet'
          return 'vendor'
        },
      },
    },
  },
})
