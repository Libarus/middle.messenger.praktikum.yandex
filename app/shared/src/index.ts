import IndexPage from "../../pages/index";
import LoginFormPage from "../../pages/loginform";
import RegPage from "../../pages/reg";
import ProfilePage from "../../pages/profile";
import ProfileEditPage from "../../pages/profileedit";
import PasswordPage from "../../pages/password";
import ChatListPage from "../../pages/chatlist";
import ChatChatPage from "../../pages/chatchat";
import Error500Page from "../../pages/error500";
import Error404Page from "../../pages/error404";

//const moduleName = "index"; // Форма авторизации
//const moduleName = "loginform"; // Форма авторизации
//const moduleName = "reg"; // Форма авторизации
//const moduleName = "profile"; // Профиль
//const moduleName = "profileedit"; // Редактирование профиля
//const moduleName = "password"; // Редактирование пароля
//const moduleName = "error500"; // Ошибка 500
//const moduleName = "error404"; // Ошибка 404
//const moduleName = "chatlist"; // Список чатов
//const moduleName = "chatchat"; // Список чатов + чат

var getLocation = function (href: string) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};
var l = getLocation(window.location.href);
let moduleName = l.pathname.toLowerCase().replace("/", "").replace(".html", "").trim();

switch (moduleName) {
    case "":
        new IndexPage("#app");
        break;
    case "loginform":
        new LoginFormPage("#app");
        break;
    case "reg":
        new RegPage("#app");
        break;
    case "profile":
        new ProfilePage("#app");
        break;
    case "profileedit":
        new ProfileEditPage("#app");
        break;
    case "password":
        new PasswordPage("#app");
        break;
    case "error500":
        new Error500Page("#app");
        break;
    case "chatlist":
        new ChatListPage("#app");
        break;
    case "chatchat":
        new ChatChatPage("#app");
        break;
    default:
        new Error404Page("#app");
}
