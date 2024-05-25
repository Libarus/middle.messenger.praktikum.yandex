import IndexPage from '../../pages/index/index.ts';
import LoginFormPage from '../../pages/loginform/index.ts';
import RegPage from '../../pages/reg/index.ts';
import ProfilePage from '../../pages/profile/index.ts';
import ProfileEditPage from '../../pages/profileedit/index.ts';
import PasswordPage from '../../pages/password/index.ts';
import ChatListPage from '../../pages/chatlist/index.ts';
import ChatChatPage from '../../pages/chatchat/index.ts';
import Error500Page from '../../pages/error500/index.ts';
import Error404Page from '../../pages/error404/index.ts';

var getLocation = function (href: string) {
    var l = document.createElement('a');
    l.href = href;
    return l;
};
var l = getLocation(window.location.href);
let moduleName = l.pathname.toLowerCase().replace('/', '').replace('.html', '').trim();

switch (moduleName) {
    case '':
        new IndexPage('#app'); // Начальная страница
        break;
    case 'loginform':
        new LoginFormPage('#app'); // Форма авторизации
        break;
    case 'reg':
        new RegPage('#app'); // Форма регистрации
        break;
    case 'profile':
        new ProfilePage('#app'); // Профиль пользователя
        break;
    case 'profileedit':
        new ProfileEditPage('#app'); // Редактирование профиля
        break;
    case 'password':
        new PasswordPage('#app'); // Изменение пароля
        break;
    case 'error500':
        new Error500Page('#app'); // Страница 500й ошибки
        break;
    case 'chatlist':
        new ChatListPage('#app'); // Страница со списком чатов
        break;
    case 'chatchat':
        new ChatChatPage('#app'); // Страница с чатом
        break;
    default:
        new Error404Page('#app'); // Страница 404й ошибки
}
