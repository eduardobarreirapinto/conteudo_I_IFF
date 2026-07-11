import { defineConfig } from 'vite';

export default defineConfig({
  // Raiz dos arquivos estáticos públicos (imagens, modelos .glb, etc.)
  publicDir: 'public',

  build: {
    outDir: 'dist',
    // Gera um entry point por página
    rollupOptions: {
      input: {
        main:     'src/pages/index.html',
        corredor: 'src/pages/corredor.html',
        sobre:    'src/pages/sobre.html',
        artigos:  'src/pages/artigos.html',
      },
    },
  },

  server: {
    // Permite servir assets das pastas originais durante o dev
    fs: {
      allow: ['..'],
    },
  },
});
