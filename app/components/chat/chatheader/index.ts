import ChatAPI from '../../../modules/api/chat-api.ts';
import Block from '../../../modules/block.ts';
import Helpers from '../../../utils/helpers.ts';
import Form from '../../form/index.ts';
import Modal from '../../modal/index.ts';
import Universal from '../../universal/index.ts';
import template from './template.ts';

const chatApi = new ChatAPI();

export default class ChatHeader extends Block {
    /* MODAL WINDOW */
    divChatName = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputChatName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'userId',
            id: 'name_chat',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required'],
    });

    сhatName = new Universal('label', {
        children: ['Введите ID пользователя', this.inputChatName, this.divChatName],
        attrib: { class: 'form__label' },
    });

    chanNameButton = new Universal('button', {
        children: 'Сохранить',
        attrib: { class: 'form-button' },
    });

    modalAddUser = new Form({
        children: [this.сhatName, this.chanNameButton],
        formElements: [this.inputChatName],
        afterSubmit: (ev: any, valid: boolean, data: any = {}) => {
            Helpers.Log('INFO', `Form is ${valid ? '' : 'NOT '}valid. Form data:`, data);
            if (valid) {
                const chatId = +this.Props.chatId;
                const userId = +data.userId;
                try {
                    const data = {
                        users: [userId],
                        chatId: chatId,
                    };

                    chatApi.addusers(data).then(
                        () => {
                            this.Props.updateCallback();
                            this.modal.hide();
                        },
                        () => {
                            this.divChatName.setProps({
                                children:
                                    'Ошибка добавления пользователя. Возможно ID введён неверно.',
                            });
                        }
                    );
                } catch (error) {
                    // Логика обработки ошибок
                    // TODO: Логирование ошибок
                    this.divChatName.setProps({
                        children: `${error}`,
                    });
                }
            }
            ev.preventDefault();
        },
    });

    modal = new Modal({
        children: this.modalAddUser,
    });

    /* MODAL WINDOW */

    adduser = new Universal('li', {
        children: new Universal('a', {
            children: new Universal('div', {
                children: [
                    new Universal('img', {
                        attrib: { src: '/images/adduser.svg', class: 'chat-menu-item__image' },
                    }),
                    new Universal('span', {
                        children: 'Добавить пользователя',
                        class: 'chat-menu-item__label',
                    }),
                ],
            }),
            attrib: {
                href: '#',
                class: 'chat-menu__link',
            },
            events: {
                click: (ev: Event) => {
                    this.menu.toggle();
                    this.modal.show();
                    ev.preventDefault();
                },
            },
        }),
    });

    menu = new Universal('div', {
        children: new Universal('ul', {
            children: [this.adduser],
            attrib: { class: 'chat-menu-ul' },
        }),
        attrib: { class: 'chat-menu' },
    });

    imgmenu = new Universal('a', {
        children: new Universal('img', {
            attrib: {
                src: '/images/dotted.svg',
                alt: 'Меню чата',
            },
        }),
        attrib: {
            href: '#',
        },
        events: {
            click: (ev: Event) => {
                this.menu.toggle();
                ev.preventDefault();
            },
        },
    });

    constructor(props: any = {}) {
        const initObj = {
            attrib: { class: 'content-chat-header' },
            avatar: '/images/defphoto.svg',
        };
        super('div', { ...initObj, ...props });

        this.setProps({ modal: this.modal, imgmenu: this.imgmenu, popup: this.menu });
        this.menu.hide();
        this.modal.hide();
    }

    render(): any {
        super.render();
        return this.compile(template, this.Props);
    }
}
