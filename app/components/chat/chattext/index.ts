import Block from '../../../modules/block.ts';
import template from './template.ts';

export default class ChatText extends Block {
    constructor(props = {}) {
        super('div', props);
    }

    render(): any {
        super.render();
        return this.compile(template, this.Props);
    }
}
