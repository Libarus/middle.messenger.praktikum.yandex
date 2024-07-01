import { expect } from 'chai';
import Block from './block.ts';
import Router from './router.ts';

class TestPage extends Block {
    constructor() {
        super('main', {});
    }

    render(): any {
        super.render();
        return this.compile('{{{children}}}', this.Props);
    }
}

describe('Маршрутизатор - Router', () => {
    const router = new Router('#app');
    router
        .use('/', TestPage)
        .use('/page1', TestPage)
        .use('/page2', TestPage)
        .use('/page3', TestPage)
        .use('/page4', TestPage)
        .start();

    it('должен вернуть количество созданных точек маршрута равных 5', () => {
        expect(Router.instance.length()).equal(5);
    });

    it('должен вернуть число маршрутов в истории равное 1', () => {
        expect(window.history.length).equal(1);
    });

    it('должен вернуть число маршрутов в истории равное 1 после 2 переходов', () => {
        Router.instance.go('/page2');
        Router.instance.go('/page4');
        expect(window.history.length).equal(3);
    });

    it(`должен вернуть ошибку "The route for the 404 error is not set" при попытке
        перейти на несуществующий маршрут при отсутствии маршрута для 404 ошибки`, () => {
        expect(() => Router.instance.go('/nopage')).to.throw(
            'The route for the 404 error is not set'
        );
    });
});
