import { getAllTaxons } from "../../lib/api/resources/taxon";
import { InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout/Layout';
import { useContext, useEffect } from 'react';
import MessageContext from "../../components/MessageContext";
import { Helmet } from "react-helmet";
import Breadcrumb from "../../components/layout/breadcrumb";
import { removeOrderFromCookie } from '../../lib/api/resources/cart';

const PaymentConfirmation = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { setMessage } = useContext(MessageContext);
    
    useEffect(() => {
        setMessage(null);
        removeOrderFromCookie();
    }, []); 

    return (
        <Layout taxons={taxons}>

            <Helmet>
                <title>Confirmation | Cloralys Bijoux</title>
            </Helmet>

            <Breadcrumb
                title="Confirmation de commande"
                parents={[]}
            />

            <h2 className="mb-4">Thanks for your order!</h2> 
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

export default PaymentConfirmation;