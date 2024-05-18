import Block from "../../modules/block";
import { template } from "./template";

export default class Button extends Block {
    constructor(props: any) {
        super("button", props);
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
