import Block from '../../../modules/block.ts';
import { template } from './template.ts';

export default class ChatItem extends Block {
    constructor(props: any = {}) {
        super('div', props);
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
