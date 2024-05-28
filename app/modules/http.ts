type TOptions = {
    data?: any;
    headers?: Record<string, number>;
    timeout: number;
};

type TRequest = {
    method?: string;
    data?: any;
    headers?: Record<string, number>;
};

type HTTPMethod = (url: string, options?: TOptions) => Promise<unknown>;

export default class HTTP {
    private static defTimeout: number = 5000;

    static METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        UNKNOWN: 'UNKNOWN', // задел на будущие доработки
    };

    static get: HTTPMethod = (url: string, options: TOptions = { timeout: this.defTimeout }) =>
        this.p_request(url, { ...options, method: this.METHODS.GET }, options.timeout);

    static post: HTTPMethod = (url: string, options: TOptions = { timeout: this.defTimeout }) =>
        this.p_request(url, { ...options, method: this.METHODS.POST }, options.timeout);

    static put: HTTPMethod = (url: string, options: TOptions = { timeout: this.defTimeout }) =>
        this.p_request(url, { ...options, method: this.METHODS.PUT }, options.timeout);

    static delete: HTTPMethod = (url: string, options: TOptions = { timeout: this.defTimeout }) =>
        this.p_request(url, { ...options, method: this.METHODS.DELETE }, options.timeout);

    static p_request(purl: string, options: TRequest = {}, timeout = 5000) {
        const { method = '', data, headers } = options;

        let url = purl;
        if (method === this.METHODS.GET && !!data) {
            url += typeof data === 'string' ? data : this.p_queryStringify(data);
        }

        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-undef
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.timeout = timeout;

            if (!headers && headers !== undefined) {
                Object.keys(headers).forEach((key: string) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = () => {
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
    }

    static p_queryStringify(data: any) {
        if (typeof data !== 'object') {
            throw new Error('Data должна быть объектом');
        }

        const params: string = Object.keys(data)
            .map((key) => {
                const kkey: string = encodeURIComponent(key);
                let vvalue: string = '';
                const value = data[key];
                if (Array.isArray(value)) {
                    // Для массивов создаем строку с разделителем ','
                    vvalue = encodeURIComponent(value.join(','));
                } else {
                    // Для остальных значений просто кодируем значение
                    vvalue = encodeURIComponent(value);
                }
                return `${kkey}=${vvalue}`;
            })
            .join('&');

        return `?${params}`;
    }
}
