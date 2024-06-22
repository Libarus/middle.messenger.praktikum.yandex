import Universal from '../../components/universal/index.ts';
import ProfileItem from '../../components/profileitem/index.ts';
import Form from '../../components/form/index.ts';
import Helpers from '../../utils/helpers.ts';
import Block from '../../modules/block.ts';
import AuthAPI from '../../modules/api/auth-api.ts';
import { TUser } from '../../shared/types/user.ts';
import Router from '../../modules/router.ts';
import UserAPI from '../../modules/api/user-api.ts';
import { TError } from '../../shared/types/error.ts';

const authApi = new AuthAPI();
const userApi = new UserAPI();

export default class ProfileEditPage extends Block {
    divEmail = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputEmail = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'email',
            class: 'profile-item__input',
            value: '',
        },
        validate: ['required', 'email'],
    });

    divLogin = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputLogin = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'login',
            class: 'profile-item__input',
            value: '',
        },
        validate: ['required', 'login'],
    });

    divFirstName = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputFirstName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'first_name',
            class: 'profile-item__input',
            value: '',
        },
        validate: ['required', 'capitalize', 'username'],
    });

    divSecondName = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputSecondName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'second_name',
            class: 'profile-item__input',
            value: '',
        },
        validate: ['required', 'capitalize', 'username'],
    });

    divDisplayName = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputDisplayName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'display_name',
            class: 'profile-item__input',
            value: '',
        },
        validate: ['required', 'username'],
    });

    divPhone = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputPhone = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'phone',
            class: 'profile-item__input',
            value: '',
        },
        validate: ['required', 'phone'],
    });

    errorMessage = new Universal('div', {
        children: 'Error message',
        attrib: { class: 'error-message' },
    });

    successMessage = new Universal('div', {
        children: 'Success message',
        attrib: { class: 'success-message' },
    });

    profileItems = [
        new ProfileItem({ title: 'Почта', children: [this.inputEmail, this.divEmail] }),
        new ProfileItem({ title: 'Логин', children: [this.inputLogin, this.divLogin] }),
        new ProfileItem({ title: 'Имя', children: [this.inputFirstName, this.divFirstName] }),
        new ProfileItem({ title: 'Фамилия', children: [this.inputSecondName, this.divSecondName] }),
        new ProfileItem({
            title: 'Имя в чате',
            children: [this.inputDisplayName, this.divDisplayName],
        }),
        new ProfileItem({ title: 'Телефон', children: [this.inputPhone, this.divPhone] }),
    ];

    profileClose = new Universal('a', {
        children: new Universal('img', {
            attrib: { src: '/images/close.svg', alt: 'Закрыть редактирование данных пользователя' },
        }),
        attrib: { href: '/messenger', class: 'profile-close__button' },
    });

    formAvatar = new Universal('form', {
        children: [
            new Universal('input', {
                attrib: {
                    type: 'file',
                    id: 'avatar',
                    name: 'avatar',
                    accept: 'image/*',
                    class: 'hidden',
                },
                events: {
                    change: (ev: Event) => {
                        if (ev.target !== null) {
                            // выбор был
                            document.getElementById('avatarFormSubmitButton')?.click();
                        }
                        ev.preventDefault();
                    },
                },
            }),
            new Universal('button', {
                children: 'Отправить',
                attrib: { id: 'avatarFormSubmitButton', type: 'submit', class: 'hidden' },
            }),
        ],
        attrib: {
            id: 'avatarForm',
            method: 'post',
            enctype: 'multipart/form-data',
        },
        events: {
            submit: (ev: Event) => {
                ev.preventDefault();

                const formAva: any = document.getElementById('avatarForm');
                userApi.updateavatar(new FormData(formAva)).then(
                    (response: any) => {
                        this.p_updUserData(response.response);
                    },
                    (err) => Helpers.Log('ERROR', err)
                );
            },
        },
    });

    avaPhoto = new Universal('img', {
        attrib: {
            src: '/images/defphoto.svg',
            class: 'profile-photo__image',
            alt: 'Аватар пользователя',
        },
    });

    profilePhoto = [
        this.avaPhoto,
        new Universal('div', {
            children: 'Изменить',
            attrib: { class: 'profile-photo-link__label' },
        }),
    ];

    profileActionChildren = new Universal('button', {
        children: 'Сохранить',
        attrib: { type: 'submit', class: 'form-button' },
    });

    form = new Form({
        children: [
            new Universal('div', {
                children: this.profileItems,
                attrib: { class: 'profile-items' },
            }),
            new Universal('div', {
                children: [this.errorMessage, this.successMessage, this.profileActionChildren],
                attrib: { class: 'profile-action profile-action__padding' },
            }),
        ],
        formElements: [
            this.inputEmail,
            this.inputLogin,
            this.inputFirstName,
            this.inputSecondName,
            this.inputDisplayName,
            this.inputPhone,
        ],
        afterSubmit: (ev: any, valid: boolean, data: any = {}) => {
            Helpers.Log('INFO', `Form is ${valid ? '' : 'NOT'} valid. Form data:`, data);
            if (valid) {
                try {
                    this.errorMessage.hide();
                    this.successMessage.hide();
                    userApi.updateuser(data).then(
                        (response: any) => {
                            this.p_updUserData(response.response);

                            this.successMessage.show();
                            this.successMessage.setProps({
                                children: 'Данные сохранены',
                            });
                        },
                        (error: any) => {
                            this.errorMessage.show();

                            try {
                                const reason: TError = JSON.parse(error.response) as TError;
                                this.errorMessage.setProps({
                                    children: reason.reason,
                                });
                            } catch (err) {
                                Helpers.Log(
                                    'ERROR',
                                    `[profileedit.afterSubmit] Ошибка преобразования
                                    в JSON строки: ${error.response}`
                                );
                            }
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
    });

    props = {
        children: new Universal('div', {
            children: [
                this.formAvatar,
                new Universal('div', {
                    children: this.profileClose,
                    attrib: { class: 'profile-close' },
                }),
                new Universal('div', {
                    children: new Universal('div', {
                        children: this.profilePhoto,
                        attrib: { class: 'profile-photo profile-photo__offset' },
                    }),
                    attrib: {
                        class: 'profile-photo-link',
                    },
                    events: {
                        click: (ev: Event) => {
                            ev.preventDefault();
                            const avatar = document.getElementById('avatar');
                            if (avatar != null) {
                                avatar.click();
                            }
                        },
                    },
                }),
                this.form,
            ],
            attrib: {
                class: 'profile-box',
            },
        }),
    };

    constructor(props = {}) {
        super('main', props);
        Helpers.SetDocumentTitle('Редактирование профиля');
        this.setProps(this.props);
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }

    async p_updateUserData(user: TUser): Promise<void> {
        function setEmpty(value: unknown): string {
            return value == null ? '' : (value as string);
        }

        this.inputEmail.setProps({ attrib: { value: setEmpty(user.email) } });
        this.inputLogin.setProps({ attrib: { value: setEmpty(user.login) } });
        this.inputFirstName.setProps({ attrib: { value: setEmpty(user.first_name) } });
        this.inputSecondName.setProps({ attrib: { value: setEmpty(user.second_name) } });
        this.inputDisplayName.setProps({ attrib: { value: setEmpty(user.display_name) } });
        this.inputPhone.setProps({ attrib: { value: setEmpty(user.phone) } });

        if (setEmpty(user.avatar) !== '') {
            const src = `https://ya-praktikum.tech/api/v2/resources${setEmpty(user.avatar)}`;
            this.avaPhoto.setProps({ attrib: { src } });
        }
    }

    async afterInit(): Promise<unknown> {
        this.errorMessage.hide();
        this.successMessage.hide();

        authApi.getuser().then(
            (user: TUser) => {
                this.p_updateUserData(user);
            },
            () => Router.instance.go('/')
        );

        return false;
    }

    private p_updUserData(strUserData: string): void {
        let dataUser: TUser | null = null;

        try {
            dataUser = JSON.parse(strUserData) as TUser;
        } catch (err) {
            Helpers.Log(
                'ERROR',
                `[profileedit.p_updUserData] Ошибка преобразования в JSON строки: ${strUserData}`
            );
        }

        if (dataUser != null) this.p_updateUserData(dataUser);
    }
}
