import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "static",
  build: {
    outDir: "./public",
    emptyOutDir: true
  },
  server: {
    proxy: {
      "/resistors": "http://localhost:3000"
    }
  }
});
