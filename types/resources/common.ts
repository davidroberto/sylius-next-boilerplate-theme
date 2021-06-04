export interface IResource {
    translations: {
        [key: string]: any
    }
}

export interface IMessage {
    message: string;
    type: string;
}