//const moduleName = "loginform"; // Форма авторизации
//const moduleName = "reg"; // Форма авторизации
//const moduleName = "profile"; // Профиль
//const moduleName = "profileedit"; // Редактирование профиля
//const moduleName = "password"; // Редактирование пароля
//const moduleName = "error500"; // Ошибка 500
//const moduleName = "error404"; // Ошибка 404
//const moduleName = "chatlist"; // Список чатов
const moduleName = "chatchat"; // Список чатов + чат
const moduleLink = `../../pages/${moduleName}`;
import(moduleLink).then((page: any): void => {
    new page.default("#app");
});
