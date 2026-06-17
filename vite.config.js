import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/crossroads_frontend/',
  plugins: [react()],
  server: {
    allowedHosts: [
      'numerous-crushing-recipient.ngrok-free.dev',
      '.ngrok-free.dev'
    ]
  }
})
