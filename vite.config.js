import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// BASE : "/" en local. Pour GitHub Pages (https://<compte>.github.io/<dépôt>/),
// le workflow de déploiement passe BASE_PATH=/<dépôt>/.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  build: { target: 'es2020' },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['icons/favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'FORGE — Coach musculation',
        short_name: 'FORGE',
        description: 'Programmes, séances, chronomètre et suivi de progression, même sans connexion.',
        lang: 'fr',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0B0D11',
        theme_color: '#0B0D11',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Tout le code, les styles, polices et icônes sont pré-cachés :
        // l'app s'ouvre intégralement sans réseau dès la 1re visite terminée.
        globPatterns: ['**/*.{js,css,html,woff2,png,svg,ico,webmanifest}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        importScripts: ['sw-notify.js'],
      },
    }),
  ],
});
