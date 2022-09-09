import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      }
    }
  },
  integrations: [tailwind()],
  output: "server",
  adapter: deno()
});