import { defineConfig, mergeConfig } from 'vite';
import configDev from './config.dev.mjs';

export default defineConfig(mergeConfig(configDev, {
    server: {
        port: 80,
        host: true
    }
}));
