import ChatAPI from '../../../modules/api/chat-api.ts';
import Block from '../../../modules/block.ts';
import { TError } from '../../../shared/types/error.ts';
import { TUser } from '../../../shared/types/user.ts';
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
                    chatApi.addusers({ users: [userId], chatId }).then(
                        () => {
                            this.Props.updateCallback();
                            this.addmodal.hide();
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

    modalRemoveUserError = new Universal('div', { attrib: { class: 'form-input-error' } });

    modalRemoveUserUl = new Universal('ul', {
        children: '',
        attrib: { class: 'remove-user-list' },
    });

    modalRemoveUser = new Universal('div', {
        children: [
            new Universal('div', {
                children: 'Выберите пользователя для удаления',
                attrib: {},
            }),
            new Universal('ul', {
                children: this.modalRemoveUserUl,
                attrib: { class: 'remove-user-list' },
            }),
            this.modalRemoveUserError,
        ],
    });

    addmodal = new Modal({
        children: this.modalAddUser,
    });

    removemodal = new Modal({
        children: this.modalRemoveUser,
    });

    /* MODAL WINDOW */

    adduser = new Universal('li', {
        children: [
            new Universal('a', {
                children: new Universal('div', {
                    children: [
                        new Universal('img', {
                            attrib: {
                                src: '/images/adduser.svg',
                                class: 'chat-menu-item__image',
                            },
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
                        this.addmodal.show();
                        ev.preventDefault();
                    },
                },
            }),
            new Universal('div', { attrib: { class: 'clear' } }),
        ],
        attrib: { class: 'chat-menu-li' },
    });

    removeuser = new Universal('li', {
        children: [
            new Universal('a', {
                children: new Universal('div', {
                    children: [
                        new Universal('img', {
                            attrib: {
                                src: '/images/removeuser.svg',
                                class: 'chat-menu-item__image',
                            },
                        }),
                        new Universal('span', {
                            children: 'Удалить пользователя',
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
                        ev.preventDefault();
                        this.menu.toggle();
                        this.removemodal.show();
                        this.modalRemoveUserError.setProps({ children: '' });
                        const chatId = +this.Props.chatId;

                        chatApi.getusers(chatId).then(
                            (resp: XMLHttpRequest) => {
                                try {
                                    const users: TUser[] = JSON.parse(resp.response) as TUser[];
                                    const userList = users.map((u: TUser): Universal => {
                                        return new Universal('li', {
                                            children: new Universal('a', {
                                                children: `${u.first_name} (ID:${u.id})`,
                                                attrib: {
                                                    href: '#',
                                                    class: 'remove-user-list-li__link',
                                                },
                                                events: {
                                                    click: (ev: Event) => {
                                                        ev.preventDefault();
                                                        this.p_removeuser(u, chatId);
                                                    },
                                                },
                                            }),
                                        });
                                    });

                                    this.modalRemoveUserUl.setProps({ children: userList });
                                } catch (err) {
                                    Helpers.Log(
                                        'ERROR',
                                        `[chatheader.removeuser] Ошибка преобразования
                                        в JSON строки: ${resp.response}`
                                    );
                                }
                            },
                            (error: any) => {
                                try {
                                    const reason: TError = JSON.parse(error.response) as TError;
                                    this.modalRemoveUserError.setProps({
                                        children: reason.reason,
                                    });
                                } catch (err) {
                                    Helpers.Log(
                                        'ERROR',
                                        `[chatheader.removeuser.error] Ошибка преобразования
                                        в JSON строки: ${error.response}`
                                    );
                                }
                            }
                        );
                    },
                },
            }),
            new Universal('div', { attrib: { class: 'clear' } }),
        ],
        attrib: { class: 'chat-menu-li' },
    });

    menu = new Universal('div', {
        children: new Universal('ul', {
            children: [this.adduser, this.removeuser],
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

    constructor(props = {}) {
        const initObj = {
            attrib: { class: 'content-chat-header' },
            avatar: '/images/defphoto.svg',
        };
        super('div', { ...initObj, ...props });

        this.setProps({
            addmodal: this.addmodal,
            removemodal: this.removemodal,
            imgmenu: this.imgmenu,
            popup: this.menu,
        });
        this.menu.hide();
        this.addmodal.hide();
        this.removemodal.hide();
    }

    render(): any {
        super.render();
        return this.compile(template, this.Props);
    }

    private p_removeuser(u: TUser, chatId: number) {
        chatApi.removeusers({ users: [u.id], chatId }).then(
            () => {
                Helpers.Alert(`Пользователь ${u.first_name} (ID:${u.id}) удалён из чата`);
                this.removemodal.hide();
            },
            () => {
                this.modalRemoveUserError.setProps({
                    children: 'Ошибка удаления пользователя. Возможно ID введён неверно.',
                });
            }
        );
    }
}
