import LoginForm from "../../components/loginform";
import { render } from "../../utils/render-dom";

const form = new LoginForm({
    className: '111',
    child: '222'
});

// app — это class дива в корне DOM
render("#app", form);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    form.setProps({
        className: 'otherClass',
        child: 'Click me, please',
    });
}, 100); 