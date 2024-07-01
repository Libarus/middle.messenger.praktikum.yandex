import 'mocha';
import { expect } from 'chai';
import Block from './block.ts';

describe('Шаблонизатор - Block', () => {
    function createBlock() {
        return new Block('div');
    }

    it("должен вернуть 'The tag name is not specified' при пустом имени тэга", () => {
        expect(() => new Block()).to.throw('The tag name is not specified');
    });

    it("должен вернуть текст 'text content' переданный в компилятор шаблона", () => {
        const block = createBlock();
        expect(
            block.compile('<div>{{children}}</div>', { children: 'text content' }).textContent
        ).equal('text content');
    });
});
