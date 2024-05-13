type TCallback = (...args: any) => {};

export class EventBus {
    listeners: Record<string, TCallback[]> = {};

    constructor() {
        // создаём объект (шина), который будет содержать события
        this.listeners = {};
    }

    on(event: string, callback: TCallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: TCallback) {
        this._checkEvent(event);
        this.listeners[event] = this.listeners[event].filter(
            (cb: TCallback) => cb != callback
        );
    }

    emit(event: string, ...args: any) {
        this._checkEvent(event);
        this.listeners[event].forEach((callback: TCallback) => {
            callback(...args);
        });
    }

    private _checkEvent(event: string) {
        if (this.listeners[event]) return;
        throw new Error(`Нет события: ${event}`);
    }
}
