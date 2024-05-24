import { IMessage } from "./imessage";

export interface IMessages {
    id: number;
    datetime: string;
    messages: IMessage[];
}
