import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Cuando se define SINGLEFILE (script build:offline), se empaqueta toda la app
// (JS + CSS) en un único index.html autocontenido que funciona con doble clic
// desde file:// y sin conexión. El build normal queda intacto.
const singleFile = !!process.env.SINGLEFILE

export default defineConfig({
  base: singleFile ? './' : '/',
  plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
})
