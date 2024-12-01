import { defineConfig } from 'vite';
import { rmSync } from 'fs';
import path from 'path';

const phasermsg = () => {
    return {
        name: 'phasermsg',
        buildStart() {
            process.stdout.write(`Building for production...\n`);
        },
        buildEnd() {
            const line = "---------------------------------------------------------";
            const msg = `❤️❤️❤️ Tell us about your game! - games@phaser.io ❤️❤️❤️`;
            process.stdout.write(`${line}\n${msg}\n${line}\n`);

            process.stdout.write(`✨ Done ✨\n`);
        }
    }
}

export default defineConfig({
    base: './',
    logLevel: 'warning',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                passes: 2,
                global_defs: {
                    DEBUG: false,
                    NO_FOG: false
                },
                drop_console: true,
                drop_debugger: true,
            },
            mangle: true,
            format: {
                comments: false
            },
        }
    },
    server: {
        port: 8080
    },
    plugins: [
        phasermsg(),
        {
            name: 'drop-folder-plugin',
            apply: 'build',
            writeBundle() {
                const folderToDrop = path.resolve(__dirname, '../dist/assets/sound/audio_placeholder');
                try {
                    rmSync(folderToDrop, { recursive: true, force: true });
                    console.log(`Dropped folder: ${folderToDrop}`);
                } catch (err) {
                    console.warn(`Failed to drop folder: ${folderToDrop}`, err);
                }
            },
        },
    ]
});
