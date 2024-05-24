import Block from "../../../modules/block";
import Universal from "../../universal";
import { template } from "./template";

import { IMessages } from "../../../shared/interfaces/imessages";
import { IMessage } from "../../../shared/interfaces/imessage";
import ChatText from "../chattext";
import ChatImage from "../chatimage";

export default class Chat extends Block {
    constructor(props: any = {}) {
        super("div", props);
    }

    update(data: IMessages[]) {
        console.info("update", data);
        const children: any = [];
        data.forEach((item: IMessages) => {
            const datetime = new Universal("div", { children: item.datetime, attrib: { class: "content-chat-content-date" } });
            children.push(datetime);
            item.messages.forEach((message: IMessage) => {
                let msg: any = {};
                const type = message.self ? "question" : "answer";
                const status_image = "/galki.svg";
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
