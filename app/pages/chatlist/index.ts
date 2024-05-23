import { renderDom } from "../../utils/render-dom";

import Universal from "../../components/universal";
import HTTP from "../../modules/http";
import ChatItem from "../../components/chatitem";

interface IChatItem {
    name: string;
    message: string;
    self: boolean;
    datetime: string;
    unread: number;
    avatar: string;
}

export default class Error500Page {
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
                        children: new Universal("div", { children: "chat list", attrib: { class: "content-text" } }),
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
        }, 3000);
    }

    _loadChatsData() {
        HTTP.get("/mockdata/chatlistdata.json")
            .then((x: any) => {
                let data: IChatItem[] = JSON.parse(x.response);
                this._updateChats(data);
            })
            .catch((err: any) => console.error(err));
    }

    _updateChats(items: IChatItem[]) {
        console.info(items);
        const props: any = [];
        items.forEach((item: IChatItem) => {
            const prop = new ChatItem(item);
            props.push(prop);
        });

        this.chats.setProps({ children: props });
    }
}
