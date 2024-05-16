import LoginForm from "../../components/loginform";
import { render } from "../../utils/render-dom";

const form = new LoginForm({
    login_page_title: 'Вход',
    login_reg_link: 'Нет аккаунта?'
});

// app — это class дива в корне DOM
render("#app", form);

/*
// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    form.setProps({
        login_page_title: 'Вход',
    });
}, 100); 
*/