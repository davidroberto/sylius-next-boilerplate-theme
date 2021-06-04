import { InferGetStaticPropsType } from "next";
import { getAllTaxons } from "../lib/api/resources/taxon";
import Layout from "../components/layout/Layout";
import { useContext, useEffect, useState } from 'react';
import MessageContext from "../components/MessageContext";
import { Helmet } from 'react-helmet';
import Breadcrumb from "../components/layout/breadcrumb";
import LoadingContext from '../components/LoadingContext';
import { submitForgottenPassword, submitNewPasswordAfterForgot } from '../lib/resource/customer';
import { useRouter } from "next/router";
import { getQueryParam } from "../lib/router/router";

const ForgottenPassword = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext); 
    const [ token, setToken ] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setMessage(null);
        (async () => {
            const token = getQueryParam("token") 
            if (token) {
                setToken(token);
            }
        })();
    }, []); 
    
    const onSubmitForgottenPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        const isMailSent = await submitForgottenPassword(event);
        setLoading(false);

        if (isMailSent) {
            setMessage({
                'message': "If your account exists, you will receive an email with the instruction to reset your password",
                'type': 'success'
            });
        } else {
            setMessage({
                'message': "We can't reset your password",
                'type': 'error'
            });
        }
    }

    const onSubmitNewPasswordAfterForgot = async (event: React.FormEvent<HTMLFormElement>) => {
        if (token) {
            setLoading(true);
            const isNewPasswordSet = await submitNewPasswordAfterForgot(event, token);
            setLoading(false);
    
            if (isNewPasswordSet) {
                setMessage({
                    'message': "You can now login with your new password",
                    'type': 'success'
                });
                router.push('/account/login');
            } else {
                setMessage({
                    'message': "The password have not been updated, the URL is invalid or expired",
                    'type': 'error'
                });
            }
        }
    }

    return (
        <Layout taxons={taxons}>

            <Helmet>
                <title>Forgotten password</title>
            </Helmet>
                
            <Breadcrumb
                title="Forgotten password"
                parents={[]}
            />

            {token ?
                <form onSubmit={(event) => onSubmitNewPasswordAfterForgot(event)}>
                    <label htmlFor="newPassword">New password*</label>
                    <input type="password" name="newPassword" required />

                    <button type="submit">
                        <span>Submit the new password</span>
                    </button>
                </form> 
            :
                <>
                    <h4>Reset your pawssword</h4> 
                    <form onSubmit={(event) => onSubmitForgottenPassword(event)}>
                        <label htmlFor="email">Email*</label>
                        <input required={true} type="text" name="email" />
                        <button type="submit">
                            <span>Reset</span>
                        </button>
                    </form>

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

export default ForgottenPassword;