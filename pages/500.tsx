import { InferGetStaticPropsType } from "next";
import { getAllTaxons } from "../lib/api/resources/taxon";
import Layout from "../components/layout/Layout";
import { useContext, useEffect } from 'react';
import MessageContext from "../components/MessageContext";
import { Helmet } from 'react-helmet';
import PageHeader from '../components/layout/PageHeader';
import Breadcrumb from "../components/layout/breadcrumb";

const Custom500 = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { setMessage } = useContext(MessageContext);
    
    useEffect(() => {
        setMessage(null);
    }, []); 

    return (
        <Layout taxons={taxons}>

        <Helmet>
            <title>Internal server error</title>
        </Helmet>

        <div>
            <h1>Internal server error</h1>
        </div>
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

export default Custom500;