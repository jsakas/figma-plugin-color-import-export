import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// https://vitest.dev/config/
export default defineConfig({
  plugins: [
    viteTsconfigPaths({
      root: __dirname,
    }),
    react(),
  ],
  test: {
    globals: true,
  },
})
