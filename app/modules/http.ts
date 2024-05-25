export default class HTTP {
    static METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
    };

    static get = (url: string, options = { timeout: 5000 }) => {
        return this._request(url, { ...options, method: this.METHODS.GET }, options.timeout);
    };

    // PUT, POST, DELETE
    static post = (url: string, options = { timeout: 5000 }) => {
        return this._request(url, { ...options, method: this.METHODS.POST }, options.timeout);
    };

    static put = (url: string, options = { timeout: 5000 }) => {
        return this._request(url, { ...options, method: this.METHODS.PUT }, options.timeout);
    };

    static delete = (url: string, options = { timeout: 5000 }) => {
        return this._request(url, { ...options, method: this.METHODS.DELETE }, options.timeout);
    };

    static _request = (url: string, options: any = {}, timeout = 5000) => {
        const { method, data, headers } = options;

        if (method === this.METHODS.GET && !!data) {
            url += typeof data === 'string' ? data : this._queryStringify(data);
            alert(url);
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.timeout = timeout;

            if (!headers) {
                for (let key in headers) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === this.METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(JSON.stringify(data));
            }
        });
    };

    static _queryStringify(data: any) {
        if (typeof data !== 'object') {
            throw new Error('Data должна быть объектом');
        }

        return (
            '?' +
            Object.keys(data)
                .map((key) => {
                    const value = data[key];
                    if (Array.isArray(value)) {
                        // Для массивов создаем строку с разделителем ','
                        return key + '=' + value.join(',');
                    }
                    //else if (typeof value === 'object' && value !== null) {
                    // // Для объектов рекурсивно вызываем функцию
                    // return `${encodeURIComponent(key)}=${objectToQueryString(value)}`;
                    // }
                    else {
                        // Для остальных значений просто кодируем ключ и значение
                        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
                    }
                })
                .join('&')
        );
    }
}
