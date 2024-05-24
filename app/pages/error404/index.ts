import { renderDom } from "../../utils/render-dom";

import Universal from "../../components/universal";

export default class Error404Page {
    main = new Universal("main", {
        children: new Universal("div", {
            children: [
                new Universal("div", { children: "404", attrib: { class: "error-title" } }),
                new Universal("div", { children: "Не туда попали", attrib: { class: "error-description" } }),
                new Universal("a", { children: "Назад к чатам", attrib: { class: "error-link", href: "/chatchat.html" } }),
            ],
            attrib: {
                class: "error-box",
            },
        }),
    });

    constructor(selector: string) {
        document.title = "404 ошибка";
        renderDom(selector, this.main);
    }
}
