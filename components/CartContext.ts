import { createContext } from 'react';
import { IOrder } from '../types/resources/orderTypes';

interface ICartContext {
    cart: IOrder | null,
    setCart: (order: IOrder | null ) => void
}

const CartContext = createContext(<ICartContext>{
    cart: null,
    setCart: (order: IOrder | null ) => {}
});


export default CartContext;