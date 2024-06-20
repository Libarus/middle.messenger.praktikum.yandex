import isEqual from '../utils/isequal';
import renderDom from '../utils/render-dom';
import Block from './block';

export default class Route<TProps extends Record<string, any> = any> {
    //
    private pathname: string;

    private blockClass: typeof Block;

    private block: Block | null;

    private props: TProps;

    constructor(pathname: string, view: typeof Block, props: TProps = {} as TProps) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
    }

    leave() {
        if (this.block) {
            this.block.hide();
        }
    }

    match(pathname: string) {
        const paths1 = pathname.split('/');
        const paths2 = this.pathname.split('/');
        return isEqual(`/${paths1[1]}`, `/${paths2[1]}`);
    }

    render(values: string[]) {
        const keys: string[] = this.pathname.split('/:').splice(1);

        let params: Record<string, unknown> = {};

        // Копируем свойства из массива ключей в объект
        keys.forEach((key, index) => {
            // Используем индекс массива для доступа к соответствующему значению в массиве значений
            params[key] = values[index] ? values[index] : null;
        });

        if (!this.block) {
            this.block = new this.blockClass();
            renderDom(this.props.selector, this.block);
            this.block.setParams(params);
            this.block.afterInit();
            return;
        }

        this.block.setParams(params);
        this.block.afterInit();
        this.block.show();
    }
}
