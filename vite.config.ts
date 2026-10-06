import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "./",
  // The portable HTML is generated output, not a second application entry.
  optimizeDeps: { entries: ["index.html"] },
  server: { host: "0.0.0.0" },
});
