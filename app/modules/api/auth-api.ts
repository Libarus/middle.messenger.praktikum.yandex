import { TSignInRequest, TSignUpRequest, TUser } from '../../shared/types/user.ts';
import Helpers from '../../utils/helpers.ts';
import HTTP from '../http.ts';
import Router from '../router.ts';
import BaseAPI from './base-api.ts';

const authApiInstance = new HTTP(`${BaseAPI.host}/api/v2/auth`);

export default class AuthAPI extends BaseAPI {
    signup(data: TSignUpRequest): Promise<unknown> {
        return authApiInstance.post('/signup', { data });
    }

    signin(data: TSignInRequest): Promise<unknown> {
        return authApiInstance.post('/signin', { data });
    }

    getuser(): Promise<TUser> {
        return authApiInstance.get('/user').then((response: any) => {
            let data;

            try {
                data = JSON.parse(response.response);
            } catch (err) {
                Helpers.Log(
                    'ERROR',
                    `[auth-api.getuser] Ошибка преобразования в JSON строки: ${response.response}`
                );
            }

            return data;
        });
    }

    logout() {
        authApiInstance.post('/logout', { data: {} }).then(
            () => Router.instance.go('/'),
            () => Router.instance.go('/')
        );
    }

    isAuth(): Promise<boolean> {
        return authApiInstance.get('/user').then(
            () => true,
            () => false
        );
    }
}
