// Отдельный класс исключений для ESLint

export default class Helpers {
    public static SetDocumentTitle(title: string): void {
        // eslint-disable-next-line no-undef
        document.title = title;
    }

    public static Log(level: string, ...args: any): any {
        switch (level) {
            case 'INFO':
                // eslint-disable-next-line no-console
                console.info(...args);
                break;
            case 'LOG':
                // eslint-disable-next-line no-console
                console.log(...args);
                break;
            case 'ERROR':
                // eslint-disable-next-line no-console
                console.error(...args);
                break;
            default:
                break;
        }
    }

    public static Alert(message: string): void {
        // eslint-disable-next-line no-alert
        alert(message);
    }
}
