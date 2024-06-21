import Helpers from '../utils/helpers.ts';

export default class WS {
    //
    private p_url: string;

    private p_pingpongInterval = 15000;

    private p_reconnectAttempts: number = 3;

    private p_reconnectCurrentAttempt: number = 1;

    private p_reconnectTimeout = 10000;

    private p_socket: WebSocket;

    private p_onOpenEvent: (event: Event) => void;

    private p_onMessageEvent: (event: MessageEvent) => void;

    private p_onErrorEvent: (event: Event) => void;

    private p_onCloseEvent: (event: CloseEvent) => void;

    constructor(
        url: string,
        openCallback: (event: Event) => void,
        messageCallback: (event: MessageEvent) => void,
        errorCallback: (event: Event) => void,
        closeCallback: (event: CloseEvent) => void
    ) {
        this.p_onOpenEvent = openCallback;
        this.p_onMessageEvent = messageCallback;
        this.p_onErrorEvent = errorCallback;
        this.p_onCloseEvent = closeCallback;

        this.p_url = url;
        this.p_socket = new WebSocket(url);
        this.p_initEvents();
        setTimeout(this.p_pingpong.bind(this), this.p_pingpongInterval);
    }

    send(message: string) {
        this.p_socket.send(message);
    }

    private p_reconnect(): void {
        this.p_socket = new WebSocket(this.p_url);
        this.p_initEvents();
        setTimeout(this.p_pingpong.bind(this), this.p_pingpongInterval);
    }

    private p_initEvents() {
        this.p_socket.addEventListener('open', this.p_onOpen.bind(this));
        this.p_socket.addEventListener('message', this.p_onMessage.bind(this));
        this.p_socket.addEventListener('error', this.p_onError.bind(this));
        this.p_socket.addEventListener('close', this.p_onClose.bind(this));
    }

    private p_onOpen(event: Event) {
        this.p_onOpenEvent(event);
    }

    private p_onMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);
        if (data.type === 'pong') {
            Helpers.Log('INFO', 'pong');
            setTimeout(this.p_pingpong.bind(this), this.p_pingpongInterval);
        } else {
            this.p_onMessageEvent(event);
        }
    }

    private p_onError(event: Event) {
        this.p_onErrorEvent(event);
    }

    private p_onClose(event: CloseEvent) {
        if (event.wasClean) {
            Helpers.Log(
                'INFO',
                `[close] Соединение закрыто чисто, код: ${event.code}; причина: "${event.reason}"`
            );
        } else {
            Helpers.Log('INFO', '[close] Соединение прервано');

            if (this.p_reconnectCurrentAttempt <= this.p_reconnectAttempts) {
                Helpers.Log(
                    'INFO',
                    `Websocket - Reconnect will be attempted in ${this.p_reconnectTimeout} seconds.
                    Attempt from ${this.p_reconnectCurrentAttempt} from ${this.p_reconnectAttempts}`
                );
                this.p_reconnectCurrentAttempt++;
                setTimeout(this.p_reconnect.bind(this), this.p_reconnectTimeout);
            } else {
                Helpers.Log('ERROR', 'Подключение не возможно');
            }
        }

        this.p_onCloseEvent(event);
    }

    private p_pingpong() {
        const ping: any = { type: 'ping' };
        Helpers.Log('INFO', 'ping');
        if (this.p_socket && this.p_socket.readyState === 1) {
            this.p_socket.send(JSON.stringify(ping));
        }
    }
}
