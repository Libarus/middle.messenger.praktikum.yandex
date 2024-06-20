import { TSignInRequest, TSignUpRequest, TUser } from '../../shared/types/user';
import HTTP from '../http';
import Router from '../router';
import BaseAPI from './base-api';

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
            return JSON.parse(response.response);
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
