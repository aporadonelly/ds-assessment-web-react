//  <reference types="vitest" />
// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    reporters: "verbose",
  },
});