import { renderDom } from '../../utils/render-dom';

import Universal from '../../components/universal';
import Form from '../../components/form';

export default class LoginFormPage {
    // LOGIN
    divLogin = new Universal('div', { attrib: { class: 'form-input-error' } });
    inputLogin = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'login',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required'],
    });
    login = new Universal('label', {
        children: ['Логин', this.inputLogin, this.divLogin],
        attrib: { class: 'form__label' },
    });

    // PASSWORD
    divPassword = new Universal('div', { attrib: { class: 'form-input-error' } });
    inputPassword = new Universal('input', {
        attrib: {
            type: 'password',
            name: 'password',
            class: 'form-password__input',
            value: '',
        },
        validate: ['required'],
    });
    password = new Universal('label', {
        children: ['Пароль', this.inputPassword, this.divPassword],
        attrib: { class: 'form__label' },
    });

    button = new Universal('button', { children: 'Авторизоваться', attrib: { class: 'form-button' } });
    link = new Universal('a', {
        children: 'Нет аккаунта?',
        attrib: {
            href: '/reg.html',
            class: 'form__link link text-center mt14',
        },
    });

    loginBox = new Universal('div', {
        children: [
            new Universal('div', {
                children: [
                    new Universal('div', {
                        children: 'Вход',
                        attrib: {
                            class: 'login-title',
                        },
                    }),
                    this.login,
                    this.password,
                ],
            }),
            new Universal('div', {
                children: [this.button, this.link],
            }),
        ],
        attrib: {
            class: 'login-box',
        },
    });

    main = new Universal('main', {
        children: new Form({
            children: this.loginBox,
            formElements: [this.inputLogin, this.inputPassword],
            submit: (ev: any, valid: boolean, data: any = {}) => {
                console.info(`Form is ${valid ? '' : 'NOT'} valid. Form data:`, data);
                ev.preventDefault();
            },
        }),
    });

    constructor(selector: string) {
        document.title = 'Авторизация';
        renderDom(selector, this.main);
    }
}

/*
// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    lili.setProps({
        children: '999000999',
        aaa: 111,
        bbb: 222,
    });
}, 3000);
*/
