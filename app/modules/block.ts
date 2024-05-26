import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './event-bus.ts';
import Helpers from '../utils/helpers.ts';

// Нельзя создавать экземпляр данного класса
class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_DCDM: 'flow:dispatch-component-did-mount',
        FLOW_RENDER: 'flow:render',
    };

    eventBus: any;

    // временная инициализация
    private p_element: any = Helpers.GetDocument().createElement('template');

    private p_meta: any = null;

    private p_children: any = {};

    private p_list: any = {};

    private p_props: any = {};

    private p_settings: any = {};

    private p_attrib: any = {};

    private p_id: string = '';

    private p_setRender: boolean = false;

    private p_plugins: any[] = [];

    /** JSDoc
     * @param {string} tagName
     * @param {Object} propsAndChildren
     *
     * @returns {void}
     */
    constructor(tagNameParam: string = '', propsAndChildren: any = {}) {
        if (tagNameParam === '') {
            throw new Error('The tag name is not specified');
        }

        const tagName = tagNameParam.toLowerCase();

        const eventBus = new EventBus();

        this.p_meta = {
            tagName,
            propsAndChildren,
        };

        // Генерируем уникальный UUID V4
        this.p_id = makeUUID();

        this.setProps(propsAndChildren);
        this.p_children = this.p_makePropsProxy(this.p_children);
        this.p_list = this.p_makePropsProxy(this.p_list);
        this.p_props = this.p_makePropsProxy({ ...this.p_props, p__id: this.p_id });

        this.eventBus = () => eventBus;

        this.p_registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    /* PUBLIC */

    init() {
        this.p_createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        this.p_setRender = false;
        const oldProps = { ...this.p_props };

        const { children, list, props, settings, attrib } = Block.p_getChildren(nextProps);

        if (Object.values(children).length) Object.assign(this.p_children, children);
        if (Object.values(list).length) Object.assign(this.p_list, list);
        if (Object.values(props).length) Object.assign(this.p_props, props);
        if (Object.values(settings).length) Object.assign(this.p_settings, settings);
        if (Object.values(attrib).length) Object.assign(this.p_attrib, attrib);

        if (this.p_setRender) {
            this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.p_props);
            this.p_setRender = false;
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

        Object.entries(this.p_children).forEach(([key, child]: [key: string, child: any]) => {
            propsAndStubs[key] = `<div data-id="${child.Id}"></div>`;
        });

        Object.entries(this.p_list).forEach(([key, items]: [key: string, items: any]) => {
            propsAndStubs[key] = '';
            Object.entries(items).forEach(([, child]: [keyChild: string, child: any]) => {
                if (child instanceof Block) {
                    propsAndStubs[key] += `<div data-id="__L_${child.Id}"></div>`;
                } else {
                    propsAndStubs[key] += child;
                }
            });
        });

        const fragment: any = this.p_createDocumentElement('template');
        const stringContent = Handlebars.compile(template)(propsAndStubs);
        fragment.innerHTML = stringContent;

        Object.values(this.p_children).forEach((entry: any) => {
            const stub = fragment.content.querySelector(`[data-id="${entry.Id}"]`);
            if (stub != null) stub.replaceWith(entry.getContent);
        });

        Object.entries(this.p_list).forEach(([, items]: [key: string, items: any]) => {
            Object.entries(items).forEach(([, child]: [keyChild: string, child: any]) => {
                const stub = fragment.content.querySelector(`[data-id="__L_${child.Id}"]`);
                if (stub != null) stub.replaceWith(child.getContent);
            });
        });

        return fragment.content;
    }

    addPlugin(plugin: any) {
        this.p_plugins.push(plugin);
    }

    /* GETTER */

    get element(): any {
        return this.p_element;
    }

    get Id(): string {
        return this.p_id;
    }

    get Props(): any {
        return this.p_props;
    }

    get getContent(): any {
        return this.p_element;
    }

    get tagName(): string {
        return this.p_meta.tagName;
    }

    /* PRIVATE */

    private p_registerEvents(eventBus: any) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.p_componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this.p_componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_DCDM, this.p_dispatchComponentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.p_render.bind(this));
    }

    private p_createResources() {
        const { tagName } = this.p_meta;
        const element: any = this.p_createDocumentElement(tagName);
        this.p_element = element;
    }

    private static p_getChildren(propsAndChildren: any): any {
        const props: any = {};
        const children: any = {};
        const list: any = {};
        let attrib: any = {};
        let settings: any = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (key.toLowerCase() === 'settings') {
                settings = value;
            } else if (key.toLowerCase() === 'attrib') {
                attrib = value;
            } else if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value) && key.toLowerCase() !== 'validate') {
                list[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {
            children,
            list,
            props,
            settings,
            attrib,
        };
    }

    private p_dispatchComponentDidMount(): void {
        this.dispatchComponentDidMount();
    }

    private p_componentDidMount(oldProps: any): void {
        this.componentDidMount(oldProps);
    }

    private p_componentDidUpdate(oldProps: any, newProps: any): void {
        const isReRender: boolean = this.componentDidUpdate(oldProps, newProps);
        if (isReRender) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    private p_render() {
        const block: any = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду
        this.p_removeEvents();
        this.p_element.innerHTML = '';
        this.p_element.appendChild(block);
        this.p_addEvents();
    }

    private p_makePropsProxy(props: any): any {
        const self = this;

        return new Proxy(props, {
            get(target: any, prop: string): any {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },

            set(targetParam: any, prop: string, value: any) {
                const target: any = targetParam;
                if (target[prop] !== value) {
                    target[prop] = value;
                    self.p_setRender = true;
                }
                return true;
            },

            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }

    private p_createDocumentElement(tagName: string): any {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element: any = Helpers.GetDocument().createElement(tagName);
        if (this.p_settings?.withInternalID) {
            element.setAttribute('data-id', this.Id);
        }
        this.p_addAttributes();
        return element;
    }

    private p_addEvents() {
        const { events = {} } = this.p_props;

        Object.keys(events).forEach((eventName) => {
            this.p_element.addEventListener(eventName, events[eventName]);
        });
    }

    private p_removeEvents() {
        const { events = {} } = this.p_props;

        Object.keys(events).forEach((eventName) => {
            this.p_element.removeEventListener(eventName, events[eventName]);
        });
    }

    private p_addAttributes() {
        Object.entries(this.p_attrib).forEach(([name, value]) => {
            this.p_element.setAttribute(name, value as string);
        });
    }

    /* ABSTRACT */

    // Методы могут переопределяться
    componentDidMount(oldProps: any = null): void {
        const fivtiveProps = { ...oldProps };
        fivtiveProps.fictive = null;
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        // TODO: Сделать корректное сравнение объектов
        return oldProps !== newProps;
    }

    dispatchComponentDidMount(): void {}

    render(): any {
        return Helpers.GetDocument().createElement('template');
    } // Необходимо вернуть разметку
}

export default Block;
