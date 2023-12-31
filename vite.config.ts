import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: false,
    //   },
    //   workbox: {
    //     clientsClaim: true,
    //     skipWaiting: true,
    //     sourcemap: true,
    //     globPatterns: [
    //       '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2,ts}',
    //     ],
    //   },
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    //   manifest: {
    //     name: 'Football CRUD App',
    //     short_name: 'Football CRUD App',
    //     description: 'Football CRUD App',
    //     theme_color: '#111827',
    //     background_color: '#111827',
    //     icons: [
    //       {
    //         src: '/android-chrome-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/android-chrome-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/favicon-32x32.png',
    //         sizes: '32x32',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/favicon-16x16.png',
    //         sizes: '16x16',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
