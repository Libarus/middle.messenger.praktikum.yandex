import HTTP from '../http.ts';
import BaseAPI from './base-api.ts';

const authApiInstance = new HTTP(`${BaseAPI.host}/api/v2/chats`);

export default class ChatAPI extends BaseAPI {
    createchat(title: string): Promise<unknown> {
        return authApiInstance.post('/', { data: { title } });
    }

    addusers(data: any): Promise<unknown> {
        return authApiInstance.put('/users', { data });
    }

    getchats(): Promise<unknown> {
        return authApiInstance.get('/');
    }

    gettoken(chatId: number): Promise<string> {
        return authApiInstance
            .post(`/token/${chatId}`, { data: {} })
            .then((response: any) => JSON.parse(response.response).token);
    }
}
