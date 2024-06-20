import Universal from '../../components/universal/index.ts';
import ProfileItem from '../../components/profileitem/index.ts';
import Form from '../../components/form/index.ts';
import Helpers from '../../utils/helpers.ts';
import Block from '../../modules/block.ts';

export default class PasswordPage extends Block {
    divOldPassword = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputOldPassword = new Universal('input', {
        attrib: {
            type: 'password',
            name: 'oldPassword',
            class: 'profile-item__input',
            value: 'pochta@yandex.ru',
        },
        validate: ['required', 'password'],
    });

    divNewPassword = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputNewPassword = new Universal('input', {
        attrib: {
            type: 'password',
            name: 'newPassword',
            class: 'profile-item__input',
            value: 'ivanivanov',
        },
        validate: ['required', 'passwordmatch:newPassword_again', 'password'],
    });

    divNewPasswordAgain = new Universal('div', { attrib: { class: 'form-input-error hidden' } });

    inputNewPasswordAgain = new Universal('input', {
        attrib: {
            type: 'password',
            name: 'newPassword_again',
            class: 'profile-item__input',
            value: 'Иван',
        },
        validate: ['required', 'passwordmatch:newPassword', 'password'],
    });

    profileItems = [
        new ProfileItem({
            title: 'Старый пароль',
            children: [this.inputOldPassword, this.divOldPassword],
        }),
        new ProfileItem({
            title: 'Новый пароль',
            children: [this.inputNewPassword, this.divNewPassword],
        }),
        new ProfileItem({
            title: 'Повторите новый пароль',
            children: [this.inputNewPasswordAgain, this.divNewPasswordAgain],
        }),
    ];

    profileClose = new Universal('a', {
        children: new Universal('img', {
            attrib: { src: '/images/close.svg', alt: 'Закрыть редактирование данных пользователя' },
        }),
        attrib: { href: '/messenger', class: 'profile-close__button' },
    });

    profilePhoto = [
        new Universal('img', {
            attrib: {
                src: '/images/defphoto.svg',
                class: 'profile-photo__image',
                alt: 'Аватар пользователя',
            },
        }),
        new Universal('input', { attrib: { type: 'hidden', name: 'avatar', value: '' } }),
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
                children: this.profileActionChildren,
                attrib: { class: 'profile-action profile-action__padding' },
            }),
        ],
        formElements: [this.inputOldPassword, this.inputNewPassword, this.inputNewPasswordAgain],
        submit: (ev: any, valid: boolean, data: any = {}) => {
            Helpers.Log('INFO', `Form is${valid ? '' : ' NOT'} valid. Form data:`, data);
            ev.preventDefault();
        },
    });

    props = {
        children: new Universal('div', {
            children: [
                new Universal('div', {
                    children: this.profileClose,
                    attrib: { class: 'profile-close' },
                }),
                new Universal('div', {
                    children: this.profilePhoto,
                    attrib: { class: 'profile-photo profile-photo__offset' },
                }),
                this.form,
            ],
            attrib: {
                class: 'profile-box',
            },
        }),
    };

    constructor(props: any = {}) {
        super('main', props);
        Helpers.SetDocumentTitle('Изменение пароля');
        this.setProps(this.props);
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }
}
