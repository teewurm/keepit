import { defineConfig } from 'vite';

export default defineConfig({
    define:{
        DEBUG: false,
        NO_FOG: true
    },
    base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080,
        host: false
    }
});
