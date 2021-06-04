import { AppProps } from 'next/app';
import React, {useState} from 'react';
import CartContext from '../components/CartContext';
import MessageContext from '../components/MessageContext';
import { IMessage } from '../types/resources/common';
import { IOrder } from '../types/resources/orderTypes';

import LoadingContext from '../components/LoadingContext';


function MyApp({ Component, pageProps }: AppProps) {
  
  const [cart, setCart] = useState<IOrder | null>(null);
  const cartValue = {cart, setCart}

  const [message, setMessage] = useState<IMessage | null>(null);
  const messageValue = {message, setMessage}

  const [isLoading, setLoading] = useState<boolean>(false);
  const loadingValue = {isLoading, setLoading}

  return(
      <CartContext.Provider value={cartValue}>
        <MessageContext.Provider value={messageValue}>
          <LoadingContext.Provider value={loadingValue}>
            <Component {...pageProps} />
          </LoadingContext.Provider>
        </MessageContext.Provider>
      </CartContext.Provider>
  )

}


export default MyApp
