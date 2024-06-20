import { TUser } from './user';

export type TLastMessage = {
    user: TUser;
    time: string;
    content: string;
};

export type TChat = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: TLastMessage;
};

export type TChatItem = {
    id: number;
    name: string;
    message: string;
    self: boolean;
    datetime: string;
    unread: number;
    avatar: string;

    selected?: boolean;
};

export type TChatMessage = {
    id: number;
    type: string;
    chat_id: 11923;
    user_id: number;
    content: string;
    file: unknown;
    is_read: boolean;
    time: string;
};
