import Block from '../../../modules/block.ts';
import template from './template.ts';

export default class ChatHeader extends Block {
    constructor(props: any = {}) {
        const initObj = { attrib: { class: 'content-chat-header' } };
        super('div', { ...initObj, ...props });
    }

    render(): any {
        super.render();
        return this.compile(template, this.Props);
    }
}
