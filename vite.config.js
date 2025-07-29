import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  base: '', // << important for Netlify paths

  build: {
    outDir: '../dist', // <<< must be relative to root
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        product_listing: resolve(__dirname, 'src/product_listing/index.html'),
      },
    },
  },
});