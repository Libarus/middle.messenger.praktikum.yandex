import Helpers from '../../utils/helpers.ts';
import HTTP from '../http.ts';
import BaseAPI from './base-api.ts';

const authApiInstance = new HTTP(`${BaseAPI.host}/api/v2/chats`);

export default class ChatAPI extends BaseAPI {
    createchat(title: string): Promise<XMLHttpRequest> {
        return authApiInstance.post('/', { data: { title } });
    }

    addusers(data: any): Promise<XMLHttpRequest> {
        return authApiInstance.put('/users', { data });
    }

    removeusers(data: any): Promise<XMLHttpRequest> {
        return authApiInstance.delete('/users', { data });
    }

    getusers(chatId: number): Promise<XMLHttpRequest> {
        return authApiInstance.get(`/${chatId}/users`);
    }

    getchats(): Promise<XMLHttpRequest> {
        return authApiInstance.get('/');
    }

    gettoken(chatId: number): Promise<string> {
        return authApiInstance.post(`/token/${chatId}`, { data: {} }).then((response: any) => {
            let data;

            try {
                data = JSON.parse(response.response);
            } catch (err) {
                Helpers.Log(
                    'ERROR',
                    `[chat-api gettoken] Ошибка преобразования в JSON строки: ${response.response}`
                );
                return '';
            }

            return data.token;
        });
    }
}
