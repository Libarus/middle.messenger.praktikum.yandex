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
