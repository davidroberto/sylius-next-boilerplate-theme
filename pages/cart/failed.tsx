import { getAllTaxons } from "../../lib/api/resources/taxon";
import { InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout/Layout';
import { useContext, useEffect } from 'react';
import MessageContext from "../../components/MessageContext";
import { Helmet } from "react-helmet";
import Breadcrumb from "../../components/layout/breadcrumb";
import { removeOrderFromCookie } from '../../lib/api/resources/cart';

const PaymentFailed = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { setMessage } = useContext(MessageContext);
    
    useEffect(() => {
        removeOrderFromCookie();
        setMessage(null);
    }, []); 

    return (
        <Layout taxons={taxons}>

        <Helmet>
            <title>Order fail</title>
        </Helmet>
        
        <Breadcrumb
            title="Order fail"
            parents={[]}
        />

        <h2>Your order have failed</h2> 
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

export default PaymentFailed;