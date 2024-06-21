import Universal from '../../components/universal/index.ts';
import Form from '../../components/form/index.ts';
import Helpers from '../../utils/helpers.ts';
import Block from '../../modules/block.ts';
import Modal from '../../components/modal/index.ts';
import AuthAPI from '../../modules/api/auth-api.ts';
import Router from '../../modules/router.ts';
import { TError } from '../../shared/types/error.ts';

const authApi = new AuthAPI();

export default class LoginFormPage extends Block {
    // LOGIN
    divLogin = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputLogin = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'login',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required', 'login'],
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

    button = new Universal('button', {
        children: 'Авторизоваться',
        attrib: { class: 'form-button' },
    });

    waiter = new Universal('div', {
        children: 'Ждите ...',
        attrib: { class: 'waiter' },
    });

    errorMessage = new Universal('div', {
        children: 'Error message',
        attrib: { class: 'error-message' },
    });

    link = new Universal('a', {
        children: 'Нет аккаунта?',
        attrib: {
            href: '/sign-up',
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
                children: [this.errorMessage, this.button, this.waiter, this.link],
            }),
        ],
        attrib: {
            class: 'login-box',
        },
    });

    modal = new Modal({
        children: '',
    });

    props = {
        children: [
            this.modal,
            new Form({
                children: this.loginBox,
                formElements: [this.inputLogin, this.inputPassword],
                afterSubmit: (ev: any, valid: boolean, data: any = {}) => {
                    Helpers.Log('INFO', `Form is ${valid ? '' : 'NOT '}valid. Form data:`, data);

                    if (valid) {
                        try {
                            this.button.hide();
                            this.waiter.show();
                            this.errorMessage.hide();

                            authApi.signin(data).then(
                                () => {
                                    Router.instance.go('/messenger');
                                },
                                (error: any) => {
                                    this.button.show();
                                    this.errorMessage.show();
                                    this.waiter.hide();
                                    const reason: TError = JSON.parse(error.response) as TError;
                                    this.errorMessage.setProps({ children: reason.reason });
                                }
                            );
                        } catch (error) {
                            // Логика обработки ошибок
                            // TODO: Логирование ошибок
                            Router.instance.go('/error500');
                        }
                    }

                    ev.preventDefault();
                },
            }),
        ],
    };

    constructor(props: any = {}) {
        super('main', props);
        Helpers.SetDocumentTitle('Авторизация');
        this.setProps(this.props);
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }

    afterInit(): void {
        this.button.show();
        this.waiter.hide();
        this.errorMessage.hide();
        this.modal.hide();

        authApi.isAuth().then((auth: boolean) => {
            if (auth) Router.instance.go('/messenger');
        });
    }
}
