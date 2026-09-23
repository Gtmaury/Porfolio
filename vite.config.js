import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  publicDir: false,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        games: resolve(__dirname, "games.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4321,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 4321,
    strictPort: true,
  },
});
