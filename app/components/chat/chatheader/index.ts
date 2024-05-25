import Block from '../../../modules/block.ts';
import { template } from './template.ts';

export default class ChatHeader extends Block {
    constructor(props: any = {}) {
        super('div', Object.assign({ attrib: { class: 'content-chat-header' } }, props));
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
