import Block from '../../modules/block.ts';
import template from './template.ts';

export default class Modal extends Block {
    constructor(props = {}) {
        const attrib = {
            attrib: { id: 'modal', class: 'modal' },
            events: {
                click: (ev: Event) => {
                    const elem: any = ev.target;
                    if (elem != null) {
                        if (elem.getAttribute('class') === 'modal-content__close') {
                            this.hide();
                        }
                    }
                },
            },
        };
        super('div', { ...props, ...attrib });
    }

    render(): any {
        super.render();
        return this.compile(template, this.Props);
    }
}
