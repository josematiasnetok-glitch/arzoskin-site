import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(root, "client"),
  publicDir: path.resolve(root, "client/public"),
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(root, "client/src") } },
  build: {
    outDir: path.resolve(root, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 900,
  },
});
