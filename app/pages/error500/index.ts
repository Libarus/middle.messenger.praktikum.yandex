import Universal from '../../components/universal/index.ts';
import Block from '../../modules/block.ts';
import Helpers from '../../utils/helpers.ts';

export default class Error500Page extends Block {
    props = {
        children: new Universal('div', {
            children: [
                new Universal('div', { children: '500', attrib: { class: 'error-title' } }),
                new Universal('div', {
                    children: 'Мы уже фиксим',
                    attrib: { class: 'error-description' },
                }),
                new Universal('a', {
                    children: 'Назад к чатам',
                    attrib: { class: 'error-link', href: '/chatchat.html' },
                }),
            ],
            attrib: {
                class: 'error-box',
            },
        }),
    };

    constructor(props: any = {}) {
        super('main', props);
        Helpers.SetDocumentTitle('500 ошибка');
        this.setProps(this.props);
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }
}
