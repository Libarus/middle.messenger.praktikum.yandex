import Block from "../../modules/block";
import { template } from "./template";

export default class ProfileItems extends Block {
    constructor(props: any = {}) {
        super("div", props);
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
