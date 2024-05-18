import Block from "../../modules/block";
import { template } from "./template";

export default class Ul extends Block {
    constructor(props: any) {
        super("ul", props);
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.props);
    }
}
