import renderDom from '../../utils/render-dom.ts';

import Universal from '../../components/universal/index.ts';
import ProfileItem from '../../components/profileitem/index.ts';
import Helpers from '../../utils/helpers.ts';

export default class ProfilePage {
    profileItems = [
        new ProfileItem({ title: 'Почта', children: 'pochta@yandex.ru' }),
        new ProfileItem({ title: 'Логин', children: 'ivanivanov' }),
        new ProfileItem({ title: 'Имя', children: 'Иван' }),
        new ProfileItem({ title: 'Фамилия', children: 'Иванов' }),
        new ProfileItem({ title: 'Имя в чате', children: 'Иван' }),
        new ProfileItem({ title: 'Телефон', children: '+7 (909) 967 30 30' }),
    ];

    profileClose = new Universal('a', {
        children: new Universal('img', {
            attrib: { src: '/images/close.svg', alt: 'Закрыть профиль пользователя' },
        }),
        attrib: { href: '/', class: 'profile-close__button' },
    });

    profilePhoto = new Universal('img', {
        attrib: {
            src: '/images/defphoto.svg',
            class: 'profile-photo__image',
            alt: 'Аватар пользователя',
        },
    });

    profileActionChildren = [
        new Universal('a', {
            children: 'Изменить данные',
            attrib: { class: 'profile-action__link', href: '/profileedit.html' },
        }),
        new Universal('a', {
            children: 'Изменить пароль',
            attrib: { class: 'profile-action__link', href: '/password.html' },
        }),
        new Universal('a', {
            children: 'Выход',
            attrib: { class: 'profile-action__exit', href: '/' },
        }),
    ];

    main = new Universal('main', {
        children: new Universal('div', {
            children: [
                new Universal('div', {
                    children: this.profileClose,
                    attrib: { class: 'profile-close' },
                }),
                new Universal('div', {
                    children: this.profilePhoto,
                    attrib: { class: 'profile-photo' },
                }),
                new Universal('div', { children: 'Иван', attrib: { class: 'profile-title' } }),
                new Universal('div', {
                    children: this.profileItems,
                    attrib: { class: 'profile-items' },
                }),
                new Universal('div', {
                    children: this.profileActionChildren,
                    attrib: { class: 'profile-action' },
                }),
            ],
            attrib: {
                class: 'profile-box',
            },
        }),
    });

    constructor(selector: string) {
        Helpers.SetDocumentTitle('Профиль');
        renderDom(selector, this.main);
    }
}
