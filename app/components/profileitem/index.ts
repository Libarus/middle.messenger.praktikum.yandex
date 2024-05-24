import Block from "../../modules/block";
import { template } from "./template";

export default class ProfileItems extends Block {
    constructor(props: any = {}) {
        super("div", Object.assign({ attrib: { class: "profile-item" } }, props));
    }

    render(): HTMLElement {
        super.render();
        return this.compile(template, this.Props);
    }
}
