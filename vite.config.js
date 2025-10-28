import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows sandbox preview
    allowedHosts: ['y5kc48-5173.csb.app'], // replace with your exact sandbox URL if different
  },
});
