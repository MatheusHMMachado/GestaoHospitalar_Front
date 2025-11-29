import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    //Limpa a pasta de build antes de cada nova build
    emptyOutDir: true,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "3000",
    proxy: {
      //Captura todas as requisições que começam com /api e redireciona para o backend
      '/api': {
        target: 'http://localhost:8080', //Redireciona para o backend.
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    }  
  }
});