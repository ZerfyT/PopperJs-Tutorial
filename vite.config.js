import { defineConfig } from 'vite';

export default defineConfig({
    base: '/',
    build: {
        minify: 'esbuild',
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                assetFileNames: '[name].[ext]',
            },
        },
    },
    assetsInclude: ['public/img/**', 'js/sw.js', 'public/manifest.json'],
})

