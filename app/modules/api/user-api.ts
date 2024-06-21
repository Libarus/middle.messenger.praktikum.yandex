import { TUser } from '../../shared/types/user.ts';
import HTTP from '../http.ts';
import BaseAPI from './base-api.ts';

const apiInstance = new HTTP(`${BaseAPI.host}/api/v2/user`);

export default class UserAPI extends BaseAPI {
    updateuser(user: TUser): Promise<unknown> {
        return apiInstance.put('/profile', { data: user });
    }

    updateavatar(formData: FormData): Promise<unknown> {
        return apiInstance.put('/profile/avatar', { data: formData });
    }
}
