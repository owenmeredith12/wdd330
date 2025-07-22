import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",
        cart: "cart/index.html",
        checkout: "checkout/index.html",
        product: "product_pages/index.html",
        product_listing: "product_listing/index.html",
      },
    },
  },
  base: "./",
});