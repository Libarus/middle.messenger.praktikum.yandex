import AuthAPI from '../modules/api/auth-api';
import Router from '../modules/router';
import { TSignUpRequest } from '../shared/types/user';

const authApi = new AuthAPI();

export default class UserRegController {
    public async reg(data: TSignUpRequest) {
        try {
            console.info(data);
            await authApi.create(data).then(
                (response: any) => {
                    console.info('XXXXXXXX', response.status);
                },
                (error: any) => {
                    console.info('ERROR', error.response);
                }
            );
        } catch (error) {
            // Логика обработки ошибок
            // TODO: Логирование ошибок
            Router.instance.go('/error500');
        }
    }
}
