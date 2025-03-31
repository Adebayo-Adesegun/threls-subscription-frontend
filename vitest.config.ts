import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    globals: true,
    include: [
      "components/**/*.{test,spec}.{js,ts}",
      "components/**/tests/**/*.{test,spec}.{js,ts}",
      "libs/**/*.{test,spec}.{js,ts}",
    ],
    // setupFiles: "./tests/setup.ts",
  },
});
