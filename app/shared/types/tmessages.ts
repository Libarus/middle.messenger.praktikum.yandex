import { TMessage } from './tmessage';

export type TMessages = {
    id: number;
    datetime: string;
    messages: TMessage[];
};
