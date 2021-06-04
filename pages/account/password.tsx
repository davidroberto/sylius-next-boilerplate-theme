import { getAllTaxons } from "../../lib/api/resources/taxon";
import { InferGetStaticPropsType } from 'next';
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';
import { ICustomer } from '../../types/resources/customerTypes';
import { getCustomerFromCookie } from "../../lib/api/resources/customer";
import { logoutCustomer, submitNewPassword } from "../../lib/resource/customer";
import AccountNav from "../../components/account/AccountNav";
import MessageContext from "../../components/MessageContext";
import { Helmet } from "react-helmet";
import Breadcrumb from "../../components/layout/breadcrumb";
import LoadingContext from '../../components/LoadingContext';

const Password = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const router = useRouter();
    const [customer, setCustomer] = useState<ICustomer | null>(null);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);    

    useEffect(() => {
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
    }, []); 

    const onModifyPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        const isPasswordModified = await submitNewPassword(event);
        setLoading(false);

        if (isPasswordModified) {
            setMessage({
                'message': "the password has been updated. You can now login" ,
                'type': 'success'
            });
            logoutCustomer(router);
        } else {
            setMessage({
                'message': "The password has not been updated. Check that the confirmation is valid and the new password is not the same as the old one",
                'type': 'error'
            });
        }
    }
    
    return (

        <Layout taxons={taxons}>

            <Helmet>
                <title>My password</title>
            </Helmet>
           
            <Breadcrumb title="My password" parents={ [
                {
                    'title': 'My account',
                    'path': '/account'
                    
                }
            ]}/>
        
            <ul role="tablist">
                <AccountNav current={"password"}/>

                { customer &&
                    <>
                        <h3 className="mb-3">Modify the password</h3>
                    
                        <form onSubmit={(event) => onModifyPassword(event)}>
                            
                            <label htmlFor="newPassword">New password*</label>
                            <input required={true} type="password" name="newPassword" />
                        
                            <label htmlFor="confirmNewPassword">Confirm the new password*</label>
                            <input required={true} type="password" name="confirmNewPassword" />
                                                                        
                            <label htmlFor="currentPassword">Old password*</label>
                            <input required={true} type="password" name="currentPassword" />
                            
                            <button type="submit">
                                <span>Submit</span>
                            </button>
                        </form>
                    </>                                     
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

export default Password;