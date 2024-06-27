import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: false }), // Disable TypeScript checking
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
