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
                chat_chat: path.resolve(__dirname, "./app/chat_chat.html"),
                error500: path.resolve(__dirname, "./app/error500.html"),
                error404: path.resolve(__dirname, "./app/error404.html"),
                profile: path.resolve(__dirname, "./app/profile.html"),
                profileedit: path.resolve(__dirname, "./app/profileedit.html"),
                profilepassword: path.resolve(__dirname, "./app/profilepassword.html"),
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
            login_page: 'Страница авторизации',
            login_error_page: 'Страница авторизации (с ошибкой)',
            reg_page: 'Страница регистрации',
            chat_list_page: 'Страница со списком чатов',
            chat_chat_page: 'Страница с чатом',
            error_500_page: 'Страница 500',
            error_404_page: 'Страница 404',
            profile_page: 'Профиль',
            profile_edit_page: 'Профиль / изменение данных',
            profile_password_page: 'Профиль / изменение пароля',

            login_page_title: 'Вход',
            login_reg_link: 'Нет аккаунта?',

            reg_page_title: 'Регистрация',
            reg_login_link: 'Войти',

            chat_list: 'Выберите чат чтобы отправить сообщение',

            error_404_description: 'Не туда попали',
            error_404_link: 'Назад к чатам',

            error_500_description: 'Мы уже фиксим',
            error_500_link: 'Назад к чатам',

            edit_data: 'Изменить данные',
            edit_password: 'Изменить пароль',

            exit: 'Выйти'
        },
    })]
});
