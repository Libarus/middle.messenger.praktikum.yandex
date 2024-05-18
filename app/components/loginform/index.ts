import Block from "../../modules/block";
// Ваш реализованный шаблонизатор
import Handlebars from "handlebars";
import { template } from "./template";

import Te from "../../modules/te";

import input from "../input.tmpl.ts";
import button from "../button.tmpl.ts";

Handlebars.registerPartial("input", input);
Handlebars.registerPartial("button", button);

export type TLoginFormState = {
    login_page_title: string;
    login_reg_link: string;
};

class LoginForm extends Block {
    constructor(props: TLoginFormState) {
        // Создаём враппер DOM-элемент form
        super("form", props);
    }

    render() {
        const tmpl = new Te(template);

        const tpl = Handlebars.compile(template);
        return tpl(this.props);
    }
}

export default LoginForm;
