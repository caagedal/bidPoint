import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'user/login/index.html'),
        listing: resolve(__dirname, 'listing/index.html'),
        // legg til flere sider her om du har dem
      }
    }
  }
})
