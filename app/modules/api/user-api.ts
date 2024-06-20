import { TUser } from '../../shared/types/user';
import HTTP from '../http';
import BaseAPI from './base-api';

const apiInstance = new HTTP(`${BaseAPI.host}/api/v2/user`);

export default class UserAPI extends BaseAPI {
    updateuser(user: TUser): Promise<unknown> {
        return apiInstance.put('/profile', { data: user });
    }

    updateavatar(formData: FormData): Promise<unknown> {
        return apiInstance.put('/profile/avatar', { data: formData });
    }
}
