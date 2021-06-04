import { getAllTaxons } from '../../lib/api/resources/taxon';
import { InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout/Layout';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../components/CartContext';
import { useRouter } from 'next/router';
import { canOrderComplete, submitAddresses } from '../../lib/resource/cart';
import { getCustomerFromCookie } from '../../lib/api/resources/customer';
import { ICustomer } from '../../types/resources/customerTypes';
import MessageContext from '../../components/MessageContext';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../components/layout/breadcrumb';
import CartResume from '../../components/cart/CartResume';
import LoadingContext from '../../components/LoadingContext';
import { getCountries } from '../../lib/api/resources/country';
import { getName as getCountryName, registerLocale as registerCountryLocale } from 'i18n-iso-countries';
import { checkIfUserExist } from '../../lib/resource/customer';
import { ICountry } from '../../types/resources/countryTypes';

const Addresses = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { cart, setCart } = useContext(CartContext);
    const router = useRouter();
    const [customer, setCustomer] = useState< ICustomer | null>(null);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);    
    const [ countries, setCountries ] = useState<ICountry[]>([]);

    useEffect(() => {
        setLoading(true);

        (async () => {
            const countriesShipping = await getCountries();
            setCountries(countriesShipping);
        })();

        registerCountryLocale(require("i18n-iso-countries/langs/fr.json"));
        setMessage(null);
        setLoading(false);
    }, []); 

    const onSubmitAddresses = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);

        const emailExists = await checkIfUserExist(event)

        if (!emailExists || customer) {
            const order = await submitAddresses(event);

            if (order) {
                setCart(order);

                if (canOrderComplete(order)) {
                    router.push('/cart/paiement');
                } else {
                    setMessage({
                        'message': "Your cart cannot be submitted",
                        'type': 'error'
                    });
                }
                
            } else {
                setMessage({
                    'message': "Your adress cannot be registered",
                    'type': 'error'
                });
            }
        } else {
            setLoading(false);
            setMessage({
                'message': "This email is already used with a customer account. Please login",
                'type': 'error'
            });
            
            setTimeout(function(){
                setMessage(null);
            }, 10000);
        }
        setLoading(false);
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
        setLoading(false);

    }, []); 

    return (

        <Layout taxons={taxons}>

            <Helmet>
                <title>Panier | Cloralys Bijoux</title>
            </Helmet>

            <Breadcrumb
                title="My  shipping address"
                parents={[
                    {
                        'title': 'My cart',
                        'path': '/cart'
                    }
                
                ]}
            />

                            
            {cart && cart.items.length > 0 ?

                <form onSubmit={(event) => {onSubmitAddresses(event)}}>

                    <label htmlFor="email">Email*</label>
                    <input required={true} type="text" name="email" defaultValue={customer ? customer.email : ''} readOnly={customer ? true: false}/>
                        
                    <h3 className="mb-4">Shippinh address :</h3>
                    
                    <label htmlFor="billing_firstname">Firstname*</label>
                    <input required={true} type="text" name="billing_firstname"/>  
                
                    <label htmlFor="billing_lastname">Name</label>
                    <input required={true} type="text" name="billing_lastname"/>
                
                    <label htmlFor="billing_street">Street*</label>
                    <input required={true} type="text" name="billing_street"/>
                
                    <label htmlFor="billing_country">Country*</label>
                    <select name="billing_country">
                    {countries.map((country, index) => {
                        return (
                            <option key={index} value={country.code}>{getCountryName(country.code, 'fr')}</option>
                        );
                    })}
                    </select>
                
                    <label htmlFor="billing_city">City*</label>
                    <input required={true} type="text" name="billing_city"/>
                
                    <label htmlFor="billing_postcode">Zipcode*</label>
                    <input required={true} type="text" name="billing_postcode"/> 
                    
                    <h3 className="mb-4">Billing address :</h3>
                
                    <label htmlFor="shipping_firstname">Firstname</label>
                    <input required={true} type="text" name="shipping_firstname"/>
                
                    <label htmlFor="shipping_lastname">Name*</label>
                    <input required={true} type="text" name="shipping_lastname"/>
                
                    <label htmlFor="shipping_street">Street*</label>
                    <input required={true} type="text" name="shipping_street"/>
                
                    <label htmlFor="shipping_country">Country*</label>
                    <select className="custom-select" name="shipping_country">
                    {countries.map((country, index) => {
                        return (
                            <option key={index} value={country.code}>{getCountryName(country.code, 'fr')}</option>
                        );
                    })}
                    </select>
                        
                    <label htmlFor="shipping_city">City*</label>
                    <input required={true} type="text" name="shipping_city"/>  
            
                    <label htmlFor="shipping_postcode">Zipcode*</label>
                    <input required={true} type="text" name="shipping_postcode"/>
                    
                    <CartResume cart={cart} customer={customer}/>

                    <button type="submit">
                        Validate the order
                    </button>
                
                </form>

            :
                <p>You have no item in your cart</p>
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

export default Addresses;