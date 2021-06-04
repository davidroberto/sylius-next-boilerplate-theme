import { InferGetStaticPropsType } from "next";
import { getAllTaxons } from "../lib/api/resources/taxon";
import Layout from "../components/layout/Layout";
import { useContext, useEffect } from 'react';
import MessageContext from "../components/MessageContext";
import { Helmet } from 'react-helmet';
import PageHeader from '../components/layout/PageHeader';
import Breadcrumb from "../components/layout/breadcrumb";

const Custom404 = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { setMessage } = useContext(MessageContext);
    
    useEffect(() => {
        setMessage(null);
    }, []); 

    return (
        <Layout taxons={taxons}>

        <Helmet>
            <title>Page not found</title>
        </Helmet>

        <div>
            <h1>Page not found</h1>
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

export default Custom404;