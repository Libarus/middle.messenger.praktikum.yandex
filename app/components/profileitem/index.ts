import Block from '../../modules/block.ts';
import template from './template.ts';

export default class ProfileItems extends Block {
    constructor(props: any = {}) {
        const initObj = { attrib: { class: 'profile-item' } };
        super('div', { ...initObj, ...props });
    }

    render(): any {
        super.render();
        return this.compile(template, this.Props);
    }
}
