import Block from "../../modules/block";
import { template } from "./template";

//import Te from "../../modules/te";

export default class CompName extends Block {
    constructor(props: any) {
        // Создаём враппер DOM-элемент form
        super("form", props);
    }

    render() {
        console.info(template);
        //const tmpl = new Te(template);
    }
}
