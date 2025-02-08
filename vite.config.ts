/// <reference types="vitest" />
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.GITHUB_PAGES ? "/prefectures-population-app/" : "",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      reporter: ["text", "json-summary", "json", "html"],
      thresholds: {
        statements: 80,
      },
      include: ["src/**/*"],
      exclude: [
        "src/App.tsx",
        "src/main.tsx",
        "src/mocks/*",
        "src/vite-env.d.ts",
        "**/*.stories.ts",
        "**/*.stories.tsx",
      ],
    },
  },
});
