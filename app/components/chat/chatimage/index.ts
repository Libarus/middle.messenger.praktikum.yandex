import Block from '../../../modules/block.ts';
import template from './template.ts';

export default class ChatImage extends Block {
    constructor(props = {}) {
        super('div', props);
    }

    render(): any {
        super.render();
        return this.compile(template, this.Props);
    }
}
