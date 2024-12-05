import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { manifest } from "./manifest.ts";

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
