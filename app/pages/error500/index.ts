import { renderDom } from "../../utils/render-dom";

import Universal from "../../components/universal";

export default class Error500Page {
    main = new Universal("main", {
        children: new Universal("div", {
            children: [
                new Universal("div", { children: "500", attrib: { class: "error-title" } }),
                new Universal("div", { children: "Мы уже фиксим", attrib: { class: "error-description" } }),
                new Universal("a", { children: "Назад к чатам", attrib: { class: "error-link", href: "" } }),
            ],
            attrib: {
                class: "error-box",
            },
        }),
    });

    constructor(selector: string) {
        renderDom(selector, this.main);
    }
}
