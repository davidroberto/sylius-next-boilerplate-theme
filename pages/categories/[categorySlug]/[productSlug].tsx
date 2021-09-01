import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../../../components/layout/Layout';
import { getResourceTranslation } from '../../../lib/api/resources/common';
import { getAllProducts, getProductByTranslatedSlug, getProductsByTaxon } from '../../../lib/api/resources/product';
import { getAllTaxons } from '../../../lib/api/resources/taxon';
import { getGenericMainTaxonSlug, getTaxonRelativeUrl } from '../../../lib/api/urls';
import { getTaxonBySlugFromCollection } from '../../../lib/resource/taxon';
import { IProduct } from '../../../types/resources/productTypes';
import { ITaxon } from '../../../types/resources/taxonTypes';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import MessageContext from '../../../components/MessageContext';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../../components/layout/breadcrumb';
import ProductImages from '../../../components/Product/ProductImages';
import ProductDetails from '../../../components/Product/ProductDetails';
import ProductTabs from '../../../components/Product/ProductTabs';
import RelatedProducts from '../../../components/Product/RelatedProducts';

type ProductProps = {
    taxons: ITaxon[],
    currentTaxon: ITaxon | null,
    product: IProduct,
    relatedProducts: IProduct[] | null
}


const Product = (
    { taxons, currentTaxon, product, relatedProducts }: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { setMessage } = useContext(MessageContext);

    useEffect(() => {
        setMessage(null);
    }, []); 

    return (
        <Layout taxons={taxons}>

            <Helmet>
                <title>{getResourceTranslation(product).name}</title>
            </Helmet>

            <Breadcrumb
                title={getResourceTranslation(product).name}
                parents={ [
                    {
                        'title':currentTaxon ? getResourceTranslation(currentTaxon).name : '',
                        'path': currentTaxon ? getTaxonRelativeUrl(currentTaxon) : ''
                        
                    }
                ]}
            />
            
            <ProductImages product={ product } />
        
            <ProductDetails product={ product } currentTaxon={currentTaxon} />

            <ProductTabs product={product} />

            <h2>Related products:</h2>

            <RelatedProducts products={relatedProducts}/>

        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await getAllProducts();    

    const paths = products.map((product: IProduct) => ({
        params: {
            categorySlug: product.mainTaxon ? getResourceTranslation(product.mainTaxon).slug : getGenericMainTaxonSlug(),
            productSlug: getResourceTranslation(product).slug
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<ProductProps> = async ({ params }) => {

    const taxonTranslatedSlug = params?.categorySlug as string;
    const taxons: ITaxon[] = await getAllTaxons();
    const currentTaxon = getTaxonBySlugFromCollection(taxons, taxonTranslatedSlug);

    const productTranslatedSlug = params?.productSlug as string;
    const product = await getProductByTranslatedSlug(productTranslatedSlug);

    let relatedProducts = null;
    if (currentTaxon) {
        relatedProducts = await getProductsByTaxon(currentTaxon);
    }

    return {
        props: {
            taxons,
            currentTaxon,
            product,
            relatedProducts
        },
        revalidate: 60
    }
}

export default Product;
