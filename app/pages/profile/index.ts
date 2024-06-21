import Universal from '../../components/universal/index.ts';
import ProfileItem from '../../components/profileitem/index.ts';
import Helpers from '../../utils/helpers.ts';
import Block from '../../modules/block.ts';
import AuthAPI from '../../modules/api/auth-api.ts';
import { TUser } from '../../shared/types/user.ts';

const authApi = new AuthAPI();

export default class ProfilePage extends Block {
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

    showUserId = new Universal('div', { children: '', attrib: { class: 'muted' } });

    profileActionChildren = [
        new Universal('a', {
            children: 'Изменить данные',
            attrib: { class: 'profile-action__link', href: '/settings' },
        }),
        new Universal('a', {
            children: 'Изменить пароль',
            attrib: { class: 'profile-action__link', href: '/password' },
        }),
        new Universal('a', {
            children: 'Выход',
            attrib: { class: 'profile-action__exit', href: '/' },
            events: {
                click: (ev: Event) => {
                    ev.preventDefault();
                    authApi.logout();
                },
            },
        }),
        new Universal('hr'),
        this.showUserId,
    ];

    profItem = new Universal('div', {
        children: '',
        attrib: { class: 'profile-items' },
    });

    userName = new Universal('div', { children: 'Иван', attrib: { class: 'profile-title' } });

    props = {
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
                this.userName,
                this.profItem,
                new Universal('div', {
                    children: this.profileActionChildren,
                    attrib: { class: 'profile-action' },
                }),
            ],
            attrib: {
                class: 'profile-box',
            },
        }),
    };

    constructor(props: any = {}) {
        super('main', props);
        Helpers.SetDocumentTitle('Профиль');
        this.setProps(this.props);
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }

    async afterInit(): Promise<unknown> {
        function setEmpty(value: unknown): string {
            return value == null ? '' : (value as string);
        }

        const user: TUser = await authApi.getuser();

        const profileItems = [
            new ProfileItem({ title: 'Почта', children: setEmpty(user.email) }),
            new ProfileItem({ title: 'Логин', children: setEmpty(user.login) }),
            new ProfileItem({ title: 'Имя', children: setEmpty(user.first_name) }),
            new ProfileItem({ title: 'Фамилия', children: setEmpty(user.second_name) }),
            new ProfileItem({ title: 'Имя в чате', children: setEmpty(user.display_name) }),
            new ProfileItem({ title: 'Телефон', children: setEmpty(user.phone) }),
        ];

        this.userName.setProps({ children: setEmpty(user.first_name) });

        this.showUserId.setProps({ children: `User ID: ${user.id}` });

        this.profItem.setProps({ children: profileItems });

        if (setEmpty(user.avatar) !== '') {
            const src = `https://ya-praktikum.tech/api/v2/resources${setEmpty(user.avatar)}`;
            this.profilePhoto.setProps({ attrib: { src } });
        }

        return false;
    }
}
