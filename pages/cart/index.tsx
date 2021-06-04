import { getAllTaxons } from '../../lib/api/resources/taxon';
import { InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout/Layout';
import { useContext, useState, useEffect } from 'react';
import CartContext from '../../components/CartContext';
import { deleteCart } from '../../lib/api/resources/cart';
import CartItems from '../../components/cart/CartItems';
import { submitCoupon } from '../../lib/resource/cart';
import { getCustomerFromCookie } from '../../lib/api/resources/customer';
import { ICustomer } from '../../types/resources/customerTypes';
import MessageContext from '../../components/MessageContext';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../components/layout/breadcrumb';
import CartResume from '../../components/cart/CartResume';
import Link from 'next/link';
import LoadingContext from '../../components/LoadingContext';

const Cart = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { cart, setCart } = useContext(CartContext);
    const [customer, setCustomer] = useState< ICustomer | null>(null);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);    

    useEffect(() => {
        setMessage(null);
    }, []);

    const onDeleteCart = async (cartToken: string) => {
        setLoading(true);
        const isOrderDeleted = await deleteCart(cartToken);
        setLoading(false);

        if (isOrderDeleted) {
            setCart(null);
        }
    }

    const onSubmitCoupon = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        const orderUpdated = await submitCoupon(event);
        setLoading(false);
        
        if (orderUpdated.orderPromotionTotal != 0) {
            setCart(orderUpdated);
            setMessage({
                'message': 'Your discount code has been applied',
                'type': 'success'
            });
        } else {
            setMessage({
                'message': "Your discount code is not valid",
                'type': 'error'
            });
        }
        
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            const customer = await getCustomerFromCookie();
            setLoading(false);

            if (customer) {
                setCustomer(customer);
            }
        })();
    }, []); 

    return (
        <Layout taxons={taxons}>

            <Helmet>
                <title>Cart</title>
            </Helmet>

            <Breadcrumb 
                title="My cart"
                parents={[]}
            />

            <CartItems cart={cart}/>

            {cart && cart.items.length > 0 &&
                <>
                    <form onSubmit={(event) => {onSubmitCoupon(event)}}>
                        <input type="text" name="coupon_code" placeholder="coupon code" />
                        <button type="submit">Apply</button>
                    </form>

                    <button onClick={() => onDeleteCart(cart.tokenValue)} >
                        <span>Clear the cart</span>
                    </button>

                </>
            }

            <CartResume cart={cart} customer={customer}/>

            { customer ?
                <Link href={'/cart/adresses'}>
                    <a>Submit the cart</a>
                </Link>
            :
                <>
                    <Link href={'/account/login'}>
                        <a>Submit the cart with your customer account</a>
                    </Link>
                    <p>or</p>
                    <Link href={'/cart/adresses'}>
                        <a>Submit the cart without login</a>
                    </Link>
                </>
            }

            <div>
                <Link href={'/'}> 
                    <a>
                        <span>Keep shopping</span>
                    </a>
                </Link>
            </div>

        </Layout>
    );
}

export const getStaticProps = async () => {

    const taxons = await getAllTaxons();

    return {
        props: {
            taxons
        }
    }
}

export default Cart;