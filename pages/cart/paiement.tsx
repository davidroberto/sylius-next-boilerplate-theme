import { getAllTaxons } from '../../lib/api/resources/taxon';
import { InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout/Layout';
import CartItems from '../../components/cart/CartItems';
import CartContext from '../../components/CartContext';
import { useContext, useEffect } from 'react';
import { formatMoney } from '../../lib/config/money';
import { completeCart, createStripeCheckoutSession, removeOrderFromCookie } from '../../lib/api/resources/cart';
import getStripe from '../../lib/payment/getStripe';
import MessageContext from '../../components/MessageContext';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../components/layout/breadcrumb';
import CartResume from '../../components/cart/CartResume';
import LoadingContext from '../../components/LoadingContext';


const Payment = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { cart } = useContext(CartContext);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);    

    useEffect(() => {
        setMessage(null);
        setLoading(false);
    }, []);

    const onCompleteSubmit = async (cartToken: string) => {
        setLoading(true);
        const order = await completeCart(cartToken);

        if (order) {

            removeOrderFromCookie();
            
            const stripe = await getStripe();

            const session = await createStripeCheckoutSession(cartToken);

            setLoading(false);

            const result = await stripe?.redirectToCheckout({
                sessionId: session.id,
            });
        } else {
            setMessage({
                'message': "This order have been already paid or cancelled",
                'type': 'success'
            });
            removeOrderFromCookie();
        }

        setLoading(false);
    }

    return (

        <Layout taxons={taxons}>

            <Helmet>
                <title>Confirmation | Cloralys Bijoux</title>
            </Helmet>

            <Breadcrumb
                title="Paiement"
                parents={[
                    {
                        'title': 'My cart',
                        'path': '/panier'
                    }
                ]}
            />

            {cart && cart.items.length > 0 ?
                <>
                    <CartItems cart={cart}/>
                    <CartResume cart={cart} customer={null}/>
                    <button onClick={() => onCompleteSubmit(cart.tokenValue)}>
                        Payment
                    </button>
                </>
            :
                <p>You have no current order</p>
            }

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

export default Payment;
