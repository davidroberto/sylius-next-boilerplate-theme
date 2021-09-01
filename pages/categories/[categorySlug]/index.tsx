import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../../../components/layout/Layout';
import { getProductsByTaxon } from '../../../lib/api/resources/product';
import { getAllTaxons } from '../../../lib/api/resources/taxon';
import { ITaxon } from '../../../types/resources/taxonTypes';
import { IProduct } from '../../../types/resources/productTypes';
import { getTaxonBySlugFromCollection } from '../../../lib/resource/taxon';
import { getResourceTranslation } from '../../../lib/api/resources/common';
import { useContext, useEffect } from 'react';
import MessageContext from '../../../components/MessageContext';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../../components/layout/breadcrumb';
import ProductsList from '../../../components/Product/ProductsList';

type CategoryProps = {
    taxons: ITaxon[],
    currentTaxon: ITaxon | null,
    products: IProduct[] | null
}

const Category = (
    { taxons, currentTaxon, products }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { setMessage } = useContext(MessageContext);
    
    useEffect(() => {
        setMessage(null);
    }, []); 

    return (

        <Layout taxons={taxons}>

            <Helmet>
                <title>{getResourceTranslation(currentTaxon).name}</title>
            </Helmet>

            
            <Breadcrumb
                title={ getResourceTranslation(currentTaxon).name }
                parents={[]}
            />
                
            <ProductsList products={ products } />

        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const taxons = await getAllTaxons();

    const paths = taxons.map((taxon: ITaxon) => ({
        params: {
            categorySlug: getResourceTranslation(taxon).slug
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async ({ params }) => {
    const taxons: ITaxon[] = await getAllTaxons();
    const taxonTranslatedSlug = params?.categorySlug as string;
    const currentTaxon = getTaxonBySlugFromCollection(taxons, taxonTranslatedSlug);
    const products = await getProductsByTaxon(currentTaxon);

    return {
        props: {
            taxons,
            currentTaxon,
            products
        },
        revalidate: 60
    }
}

export default Category;
