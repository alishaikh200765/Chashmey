import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Temporary: makes production errors point to real file/line instead of
    // minified names like Z0, ei, bf. Safe to remove once debugging is done.
    sourcemap: true,
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});