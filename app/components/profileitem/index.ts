import Block from '../../modules/block.ts';
import { template } from './template.ts';

export default class ProfileItems extends Block {
    constructor(props: any = {}) {
        super('div', Object.assign({ attrib: { class: 'profile-item' } }, props));
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
