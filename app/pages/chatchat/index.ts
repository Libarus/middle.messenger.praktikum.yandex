import { renderDom } from "../../utils/render-dom";

import Universal from "../../components/universal";
import HTTP from "../../modules/http";
import ChatItem from "../../components/chat/chatitem";
import ChatHeader from "../../components/chat/chatheader";
import Form from "../../components/form";
import Chat from "../../components/chat/chat";
import { IChatItem } from "../../shared/interfaces/ichatitem";
import { IMessages } from "../../shared/interfaces/imessages";

export default class ChatChatPage {
    searchBlock = new Universal("div", {
        children: [
            new Universal("input", { attrib: { type: "text", class: "search-block__input", placeholder: "Поиск" } }),
            new Universal("div", {
                children: new Universal("img", { attrib: { src: "/search_btn.svg", alt: "Поиск чата" } }),
                attrib: { class: "search-block__button" },
            }),
        ],
        attrib: {
            class: "search-block",
        },
    });

    chats = new Universal("div", {
        children: new Universal("div", { children: "Loading chats ...", attrib: { class: "p20" } }),
        attrib: { class: "chats" },
    });

    message = new Universal("input", {
        attrib: {
            type: "text",
            name: "message",
            class: "content-chat-action-message__input",
            value: "",
            placeholder: "Сообщение",
        },
        validate: ["required"],
    });

    form = new Form({
        children: new Universal("div", {
            children: [
                new Universal("div", {
                    children: new Universal("div", {
                        children: new Universal("img", { attrib: { src: "/skrepka.svg", alt: "Вложить объект" } }),
                        attrib: { class: "content-chat-action-upload__button" },
                    }),
                    attrib: { class: "content-chat-action-upload" },
                }),
                new Universal("div", {
                    children: this.message,
                    attrib: { class: "content-chat-action-message" },
                }),
                new Universal("div", {
                    children: new Universal("button", {
                        children: new Universal("img", {
                            attrib: { src: "/arrow.svg", class: "content-chat-action-send__image", alt: "Отправить сообщение" },
                        }),
                        attrib: { type: "submit", class: "content-chat-action-send__button" },
                    }),
                    attrib: { class: "content-chat-action-send" },
                }),
            ],
            attrib: { class: "content-chat-action" },
        }),
        formElements: [this.message],
        submit: (ev: any, valid: boolean, data: any = {}) => {
            console.info(`Form is${valid ? "" : " NOT"} valid. Form data:`, data);
            ev.preventDefault();
        },
        attrib: { id: "message_form_send" },
    });

    chat = new Chat({ attrib: { class: "content-chat-content" } });

    content = new Universal("div", {
        children: [new ChatHeader({ name: "Вадим" }), this.chat, this.form],
        attrib: { class: "content-chat" },
    });

    main = new Universal("main", {
        children: [
            new Universal("aside", {
                children: [
                    new Universal("div", {
                        children: this.searchBlock,
                        attrib: { class: "search" },
                    }),
                    this.chats,
                ],
                attrib: {
                    class: "aside",
                },
            }),
            new Universal("section", {
                children: [
                    new Universal("div", {
                        children: [
                            new Universal("div", {
                                children: new Universal("img", {
                                    attrib: { src: "/cog.svg", class: "header-profile__icon", alt: "Профиль пользователя" },
                                }),
                                attrib: { class: "header-profile" },
                            }),
                            new Universal("div", {
                                children: new Universal("div", { children: "&nbsp;", attrib: { class: "header-photo__avatar" } }),
                                attrib: { class: "header-photo" },
                            }),
                            new Universal("div", { children: "Илья", attrib: { class: "header__name" } }),
                        ],
                        attrib: { class: "header" },
                    }),
                    new Universal("div", {
                        children: this.content,
                        attrib: { class: "content" },
                    }),
                ],
                attrib: {
                    class: "section",
                },
            }),
        ],
        attrib: {
            class: "main",
        },
    });

    constructor(selector: string) {
        renderDom(selector, this.main);

        setTimeout(() => {
            this._loadChatsData();
        }, 300);
    }

    _loadChatsData() {
        HTTP.get("/mockdata/chatlistdata.json")
            .then((x: any) => {
                let data: IChatItem[] = JSON.parse(x.response);
                data = data.map((item: IChatItem) => {
                    item.selected = false;
                    if (item.id == 4) item.selected = true;
                    return item;
                });
                this._updateChatList(data);
            })
            .catch((err: any) => console.error(err));

        HTTP.get("/mockdata/messages.json")
            .then((x: any) => {
                let data: IMessages[] = JSON.parse(x.response);
                this._updateChat(data);
            })
            .catch((err: any) => console.error(err));
    }

    _updateChatList(items: IChatItem[]) {
        console.info(items);
        const props: any = [];
        items.forEach((item: IChatItem) => {
            const prop = new ChatItem(item);
            props.push(prop);
        });

        this.chats.setProps({ children: props });
    }

    _updateChat(data: IMessages[]) {
        this.chat.update(data);
    }
}
