import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json"; // new!
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      web3: 'web3/dist/web3.min.js',
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/http',
      // zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util',
      './runtimeConfig': './runtimeConfig.browser',
    }
  },
  server:{
    port: 8080,
    proxy:{cors:false}
    
  }
});
