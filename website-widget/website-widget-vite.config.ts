import { defineConfig } from "vite";
import { resolve } from "path";

// Bundles to a single widget.min.js a broker drops into their site with
// one <script> tag — no build step required on their end.
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/widget.ts"),
      name: "DseBrokerWidget",
      fileName: () => "widget.min.js",
      formats: ["iife"],
    },
  },
});
