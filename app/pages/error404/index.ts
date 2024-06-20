import Universal from '../../components/universal/index.ts';
import Helpers from '../../utils/helpers.ts';
import Block from '../../modules/block.ts';

export default class Error404Page extends Block {
    props = {
        children: new Universal('div', {
            children: [
                new Universal('div', { children: '404', attrib: { class: 'error-title' } }),
                new Universal('div', {
                    children: 'Не туда попали',
                    attrib: { class: 'error-description' },
                }),
                new Universal('a', {
                    children: 'Назад к чатам',
                    attrib: { class: 'error-link', href: '/' },
                }),
            ],
            attrib: {
                class: 'error-box',
            },
        }),
    };

    constructor(props: any = {}) {
        super('main', props);
        Helpers.SetDocumentTitle('404 ошибка');
        this.setProps(this.props);
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }
}
