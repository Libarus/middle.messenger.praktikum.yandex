import { defineConfig } from 'vite';
import sass from 'sass';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    base: './',
    root: path.resolve(__dirname, './app'),
    build: {
        outDir: path.resolve(__dirname, './dist'),
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "./app/index.html"),
                login: path.resolve(__dirname, "./app/login.html"),
                login_error: path.resolve(__dirname, "./app/login_error.html"),
                reg: path.resolve(__dirname, "./app/reg.html"),
                chat_list: path.resolve(__dirname, "./app/chat_list.html"),
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass
            }
        }
    },
    server: {
        port: 3000,
    },
    plugins: [handlebars({
        partialDirectory: path.resolve(__dirname, './app/components'),
        context: {
            login_page: 'Страница входа',
            login_error_page: 'Страница входа (с ошибкой)',
            reg_page: 'Регистрация',
            chat_list_page: 'Список чатов',

            login_page_title: 'Вход',
            login_reg_link: 'Нет аккаунта?',

            reg_page_title: 'Регистрация',
            reg_login_link: 'Войти',

            chat_list: 'Выберите чат чтобы отправить сообщение'
        },
    })]
});