import { defineConfig } from 'vite';
import sass from 'sass';
import path from 'path';
import handlebars from './vite-plugin-handlebars-precompile.ts';

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
    plugins: [handlebars()],
});
