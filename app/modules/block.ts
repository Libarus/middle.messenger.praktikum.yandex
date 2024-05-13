import { EventBus } from "./event-bus";

// Нельзя создавать экземпляр данного класса
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_DCDM: "flow:dispatch-component-did-mount",
        FLOW_RENDER: "flow:render"
    };

    eventBus: any;
    props: any;

    _element: any = null;
    _meta: any = null;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    /* GETTER */

    get element() {
        return this._element;
    }

    /* PUBLIC */

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps: any = null) {
        this._componentDidMount(oldProps);
    }

    componentDidUpdate(oldProps: any, newProps: any) {
        this._componentDidUpdate(oldProps, newProps);
        return true;
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    getContent(): HTMLElement {
        return this.element;
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }

    /* PRIVATE */

    _registerEvents(eventBus: any) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _componentDidMount(oldProps: any) {
        console.info('componentDidMount >> oldProps', oldProps);
        //...
    }

    _componentDidUpdate(oldProps: any, newProps: any) {
        console.info('componentDidUpdate >> oldProps', oldProps);
        console.info('componentDidUpdate >> newProps', newProps);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _render() {
        const block = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
        this._element.innerHTML = block;
    }

    _makePropsProxy(props: any): any {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        const proxyData = new Proxy(props, {

            get(target: any, prop: string) {
                if (prop.indexOf("_") === 0) {
                    throw new Error("Отказано в доступе");
                }
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },

            set(target: any, prop: string, value: any) {
                const oldProps: any = {...target};
                target[prop] = value;
                console.log(`${prop}: ${value}`);
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, props);
                return true;
            },

            deleteProperty() {
                throw new Error("Отказано в доступе");
            },

        });

        return proxyData;
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    /* ABSTRACT */

    // Методы переопределяются

    // Необходимо вернуть разметку
    render() { }
}

export default Block;