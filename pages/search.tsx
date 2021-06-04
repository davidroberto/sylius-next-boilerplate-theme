import { getAllTaxons } from "../lib/api/resources/taxon";
import { InferGetStaticPropsType } from 'next';
import Layout from '../components/layout/Layout';
import { useContext, useEffect, useState } from 'react';
import MessageContext from "../components/MessageContext";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/layout/breadcrumb";
import LoadingContext from '../components/LoadingContext';
import { IProduct } from '../types/resources/productTypes';
import { searchProducts } from '../lib/api/resources/product';
import { useRouter } from 'next/router';
import ProductList from '../components/Product/ProductList';

const Search = (
    { taxons }: InferGetStaticPropsType<typeof getStaticProps>
) => {

    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);
    const [products, setProducts] = useState<IProduct[] | null >(null);
    const router = useRouter();
    
    const searchTerm = router.query.search as string;

    useEffect(() => {
        setMessage(null);

        (async () => {
            const searchTerm = router.query.search as string;
            const products = await searchProducts(searchTerm);
        
            if (products) {
                setProducts(products);
            }
        })();

        setLoading(false);
    }, [searchTerm]); 


    return (
        <Layout taxons={taxons}>

            <Helmet>
                <title>Search</title>
            </Helmet>

            <Breadcrumb
                title="Search"
                parents={[]}
            />

            {searchTerm ?
                <>
                    <h2>Search results for:  "{searchTerm}" </h2> 

                    {products && products.length > 0 ?
                       <div>
                            {products.map((product: IProduct, index) => {
                                return (
                                    
                                        <ProductList product={product} key={index}/>
                                    
                                );
                            })}
                        </div>
                    :
                        <h3>No product have been found</h3>
                    }
                    
                </>
            :
                <h2>No search have been performed</h2>
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

export default Search;