import { createContext } from 'react';
import { IMessage } from '../types/resources/common';

interface IMessageContext {
    message: IMessage | null,
    setMessage: (message: IMessage | null ) => void
}

const MessageContext = createContext(<IMessageContext>{
    message: null,
    setMessage: (message: IMessage | null ) => {}
});


export default MessageContext;