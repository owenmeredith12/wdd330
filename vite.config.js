import { resolve } from 'path';
import { defineConfig } from 'vite';

// Vite configuration
export default defineConfig({
  root: 'src/',

  build: {
    outDir: "../dist",

    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"), // added this line to include the product page
      },
    },
  },
});