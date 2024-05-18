import Block from "../../modules/block";
import { template } from "./template";

export default class Link extends Block {
    constructor(props: any) {
        super("a", props);
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
