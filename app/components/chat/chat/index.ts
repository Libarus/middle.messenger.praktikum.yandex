import Block from "../../../modules/block";
import Universal from "../../universal";
import { template } from "./template";

import { TMessages } from "../../../shared/types/tmessages";
import { TMessage } from "../../../shared/types/tmessage";
import ChatText from "../chattext";
import ChatImage from "../chatimage";

export default class Chat extends Block {
    constructor(props: any = {}) {
        super("div", props);
    }

    update(data: TMessages[]) {
        console.info("update", data);
        const children: any = [];
        data.forEach((item: TMessages) => {
            const datetime = new Universal("div", { children: item.datetime, attrib: { class: "content-chat-content-date" } });
            children.push(datetime);
            item.messages.forEach((message: TMessage) => {
                let msg: any = {};
                const type = message.self ? "question" : "answer";
                const status_image = "/images/galki.svg";
                const status_alt = "Сообщение доставлено и прочитано";
                switch (message.type) {
                    case "text":
                        msg = new ChatText({ text: message.data, time: message.time, type, status_image, status_alt });
                        break;
                    case "image":
                        msg = new ChatImage({ src: message.data, time: message.time, type });
                        break;
                    default:
                        msg = "";
                }
                children.push(msg);
            });
        });
        this.setProps({ children });
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
