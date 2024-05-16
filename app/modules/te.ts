import * as Components from "../components/components";

export default class TemplateEngine {
    _dom: HTMLElement;
    _componentNames: string[] = [];
    _components: any = {};
    _nodes: HTMLElement[] = [];

    constructor(template: string) {
        let { tpl, elements } = this._findComponents(template);
        this._dom = document.createElement("template");
        this._dom.innerHTML = tpl;

        this._prepareComponents(elements);
        this._loadComponents();
        this._debug(this._components);
        this._prepareVariables();
    }

    private _debug(...args: any): void {
        console.log("[TemplateEngine]", ...args);
    }

    private _prepareComponents(elements: string[]): void {
        this._debug(elements);
        this._componentNames = [
            ...new Set(
                elements.map((element: string) =>
                    element.substring(2, element.length - 2)
                )
            ),
        ];
    }

    private _loadComponents() {
        this._componentNames.forEach((componentName: string) => {
            switch (componentName) {
                case "CompName":
                    this._components[componentName] = Components.CompName;
                    break;
            }
        });
    }

    private _prepareVariables(): void {}

    private _findComponents(template: string): {
        tpl: string;
        elements: string[];
    } {
        // Регулярное выражение для поиска подстрок внутри двойных квадратных скобок
        const regex = /(\[\[.*?]])/g;

        // Используем метод match для поиска всех совпадений
        let matches = template.match(regex);

        let elements: string[] = matches ? matches : []; // Возвращаем массив найденных подстрок
        return {
            tpl: template.replace("[[", "<").replace("]]", ">"),
            elements,
        };
    }
}
