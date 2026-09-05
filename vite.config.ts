import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import ssg from '@hono/vite-ssg'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    devServer({
      entry: 'src/index.tsx',
    }),
    ssg({
      entry: 'src/index.tsx',
    }),
  ],
})