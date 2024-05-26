import { defineConfig } from 'vite';
import sass from 'sass';
import path from 'path';

export default defineConfig({
    base: './',
    root: path.resolve(__dirname, './app'),
    build: {
        outDir: path.resolve(__dirname, './dist'),
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
    server: {
        port: 3000,
    },
});
