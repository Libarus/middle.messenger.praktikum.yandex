import Block from '../../modules/block.ts';
import { template } from './template.ts';

export default class Universal extends Block {
    constructor(tagName: string, props: any = {}) {
        super(tagName, props);
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
