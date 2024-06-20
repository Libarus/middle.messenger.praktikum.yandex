export default class BaseAPI {
    // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка

    static host = 'https://ya-praktikum.tech';

    create(data: any): Promise<unknown> {
        throw new Error('Not implemented');
    }

    request(data: any): Promise<unknown> {
        throw new Error('Not implemented');
    }

    update() {
        throw new Error('Not implemented');
    }

    delete() {
        throw new Error('Not implemented');
    }
}
