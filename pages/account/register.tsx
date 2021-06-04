import { getAllTaxons } from "../../lib/api/resources/taxon";
import { InferGetStaticPropsType } from 'next';
import Layout from "../../components/layout/Layout";
import { logoutCustomer, submitRegister, removeCustomerTokenFromCookie } from '../../lib/resource/customer';
import { useContext, useEffect } from 'react';
import { useRouter } from "next/router";
import MessageContext from "../../components/MessageContext";
import { Helmet } from "react-helmet";
import Breadcrumb from "../../components/layout/breadcrumb";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Link from "next/link";
import { getCustomerFromCookie } from '../../lib/api/resources/customer';
import LoadingContext from '../../components/LoadingContext';

const Register = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const router = useRouter();
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);    

    useEffect(() => {
        setMessage(null);

        (async () => {
            setLoading(true);
            const customer = await getCustomerFromCookie();
            setLoading(false);

            if (customer) {
                router.push('/account');
            } else {
                removeCustomerTokenFromCookie();
            }
        })();

    }, []);

    const onSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        const isCustomerCreated = await submitRegister(event);
        setLoading(false);

        if (isCustomerCreated) {
            setMessage({
                'message': "Your account is created. You can now login",
                'type': 'success'
            });
            logoutCustomer(router);
        } else {
            setMessage({
                'message': "The account can't be created. Check that all the fields have been filled and that the email is not already used with another account",
                'type': 'error'
            });
        }
    }

    return (
        <Layout taxons={taxons}>

            <Helmet>
                <title>Register</title>
            </Helmet>

            <Breadcrumb title="Register" parents={[]} />

            <h3 className="nav-link">Register</h3>

            <form onSubmit={(event) => onSubmitRegister(event)}>
                <label htmlFor="firstName">Firstname*</label>
                <input required={true} type="text" name="firstName" />
            
                <label htmlFor="lastName">Lastname*</label>
                <input required={true} type="text" name="lastName" />
            
                <label htmlFor="email">Email*</label>
                <input required={true} type="text" name="email" />
            
                <label htmlFor="password">Password*</label>
                <input required={true} type="password" name="password" />
            
                <button type="submit">
                    <span>Register</span>
                </button>
            </form>

            <p >You already have an account?</p>
            <Link href={'/account/login'}>
                <a>
                    <button>Login</button>
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

export default Register;