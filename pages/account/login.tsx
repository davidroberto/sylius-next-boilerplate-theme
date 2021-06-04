import { getAllTaxons } from "../../lib/api/resources/taxon";
import { InferGetStaticPropsType } from 'next';
import Layout from "../../components/layout/Layout";
import { logoutCustomer, storeCustomerToken, submitConnexion } from "../../lib/resource/customer";
import { useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import { getCustomerFromCookie } from '../../lib/api/resources/customer';
import MessageContext from "../../components/MessageContext";
import { Helmet } from "react-helmet";
import Breadcrumb from "../../components/layout/breadcrumb";
import Link from "next/link";
import LoadingContext from '../../components/LoadingContext';

const Connexion = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const router = useRouter();
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);    

    const onSubmitConnexion = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        const customerToken = await submitConnexion(event);
        setLoading(false);
        
        if (!customerToken) {
            setMessage({
                'message': 'Your credentials are not valid',
                'type': 'error'
            });
        } else {
            storeCustomerToken(customerToken.token);
            router.push('/account');
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            const customer = await getCustomerFromCookie();
            setLoading(false);
            
            if (customer) {
                router.push('/account');
            } else {
                logoutCustomer(router);
            }
        })();
    }, []); 

    return (
        <Layout taxons={taxons}>
           
            <Helmet>
                <title>Connexion</title>
            </Helmet>

            <Breadcrumb title="Connexion" parents={[ ]} />

            <h3 className="nav-link">Login</h3>

            <form onSubmit={(event) => onSubmitConnexion(event)}>   
                <label htmlFor="email">Email*</label>
                <input type="text" name="email" required />

                <label htmlFor="password">Password*</label>
                <input type="password" name="password" required />

                <button type="submit">
                    <span>Login</span>
                </button>

                <Link href={'/forgotten-password'}>
                    <a>Have you forgotten your password?</a>
                </Link>

            </form>
            <p>You don't have an account yet?</p>
            <Link href={'/account/register'}>
                <a>
                    <button >Register</button>
                </a>
            </Link>

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

export default Connexion;