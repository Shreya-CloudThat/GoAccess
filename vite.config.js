import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  // build: { chunkSizeWarningLimit: 3600 },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
});


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
