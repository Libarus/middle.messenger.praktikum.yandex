import { expect } from 'chai';
import * as sinon from 'sinon';
import HTTP from './http.ts';

describe('HTTP транспорт', () => {
    const sandbox = sinon.createSandbox();
    let http: HTTP;
    //let request: any;
    let result: string = '';

    beforeEach(() => {
        http = new HTTP('');
        sandbox.stub(http, 'p_request' as keyof typeof http).callsFake((...args: any) => {
            const { method } = args[1];
            result = args[0] + method;
            return Promise.resolve();
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    it(`должен вернуть строку с параметрами при входных всех
        строковых параметрах при GET запросе`, () => {
        http.get('', { data: { a: '1', b: '2' } });
        expect(result).contain('?a=1&b=2').contain('GET');
    });

    it(`должен вернуть строку с параметрами при входных параметрах:
        числовой и строка при GET запросе`, () => {
        http.get('', { data: { a: 99, b: 'string' } });
        expect(result).contain('?a=99&b=string').contain('GET');
    });

    it('должен кодировать строку для передачи в параметрах при GET запросе', () => {
        http.get('', { data: { a: '1+2', b: '2 2' } });
        expect(result).contain('?a=1%2B2&b=2%202').contain('GET');
    });

    it(`должен кодировать строку специальные символы для передачи
        в параметрах при GET запросе`, () => {
        http.get('', { data: { a: '1=2&1' } });
        expect(result).contain('?a=1%3D2%261').contain('GET');
    });
});
