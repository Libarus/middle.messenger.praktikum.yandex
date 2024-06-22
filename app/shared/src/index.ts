import LoginFormPage from '../../pages/loginform/index.ts';
import RegPage from '../../pages/reg/index.ts';
import ProfilePage from '../../pages/profile/index.ts';
import ProfileEditPage from '../../pages/profileedit/index.ts';
import PasswordPage from '../../pages/password/index.ts';
import Error500Page from '../../pages/error500/index.ts';
import Error404Page from '../../pages/error404/index.ts';
import Router from '../../modules/router.ts';
import MessengerPage from '../../pages/messenger/index.ts';

const router = new Router('#app');

// Можно обновиться на /user и получить сразу пользователя
router
    .use('/', LoginFormPage)
    .use('/sign-up', RegPage)
    .use('/profile', ProfilePage)
    .use('/settings', ProfileEditPage)
    .use('/password', PasswordPage)
    .use('/messenger/:id', MessengerPage)

    .use('/error500', Error500Page)
    .use('/error404', Error404Page)

    .start()
    .updateLinks();
