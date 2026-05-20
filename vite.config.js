import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path matches the GitHub repository name for GitHub Pages deployment
export default defineConfig({
  plugins: [react()],
  base: "/League_Tables/",
});
