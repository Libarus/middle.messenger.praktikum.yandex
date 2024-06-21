import Universal from '../../components/universal/index.ts';
import Form from '../../components/form/index.ts';
import Helpers from '../../utils/helpers.ts';
import Block from '../../modules/block.ts';
import { TSignUpRequest, TUser } from '../../shared/types/user.ts';
import AuthAPI from '../../modules/api/auth-api.ts';
import Router from '../../modules/router.ts';
import Modal from '../../components/modal/index.ts';
import { TError } from '../../shared/types/error.ts';

const authApi = new AuthAPI();

export default class RegPage extends Block {
    // LOGIN
    divEmail = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

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
    divLogin = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

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

    // firstName
    divFirstName = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputFirstName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'first_name',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required', 'capitalize', 'username'],
    });

    firstName = new Universal('label', {
        children: ['Имя', this.inputFirstName, this.divFirstName],
        attrib: { class: 'form__label' },
    });

    // secondName
    divSecondName = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputSecondName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'second_name',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required', 'capitalize', 'username'],
    });

    secondName = new Universal('label', {
        children: ['Фамилия', this.inputSecondName, this.divSecondName],
        attrib: { class: 'form__label' },
    });

    // phone
    divPhone = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputPhone = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'phone',
            class: 'form-text__input',
            value: ``,
        },
        validate: ['required', 'phone'],
    });

    phone = new Universal('label', {
        children: ['Телефон', this.inputPhone, this.divPhone],
        attrib: { class: 'form__label' },
    });

    // password
    divPassword = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputPassword = new Universal('input', {
        attrib: {
            type: 'password',
            name: 'password',
            class: 'form-password__input',
            value: '',
        },
        validate: ['required', 'passwordmatch:password_again', 'password'],
    });

    password = new Universal('label', {
        children: ['Пароль', this.inputPassword, this.divPassword],
        attrib: { class: 'form__label' },
    });

    // passwordAgain
    divPasswordAgain = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputPasswordAgain = new Universal('input', {
        attrib: {
            type: 'password',
            name: 'password_again',
            class: 'form-password__input',
            value: '',
        },
        validate: ['required', 'passwordmatch:password', 'password'],
    });

    passwordAgain = new Universal('label', {
        children: ['Пароль', this.inputPasswordAgain, this.divPasswordAgain],
        attrib: { class: 'form__label' },
    });

    button = new Universal('button', {
        children: 'Зарегистрироваться',
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
        children: 'Войти',
        attrib: {
            href: '/',
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
                children: [this.errorMessage, this.button, this.waiter, this.link],
            }),
        ],
        attrib: {
            class: 'reg-box',
        },
    });

    modal = new Modal({
        children: '',
    });

    props = {
        children: [
            this.modal,
            new Form({
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
                afterSubmit: (ev: any, valid: boolean, data: TSignUpRequest) => {
                    Helpers.Log('INFO', `Form is${valid ? '' : ' NOT'} valid. Form data:`, data);
                    if (valid) {
                        try {
                            this.button.hide();
                            this.waiter.show();

                            authApi.signup(data).then(
                                (response: any) => {
                                    const personData: TUser = JSON.parse(response.response);

                                    this.modal.setProps({
                                        children: [
                                            new Universal('div', {
                                                children: `Спасибо за регистрацию!
                                                           Ваш ID: ${personData.id}`,
                                            }),
                                            new Universal('a', {
                                                children: 'Войти всистему',
                                                attrib: { href: '/' },
                                            }),
                                        ],
                                    });

                                    this.waiter.hide();
                                    this.modal.show();
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
        Helpers.SetDocumentTitle('Регистрация');
        this.setProps(this.props);
        this.waiter.hide();
        this.errorMessage.hide();
        this.modal.hide();
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }
}
