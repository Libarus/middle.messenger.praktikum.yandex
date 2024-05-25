import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import { EventBus } from './event-bus.ts';

// Нельзя создавать экземпляр данного класса
class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    eventBus: any;

    _element: any = document.createElement('template'); // временная инициализация
    _meta: any = null;
    _events: any = null;

    _children: any = {};
    _list: any = {};
    _props: any = {};
    _settings: any = {};
    _attrib: any = {};

    _id: string = '';
    _setRender: boolean = false;

    _plugins: any[] = [];

    /** JSDoc
     * @param {string} tagName
     * @param {Object} propsAndChildren
     *
     * @returns {void}
     */
    constructor(tagName: string = '', propsAndChildren: any = {}) {
        if (tagName == '') {
            throw new Error('The tag name is not specified');
        }

        tagName = tagName.toLowerCase();

        const eventBus = new EventBus();

        this._meta = {
            tagName,
            propsAndChildren,
        };

        // Генерируем уникальный UUID V4
        this._id = makeUUID();

        this.setProps(propsAndChildren);
        this._children = this._makePropsProxy(this._children);
        this._list = this._makePropsProxy(this._list);
        this._props = this._makePropsProxy({ ...this._props, __id: this._id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    /* PUBLIC */

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        this._setRender = false;
        const oldProps = { ...this._props };

        const { children, list, props, settings, attrib } = this._getChildren(nextProps);

        if (Object.values(children).length) Object.assign(this._children, children);
        if (Object.values(list).length) Object.assign(this._list, list);
        if (Object.values(props).length) Object.assign(this._props, props);
        if (Object.values(settings).length) Object.assign(this._settings, settings);
        if (Object.values(attrib).length) Object.assign(this._attrib, attrib);

        if (this._setRender) {
            this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
            this._setRender = false;
        }
    };

    show() {
        this.getContent.style.display = 'block';
    }

    hide() {
        this.getContent.style.display = 'none';
    }

    compile(template: string, props: any): any {
        const propsAndStubs = { ...props };

        Object.entries(this._children).forEach(([key, child]: [key: string, child: any]) => {
            propsAndStubs[key] = `<div data-id="${child.Id}"></div>`;
        });

        Object.entries(this._list).forEach(([key, items]: [key: string, items: any]) => {
            propsAndStubs[key] = '';
            Object.entries(items).forEach(([_, child]: [keyChild: string, child: any]) => {
                if (child instanceof Block) {
                    propsAndStubs[key] += `<div data-id="__L_${child.Id}"></div>`;
                } else {
                    propsAndStubs[key] += child;
                }
            });
        });

        const fragment: any = this._createDocumentElement('template');
        const stringContent = Handlebars.compile(template)(propsAndStubs);
        fragment.innerHTML = stringContent;

        Object.values(this._children).forEach((entry: any) => {
            const stub = fragment.content.querySelector(`[data-id="${entry.Id}"]`);
            if (stub != null) stub.replaceWith(entry.getContent);
        });

        Object.entries(this._list).forEach(([_, items]: [key: string, items: any]) => {
            Object.entries(items).forEach(([_, child]: [keyChild: string, child: any]) => {
                const stub = fragment.content.querySelector(`[data-id="__L_${child.Id}"]`);
                if (stub != null) stub.replaceWith(child.getContent);
            });
        });

        return fragment.content;
    }

    addPlugin(plugin: any) {
        this._plugins.push(plugin);
    }

    /* GETTER */

    get element(): HTMLElement {
        return this._element;
    }

    get Id(): string {
        return this._id;
    }

    get Props(): any {
        return this._props;
    }

    get getContent(): HTMLElement {
        return this._element;
    }

    get tagName(): string {
        return this._meta.tagName;
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
        const element: HTMLElement = this._createDocumentElement(tagName);
        this._element = element;
    }

    _getChildren(propsAndChildren: any) {
        const props: any = {};
        const children: any = {};
        const list: any = {};
        let attrib: any = {};
        let settings: any = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (key.toLowerCase() == 'settings') {
                settings = value;
            } else if (key.toLowerCase() == 'attrib') {
                attrib = value;
            } else {
                if (value instanceof Block) {
                    children[key] = value;
                } else if (Array.isArray(value) && key.toLowerCase() != 'validate') {
                    list[key] = value;
                } else {
                    props[key] = value;
                }
            }
        });

        return { children, list, props, settings, attrib };
    }

    _componentDidMount(oldProps: any): void {
        this.componentDidMount(oldProps);
    }

    _componentDidUpdate(oldProps: any, newProps: any): void {
        let isReRender: boolean = this.componentDidUpdate(oldProps, newProps);
        if (isReRender) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    _dispatchComponentDidMount(): void {
        this.dispatchComponentDidMount();
    }

    _render() {
        const block: HTMLElement = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
        this._removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);
        this._addEvents();
    }

    _makePropsProxy(props: any): any {
        const self = this;

        return new Proxy(props, {
            get(target: any, prop: string) {
                if (prop.indexOf('_') === 0) {
                    return;
                }
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },

            set(target: any, prop: string, value: any) {
                if (target[prop] !== value) {
                    target[prop] = value;
                    self._setRender = true;
                }
                return true;
            },

            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }

    _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element: HTMLElement = document.createElement(tagName);
        if (this._settings?.withInternalID) {
            element.setAttribute('data-id', this.Id);
        }
        this._addAttributes();
        return element;
    }

    _addEvents() {
        const { events = {} } = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    _addAttributes() {
        Object.entries(this._attrib).forEach(([name, value]) => {
            this._element.setAttribute(name, value as string);
        });
    }

    /* ABSTRACT */

    // Методы могут переопределяться
    // @ts-ignore
    componentDidMount(oldProps: any = null): void {}

    // @ts-ignore
    componentDidUpdate(oldProps: any, newProps: any): boolean {
        // TODO: Сделать корректное сравнение объектов
        return oldProps != newProps;
    }

    dispatchComponentDidMount(): void {}

    render(): any {
        return document.createElement('template');
    } // Необходимо вернуть разметку
}

export default Block;
