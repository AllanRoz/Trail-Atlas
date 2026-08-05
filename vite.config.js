import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites from a subpath (username.github.io/repo-name),
// so `base` must match your repo name exactly. If you deploy to a custom domain
// or a user/organization page (username.github.io), change this back to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/Trail-Atlas/',
})
