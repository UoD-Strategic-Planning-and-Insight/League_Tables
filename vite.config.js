import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Base path matches the GitHub repository name for GitHub Pages deployment
export default defineConfig({
  plugins: [react()],
  base: "/League_Tables/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        international: resolve(__dirname, "international/index.html"),
      },
    },
  },
});
