import Block from '../../modules/block';
// Ваш реализованный шаблонизатор
import Handlebars from 'handlebars';
import { template } from './template';

class LoginForm extends Block {

    constructor(props: any) {
        // Создаём враппер DOM-элемент form
        super("form", props);
    }

    render() {
        const tpl = Handlebars.compile(template);
        console.info('Render template', template);
        return tpl(this.props);
    }
} 

export default LoginForm;