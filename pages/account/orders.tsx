import { getAllTaxons } from "../../lib/api/resources/taxon";
import { InferGetStaticPropsType } from 'next';
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';
import { ICustomer, ICustomerOrder } from '../../types/resources/customerTypes';
import { getCustomerFromCookie, getCustomerOrders } from "../../lib/api/resources/customer";
import { logoutCustomer } from "../../lib/resource/customer";
import AccountNav from '../../components/account/AccountNav';
import { formatDateToLocale } from "../../lib/config/dates";
import { formatPaymentState, formatShippingState } from '../../lib/resource/cart';
import MessageContext from "../../components/MessageContext";
import { Helmet } from "react-helmet";
import Breadcrumb from "../../components/layout/breadcrumb";
import { formatMoney } from "../../lib/config/money";
import LoadingContext from '../../components/LoadingContext';

const Orders = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const router = useRouter();
    const [customer, setCustomer] = useState< ICustomer | null>(null);
    const [orders, setOrders] = useState<ICustomerOrder[] | false>(false);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);    

    useEffect(() => {
        setMessage(null);
        (async () => {
            setLoading(true);
            const customer = await getCustomerFromCookie();

            if (customer) {
                setCustomer(customer);
                const orders =  await getCustomerOrders();
                setOrders(orders);
                setLoading(false);
            } else {
                setLoading(false);
                logoutCustomer(router);
            }
        })();
    }, []); 
    
    return (


        <Layout taxons={taxons}>

            <Helmet>
                <title>My orders | Cloralys Bijoux</title>
            </Helmet>

            <Breadcrumb title="My orders " parents={ [
                {
                    'title': ' My account',
                    'path': '/account'
                    
                }
            ]}/>

                <AccountNav current={"orders"}/>

                { customer &&
                    <>
                        <h3>Mes commandes</h3>
                        
                        { orders && orders.length > 0 ?
                            <table>
                                <tr>
                                    <th>Number</th>
                                    <th>Date</th>
                                    <th>Payment State</th>
                                    <th>Shipping state</th>
                                    <th>Amount</th>
                                </tr>
                                {orders.map((order, index) => {       
                                    return(
                                        <tr key={index}>
                                            <td>{order.number}</td>
                                            <td>{formatDateToLocale(order.createdAt)}</td>
                                            <td>{formatPaymentState(order.paymentState)}</td>
                                            <td>{formatShippingState(order.shippingState)}</td>
                                            <td>{formatMoney(order.total)}</td>
                                        </tr>
                                    );
                                })}
                            </table>
                        :
                            <p>You have not order yet</p>
                        }
                                
                    </>

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

export default Orders;