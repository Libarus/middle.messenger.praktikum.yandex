import { TMessage } from './tmessage.ts';

export type TMessages = {
    id: number;
    datetime: string;
    messages: TMessage[];
};
