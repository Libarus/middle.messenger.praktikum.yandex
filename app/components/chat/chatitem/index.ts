import Block from '../../../modules/block';
import { template } from './template';

export default class ChatItem extends Block {
    constructor(props: any = {}) {
        super('div', props);
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
