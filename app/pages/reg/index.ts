import renderDom from '../../utils/render-dom.ts';

import Universal from '../../components/universal/index.ts';
import Form from '../../components/form/index.ts';
import Helpers from '../../utils/helpers.ts';

export default class RegPage {
    // LOGIN
    divEmail = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputEmail = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'email',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required', 'email'],
    });

    email = new Universal('label', {
        children: ['Email', this.inputEmail, this.divEmail],
        attrib: { class: 'form__label' },
    });

    // login
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

    // firstName
    divFirstName = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputFirstName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'first_name',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required'],
    });

    firstName = new Universal('label', {
        children: ['Имя', this.inputFirstName, this.divFirstName],
        attrib: { class: 'form__label' },
    });

    // secondName
    divSecondName = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputSecondName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'second_name',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required'],
    });

    secondName = new Universal('label', {
        children: ['Фамилия', this.inputSecondName, this.divSecondName],
        attrib: { class: 'form__label' },
    });

    // phone
    divPhone = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputPhone = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'phone',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required'],
    });

    phone = new Universal('label', {
        children: ['Телефон', this.inputPhone, this.divPhone],
        attrib: { class: 'form__label' },
    });

    // password
    divPassword = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputPassword = new Universal('input', {
        attrib: {
            type: 'password',
            name: 'password',
            class: 'form-password__input',
            value: '',
        },
        validate: ['required', 'password:password_again'],
    });

    password = new Universal('label', {
        children: ['Пароль', this.inputPassword, this.divPassword],
        attrib: { class: 'form__label' },
    });

    // passwordAgain
    divPasswordAgain = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputPasswordAgain = new Universal('input', {
        attrib: {
            type: 'password',
            name: 'password_again',
            class: 'form-password__input',
            value: '',
        },
        validate: ['required', 'password:password'],
    });

    passwordAgain = new Universal('label', {
        children: ['Пароль', this.inputPasswordAgain, this.divPasswordAgain],
        attrib: { class: 'form__label' },
    });

    button = new Universal('button', {
        children: 'Зарегистрироваться',
        attrib: { class: 'form-button' },
    });

    link = new Universal('a', {
        children: 'Войти',
        attrib: {
            href: '/loginform.html',
            class: 'form__link link text-center mt14',
        },
    });

    regBox = new Universal('div', {
        children: [
            new Universal('div', {
                children: [
                    new Universal('div', {
                        children: 'Регистрация',
                        attrib: {
                            class: 'reg-title',
                        },
                    }),
                    this.email,
                    this.login,
                    this.firstName,
                    this.secondName,
                    this.phone,
                    this.password,
                    this.passwordAgain,
                ],
            }),
            new Universal('div', {
                children: [this.button, this.link],
            }),
        ],
        attrib: {
            class: 'reg-box',
        },
    });

    main = new Universal('main', {
        children: new Form({
            children: this.regBox,
            formElements: [
                this.inputEmail,
                this.inputLogin,
                this.inputFirstName,
                this.inputSecondName,
                this.inputPhone,
                this.inputPassword,
                this.inputPasswordAgain,
            ],
            submit: (ev: any, valid: boolean, data: any = {}) => {
                Helpers.Log('INFO', `Form is${valid ? '' : ' NOT'} valid. Form data:`, data);
                ev.preventDefault();
            },
        }),
    });

    constructor(selector: string) {
        Helpers.SetDocumentTitle('Регистрация');
        renderDom(selector, this.main);
    }
}
