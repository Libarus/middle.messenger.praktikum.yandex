import Universal from '../../components/universal/index.ts';
import { TNav } from '../../shared/types/tnav.ts';
import Block from '../../modules/block.ts';

const navList: TNav[] = [
    { link: 'loginform.html', title: 'Страница авторизации' },
    { link: 'reg.html', title: 'Страница регистрации' },
    { link: 'chatlist.html', title: 'Страница со списком чатов' },
    { link: 'chatchat.html', title: 'Страница с чатом' },
    { link: 'profile.html', title: 'Профиль' },
    { link: 'profileedit.html', title: 'Профиль / изменение данных' },
    { link: 'password.html', title: 'Профиль / изменение пароля' },
    { link: 'error500.html', title: 'Страница 500' },
    { link: 'error404.html', title: 'Страница 404' },
];

export default class IndexPage extends Block {
    props = {
        children: new Universal('nav', {
            children: [
                new Universal('h1', { children: 'Навигация по свёрстанным страницам:' }),
                new Universal('ul', {
                    children: navList.map(
                        (item: TNav) =>
                            new Universal('li', {
                                children: new Universal('a', {
                                    children: item.title,
                                    attrib: { href: item.link, class: 'nav-list-item__link' },
                                }),
                                attrib: { class: 'nav-list-item' },
                            })
                    ),

                    attrib: { class: 'nav-list' },
                }),
            ],
            attrib: {
                class: 'nav',
            },
        }),
    };

    constructor(props: any = {}) {
        const attrib = {
            attrib: {
                class: 'p20',
            },
        };
        super('main', { ...props, ...attrib });

        this.setProps(this.props);
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }
}
