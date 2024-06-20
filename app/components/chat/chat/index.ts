import Block from '../../../modules/block.ts';
import Universal from '../../universal/index.ts';
import template from './template.ts';
import ChatText from '../chattext/index.ts';
import ChatImage from '../chatimage/index.ts';
import { TChatMessage } from '../../../shared/types/chat.ts';

export default class Chat extends Block {
    constructor(props: any = {}) {
        super('div', props);
    }

    update(messages: TChatMessage[], userId: number) {
        const data: Record<string, TChatMessage[]> = {};

        messages.forEach((chatMsg: TChatMessage) => {
            const dt: Date = new Date(chatMsg.time);
            const dateTitle: string = dt.toLocaleString('ru', {
                month: 'long', // Используем полное название месяца
                day: 'numeric',
            });

            if (!data[dateTitle]) data[dateTitle] = [];

            data[dateTitle].push(chatMsg);
        });

        const children: any = [];
        for (let dt in data) {
            console.info(dt);

            const datetime = new Universal('div', {
                children: dt,
                attrib: { class: 'content-chat-content-date' },
            });
            children.push(datetime);

            data[dt];

            data[dt].forEach((message: TChatMessage) => {
                const time: Date = new Date(message.time);

                let msg: any = {};
                const type = message.user_id == userId ? 'question' : 'answer';
                const statusImage = '/images/galki.svg';
                const statusAlt = 'Сообщение доставлено и прочитано';
                switch (message.type) {
                    case 'message':
                        msg = new ChatText({
                            text: message.content,
                            time: time.toLocaleTimeString('ru', {
                                hour: '2-digit',
                                minute: '2-digit',
                            }),
                            type,
                            statusImage,
                            statusAlt,
                        });
                        break;
                    case 'image':
                        msg = new ChatImage({ src: message.content, time: '222', type });
                        break;
                    default:
                        msg = '';
                }
                children.push(msg);
            });
        }

        this.setProps({ children });
    }

    render(): any {
        super.render();
        return this.compile(template, this.Props);
    }
}
