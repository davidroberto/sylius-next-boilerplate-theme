import { getAllTaxons } from "../../lib/api/resources/taxon";
import { InferGetStaticPropsType } from 'next';
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';
import { ICustomer } from '../../types/resources/customerTypes';
import { getCustomerFromCookie } from "../../lib/api/resources/customer";
import { logoutCustomer } from "../../lib/resource/customer";
import AccountNav from '../../components/account/AccountNav';
import MessageContext from "../../components/MessageContext";
import { Helmet } from "react-helmet";
import Breadcrumb from "../../components/layout/breadcrumb";
import LoadingContext from '../../components/LoadingContext';

const Account = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const router = useRouter();
    const [customer, setCustomer] = useState< ICustomer | null>(null);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);    

    useEffect(() => {
        setLoading(true);
        setMessage(null);
        (async () => {
            setLoading(true);
            const customer = await getCustomerFromCookie();
            setLoading(false);
            
            if (customer) {
                setCustomer(customer);
            } else {
                logoutCustomer(router);
            }
        })();
        setLoading(false);
    }, []); 
    
    return (
        <Layout taxons={taxons}>

            <Helmet>
                <title>My account</title>
            </Helmet>

            <Breadcrumb title="My account" parents={[]}/>

            <ul role="tablist">
                <AccountNav current={"account"}/>

                { customer &&
                    <div>
                        <p>Bonjour <span className="font-weight-normal text-dark">{customer.firstName} {customer.lastName} ({customer.email})</span></p>
                        <p>Depuis votre compte vous pouvez voir vos informations, voir votre historique de commandes et modifier votre mot de passe.</p>
                    </div>
                }
            </ul>
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

export default Account;