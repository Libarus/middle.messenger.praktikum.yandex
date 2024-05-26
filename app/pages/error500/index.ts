import renderDom from '../../utils/render-dom.ts';

import Universal from '../../components/universal/index.ts';
import Helpers from '../../utils/helpers.ts';

export default class Error500Page {
    main = new Universal('main', {
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
    });

    constructor(selector: string) {
        Helpers.SetDocumentTitle('500 ошибка');
        renderDom(selector, this.main);
    }
}
