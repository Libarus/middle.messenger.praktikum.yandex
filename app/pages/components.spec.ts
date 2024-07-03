import { expect } from 'chai';

import LoginFormPage from './loginform/index.ts';
import MessengerPage from './messenger/index.ts';
import ProfilePage from './profile/index.ts';
import ProfileEditPage from './profileedit/index.ts';
import PasswordPage from './password/index.ts';
import Error404Page from './error404/index.ts';
import Error500Page from './error500/index.ts';
import RegPage from './reg/index.ts';

describe('Компоненты', () => {
    it("должен создать LoginFormPage с заголовком страницы 'Авторизация' ", () => {
        new LoginFormPage();
        expect(document.title).equal('Авторизация');
    });

    it("должен создать MessengerPage с заголовком страницы 'Чат' ", () => {
        new MessengerPage();
        expect(document.title).equal('Чат');
    });

    it("должен создать ProfilePage с заголовком страницы 'Профиль' ", () => {
        new ProfilePage();
        expect(document.title).equal('Профиль');
    });

    it("должен создать ProfileEditPage с заголовком страницы 'Редактирование профиля' ", () => {
        new ProfileEditPage();
        expect(document.title).equal('Редактирование профиля');
    });

    it("должен создать PasswordPage с заголовком страницы 'Изменение пароля' ", () => {
        new PasswordPage();
        expect(document.title).equal('Изменение пароля');
    });

    it("должен создать RegPage с заголовком страницы 'Регистрация' ", () => {
        new RegPage();
        expect(document.title).equal('Регистрация');
    });

    it("должен создать Error404Page с заголовком страницы '404 ошибка' ", () => {
        new Error404Page();
        expect(document.title).equal('404 ошибка');
    });

    it("должен создать Error500Page с заголовком страницы '500 ошибка' ", () => {
        new Error500Page();
        expect(document.title).equal('500 ошибка');
    });
});
