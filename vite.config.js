import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['y5kc48-5173.csb.app'], // 👈 Replace this if your URL changes
    host: true, // allows sandbox/remote access
  },
})