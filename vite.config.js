import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'y5kc48-5173.csb.app', // your CodeSandbox preview domain
      'localhost'
    ],
  },
});
