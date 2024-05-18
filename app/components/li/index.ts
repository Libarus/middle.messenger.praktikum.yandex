import Block from "../../modules/block";
import { template } from "./template";

export default class Li extends Block {
    constructor(props: any) {
        super("li", props);
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
