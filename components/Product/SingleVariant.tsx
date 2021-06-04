import { submitCart } from '../../lib/resource/cart';
import { IProduct } from '../../types/resources/productTypes';
import CartContext from '../CartContext';
import { useContext, useState } from 'react';
import MessageContext from '../MessageContext';
import LoadingContext from '../LoadingContext';
import { removeOrderFromCookie } from '../../lib/api/resources/cart';


type VariantsProps = {
    product: IProduct
}

const SingleVariant = ({product}: VariantsProps): JSX.Element => {
    
    const { setCart } = useContext(CartContext);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);

    const onSubmitCart = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        const order = await submitCart(event);

        if (order) {
            setLoading(false);
            setMessage({
                'message': 'The product has been added to your cart',
                'type': 'success'
            });
            setCart(order);
        } else {
            removeOrderFromCookie();
            const order = await submitCart(event);
            setLoading(false);
            
            if (order) {
                setMessage({
                    'message': 'The product has been added to your cart',
                    'type': 'success'
                });
                setCart(order);
            } else {
                setMessage({
                    'message': "The product can't be added to your cart",
                    'type': 'error'
                });
            }
        }
        
    }

    return (
        <>
            <form onSubmit={(event) => {onSubmitCart(event)}}>
                <input type="number" name="quantity" id="qty" defaultValue="1" min="1" max="100" step="1"/>
                <input type="hidden" name="product_code" value={product.code}/>
                <input type="hidden" name="product_variant_code" value={product.variants[0].code}/>
                <button  type="submit"><span>Add to cart</span></button>
            </form>
        </>
    );
}

export default SingleVariant;