import Block from './block.ts';
import Route from './route.ts';

export default class Router {
    public static instance: any = null;

    private routes: Route[] = [];

    private history: History = {} as History;

    private currentRoute: Route | null = null;

    private selector: string = '';

    constructor(selector: string) {
        if (!Router.instance) {
            this.routes = [];
            this.history = window.history;
            this.currentRoute = null;
            this.selector = selector;

            Router.instance = this;
        }
    }

    use(pathName: string, block: typeof Block) {
        const route = new Route(pathName, block, { selector: this.selector });
        this.routes.push(route);

        return this;
    }

    updateLinks() {
        // eslint-disable-next-line no-undef
        const doc: any = document;
        const elements = doc.querySelectorAll('a');
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.addEventListener('click', (ev: Event) => {
                ev.preventDefault();
                this.go(element.getAttribute('href'));
            });
        }
    }

    start() {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        window.onpopstate = (event: any) => {
            const eventTarget: Window | null = event.currentTarget;
            const pathName = eventTarget != null ? eventTarget.location.pathname : '';
            this.onRoute(pathName);
        };

        this.onRoute(window.location.pathname);

        return this;
    }

    length(): number {
        return this.routes.length;
    }

    private onRoute(pathName: string) {
        const params: string[] = pathName.split('/').splice(2);
        const route: Route | undefined = this.getRoute(pathName);

        if (!route) {
            if (pathName === '/error404') throw new Error('The route for the 404 error is not set');
            this.onRoute('/error404');
            return;
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render(params);
    }

    go(pathName: string) {
        this.history.pushState({}, '', pathName);
        this.onRoute(pathName);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathName: string) {
        return this.routes.find((route) => route.match(pathName));
    }
}
