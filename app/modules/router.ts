import Helpers from '../utils/helpers';
import Block from './block';
import Route from './route';

export default class Router {
    public static instance: any = null;

    private routes: Route[] = [];

    private history: History = {} as History;

    private currentRoute: Route | null = null;

    private selector: string = '';

    constructor(selector: string) {
        if (Router.instance) {
            return Router.instance;
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.selector = selector;

        Router.instance = this;
    }

    use(pathName: string, block: typeof Block) {
        const route = new Route(pathName, block, { selector: this.selector });
        this.routes.push(route);

        return this;
    }

    updateLinks() {
        const doc: any = Helpers.GetDocument();
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
        window.onpopstate = (event: PopStateEvent) => {
            const eventTarget: EventTarget | null = event.currentTarget;
            // @ts-ignore
            const pathName = eventTarget != null ? eventTarget.location.pathname : '';
            this.onRoute(pathName);
        };

        this.onRoute(window.location.pathname);

        return this;
    }

    private onRoute(pathName: string) {
        console.info('on route', pathName);
        const params: string[] = pathName.split('/').splice(2);
        const route: Route | undefined = this.getRoute(pathName);

        if (!route) {
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
