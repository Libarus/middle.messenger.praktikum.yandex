import Universal from '../../components/universal/index.ts';
import Helpers from '../../utils/helpers.ts';
import Block from '../../modules/block.ts';
import AuthAPI from '../../modules/api/auth-api.ts';
import Router from '../../modules/router.ts';
import ChatAPI from '../../modules/api/chat-api.ts';
import { TChat, TChatItem, TChatMessage } from '../../shared/types/chat.ts';
import Modal from '../../components/modal/index.ts';
import Form from '../../components/form/index.ts';
import ChatItem from '../../components/chat/chatitem/index.ts';
import Chat from '../../components/chat/chat/index.ts';
import ChatHeader from '../../components/chat/chatheader/index.ts';
import WS from '../../modules/ws.ts';
import { TUser } from '../../shared/types/user.ts';
import { TError } from '../../shared/types/error.ts';

const authApi = new AuthAPI();
const chatApi = new ChatAPI();

export default class MessengerPage extends Block {
    //
    selectedChat: TChatItem | null = null;

    private ws: WS | null = null;

    private p_userId: number = 0;

    /* MODAL WINDOW */
    divChatName = new Universal('div', { attrib: { class: 'form-input-error' } });

    inputChatName = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'title',
            id: 'name_chat',
            class: 'form-text__input',
            value: '',
        },
        validate: ['required'],
    });

    сhatName = new Universal('label', {
        children: ['Название чата', this.inputChatName, this.divChatName],
        attrib: { class: 'form__label' },
    });

    chanNameButton = new Universal('button', {
        children: 'Сохранить',
        attrib: { class: 'form-button' },
    });

    modal = new Modal({
        children: '',
    });

    modalAddChat = new Form({
        children: [this.сhatName, this.chanNameButton],
        formElements: [this.inputChatName],
        afterSubmit: (ev: any, valid: boolean, data: any = {}) => {
            Helpers.Log('INFO', `Form is ${valid ? '' : 'NOT '}valid. Form data:`, data);
            if (valid) {
                try {
                    chatApi.createchat(data.title).then(
                        () => {
                            this.modal.hide();
                            this.p_updateChats();
                        },
                        (error: any) => {
                            try {
                                const reason: TError = JSON.parse(error.response) as TError;
                                this.divChatName.setProps({
                                    children: `${reason.reason}: "${reason.error}"`,
                                });
                            } catch (err) {
                                Helpers.Log(
                                    'ERROR',
                                    `[messenger.modalAddChat] Ошибка преобразования
                                    в JSON строки: ${error.response}`
                                );
                            }
                        }
                    );
                } catch (error) {
                    // Логика обработки ошибок
                    // TODO: Логирование ошибок
                    Helpers.Log('ERROR', error);
                    this.divChatName.setProps({
                        children: `${error}`,
                    });
                }
            }
            ev.preventDefault();
        },
    });
    /* MODAL WINDOW */

    addChatEvent = () => {
        this.modal.setProps({ children: this.modalAddChat });
        this.modal.show();
    };

    searchBlock = new Universal('div', {
        children: [
            new Universal('input', {
                attrib: { type: 'text', class: 'search-block__input', placeholder: 'Поиск' },
            }),
            new Universal('div', {
                children: new Universal('img', {
                    attrib: { src: '/images/search_btn.svg', alt: 'Поиск чата' },
                }),
                attrib: { class: 'search-block__button' },
            }),
        ],
        attrib: {
            class: 'search-block',
        },
    });

    chatListContent = new Universal('div', {
        children: 'Loading chat list ...',
        attrib: { class: 'p20' },
    });

    addChatButton = new Universal('button', {
        children: 'Добавить чат',
        attrib: { class: 'form-button', type: 'button' },
        events: { click: this.addChatEvent.bind(this) },
    });

    chats = new Universal('div', {
        children: [
            this.chatListContent,
            new Universal('div', {
                children: this.addChatButton,
                attrib: { class: 'p20' },
            }),
        ],
        attrib: { class: 'chats' },
    });

    selectChat = new Universal('div', {
        children: 'Выберите чат чтобы отправить сообщение',
        attrib: { class: 'content-text' },
    });

    chatContent = new Universal('div', {
        children: this.selectChat,
        attrib: { class: 'content' },
    });

    userAvatarImage = new Universal('img', {
        attrib: { src: '/images/defphoto.svg', class: 'header-photo__avatar' },
    });

    userAvatar = new Universal('div', {
        children: this.userAvatarImage,
        attrib: { class: 'header-photo' },
    });

    userName = new Universal('div', {
        children: 'Илья',
        attrib: { class: 'header__name' },
    });

    props = {
        children: [
            this.modal,
            new Universal('main', {
                children: [
                    new Universal('aside', {
                        children: [
                            new Universal('div', {
                                children: this.searchBlock,
                                attrib: { class: 'search' },
                            }),
                            this.chats,
                        ],
                        attrib: {
                            class: 'aside',
                        },
                    }),
                    new Universal('section', {
                        children: [
                            new Universal('div', {
                                children: [
                                    new Universal('div', {
                                        children: new Universal('a', {
                                            children: new Universal('img', {
                                                attrib: {
                                                    src: '/images/cog.svg',
                                                    class: 'header-profile__icon',
                                                    alt: 'Профиль пользователя',
                                                },
                                            }),
                                            attrib: {
                                                href: '/settings',
                                            },
                                        }),
                                        attrib: { class: 'header-profile' },
                                    }),
                                    new Universal('a', {
                                        children: this.userAvatar,
                                        attrib: { href: '/profile', class: 'invisible-link' },
                                    }),
                                    this.userName,
                                ],
                                attrib: { class: 'header' },
                            }),
                            this.chatContent,
                        ],
                        attrib: {
                            class: 'section',
                        },
                    }),
                ],
                attrib: {
                    class: 'main',
                },
            }),
        ],
    };

    message = new Universal('input', {
        attrib: {
            type: 'text',
            name: 'content',
            class: 'content-chat-action-message__input',
            value: '',
            placeholder: 'Сообщение',
        },
        validate: ['required'],
    });

    typemessage = new Universal('input', {
        attrib: {
            type: 'hidden',
            name: 'type',
            value: 'message',
        },
    });

    sendMessageForm = new Form({
        children: new Universal('div', {
            children: [
                new Universal('div', {
                    children: new Universal('div', {
                        children: new Universal('img', {
                            attrib: { src: '/images/skrepka.svg', alt: 'Вложить объект' },
                        }),
                        attrib: { class: 'content-chat-action-upload__button' },
                    }),
                    attrib: { class: 'content-chat-action-upload' },
                }),
                new Universal('div', {
                    children: [this.message, this.typemessage],
                    attrib: { class: 'content-chat-action-message' },
                }),
                new Universal('div', {
                    children: new Universal('button', {
                        children: new Universal('img', {
                            attrib: {
                                src: '/images/arrow.svg',
                                class: 'content-chat-action-send__image',
                                alt: 'Отправить сообщение',
                            },
                        }),
                        attrib: { type: 'submit', class: 'content-chat-action-send__button' },
                    }),
                    attrib: { class: 'content-chat-action-send' },
                }),
            ],
            attrib: { class: 'content-chat-action' },
        }),
        formElements: [this.message, this.typemessage],
        afterSubmit: (ev: any, valid: boolean, data: any = {}) => {
            Helpers.Log('INFO', `Form is${valid ? '' : ' NOT'} valid. Form data:`, data);
            this.ws?.send(JSON.stringify(data));
            this.sendMessageForm.reset();
            ev.preventDefault();
        },
        attrib: { id: 'message_form_send' },
    });

    chat = new Chat({
        children: 'Loading messages ... ',
        attrib: { class: 'content-text' },
    });

    chatHeader = new ChatHeader({
        name: 'Вадим',
        chatId: this.Params.id,
        updateCallback: () => {
            this.p_updateChats();
        },
    });

    content = new Universal('div', {
        children: [this.chatHeader, this.chat, this.sendMessageForm],
        attrib: { class: 'content-chat' },
    });

    constructor(props = {}) {
        super('main', props);
        Helpers.SetDocumentTitle('Чат');
        this.setProps(this.props);
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }

    afterInit(): void {
        if (this.Params.id) {
            this.chatHeader.setProps({ chatId: this.Params.id });
        }

        this.chatContent.setProps({ children: this.selectChat, attrib: { class: 'content' } });

        this.modal.hide();

        authApi.getuser().then(
            (user: TUser) => {
                this.userName.setProps({ children: user.display_name ?? user.first_name });
                if (user.avatar !== '' && user.avatar !== null) {
                    const src: string = `https://ya-praktikum.tech/api/v2/resources${user.avatar}`;
                    this.userAvatarImage.setProps({
                        attrib: { src },
                    });
                }
                this.p_updateChats();
            },
            () => Router.instance.go('/')
        );
    }

    p_updateChats(isUpdMessages: boolean = true) {
        const paramId: number = this.Params.id != null ? Number(this.Params.id) : -1;
        this.chatListContent.setProps({ children: 'Loading chat list ...' });

        chatApi.getchats().then((value: any) => {
            let chatList: TChat[] = [];

            try {
                chatList = JSON.parse(value.response) as TChat[];
            } catch (err) {
                Helpers.Log(
                    'ERROR',
                    `[messenger.p_updateChats] Ошибка преобразования
                    в JSON строки: ${value.response}`
                );
            }

            if (chatList.length === 0) {
                this.chatListContent.setProps({ children: 'Chat list is empty' });
            } else {
                const props: any = [];

                this.selectedChat = null;
                chatList.forEach((chat: TChat) => {
                    let chatAvatar = '/images/defphoto.svg';
                    if (chat.avatar !== '' && chat.avatar !== null) {
                        chatAvatar = `https://ya-praktikum.tech/api/v2/resources${chat.avatar}`;
                    }

                    const item: TChatItem = {
                        id: chat.id,
                        name: `${chat.title}`,
                        message: '---',
                        self: false,
                        datetime: '***',
                        unread: chat.unread_count,
                        avatar: chatAvatar,
                        selected: paramId === chat.id,
                    };

                    if (paramId === chat.id) {
                        this.selectedChat = item;
                    }

                    if (chat.last_message !== null) {
                        item.message = chat.last_message.content;
                    }

                    const events = {
                        events: {
                            click: () => {
                                Router.instance.go(`/messenger/${item.id}`);
                            },
                        },
                    };

                    const prop = new ChatItem({
                        ...item,
                        ...events,
                    });
                    props.push(prop);
                });

                if (paramId > 0 && isUpdMessages) {
                    this.p_updateChatMessages(paramId);
                }

                this.chatListContent.setProps({ children: props });
            }
        });
    }

    async p_updateChatMessages(chatId: number) {
        this.chat.setProps({ children: '', attrib: { class: 'content-chat-content' } });

        this.chatContent.setProps({
            children: [this.chatHeader, this.chat, this.sendMessageForm],
            attrib: { class: 'content-chat' },
        });

        this.chatHeader.setProps({
            name: this.selectedChat?.name,
            avatar: this.selectedChat?.avatar,
        });

        const user = await authApi.getuser();
        this.p_userId = user.id;

        const token: string = await chatApi.gettoken(chatId);

        this.ws = new WS(
            `wss://ya-praktikum.tech/ws/chats/${this.p_userId}/${chatId}/${token}`,
            this.onOpen.bind(this),
            this.onMessage.bind(this),
            this.onError.bind(this),
            this.onClose.bind(this)
        );
    }

    onOpen() {
        // запрос последних 20 сообщений
        const data: any = { type: 'get old', content: '0' };
        if (this.ws !== null) this.ws.send(JSON.stringify(data));
    }

    onMessage(event: MessageEvent) {
        let parseData;

        try {
            parseData = JSON.parse(event.data);
        } catch (err) {
            Helpers.Log(
                'ERROR',
                `[messenger.onMessage] Ошибка преобразования в JSON строки: ${event.data}`
            );
        }

        if (Array.isArray(parseData)) {
            const messages: TChatMessage[] = parseData;
            this.chat.addmessages(messages.reverse(), this.p_userId);
        } else {
            const message: TChatMessage = parseData;
            this.chat.addmessage(message, this.p_userId);
            this.p_updateChats(false);
        }
    }

    onError() {}

    onClose() {}
}
