import { renderDom } from "../../utils/render-dom";

import Universal from "../../components/universal";
import HTTP from "../../modules/http";
import ChatItem from "../../components/chat/chatitem";
import { TChatItem } from "../../shared/types/tchatitem";

export default class ChatListPage {
    searchBlock = new Universal("div", {
        children: [
            new Universal("input", { attrib: { type: "text", class: "search-block__input", placeholder: "Поиск" } }),
            new Universal("div", {
                children: new Universal("img", { attrib: { src: "/images/search_btn.svg", alt: "Поиск чата" } }),
                attrib: { class: "search-block__button" },
            }),
        ],
        attrib: {
            class: "search-block",
        },
    });

    chats = new Universal("div", {
        children: new Universal("div", { children: "Loading chat list ...", attrib: { class: "p20" } }),
        attrib: { class: "chats" },
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
                                    attrib: { src: "/images/cog.svg", class: "header-profile__icon", alt: "Профиль пользователя" },
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
                        children: new Universal("div", { children: "Выберите чат чтобы отправить сообщение", attrib: { class: "content-text" } }),
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
        document.title = "Список чатов";
        renderDom(selector, this.main);

        setTimeout(() => {
            this._loadChatsData();
        }, 2000);
    }

    _loadChatsData() {
        HTTP.get("/mockdata/chatlistdata.json")
            .then((x: any) => {
                let data: TChatItem[] = JSON.parse(x.response);
                this._updateChats(data);
            })
            .catch((err: any) => console.error(err));
    }

    _updateChats(items: TChatItem[]) {
        console.info(items);
        const props: any = [];
        items.forEach((item: TChatItem) => {
            const prop = new ChatItem(item);
            props.push(prop);
        });

        this.chats.setProps({ children: props });
    }
}
