import React from 'react';
import { IProduct } from '../../types/resources/productTypes';
import ProductList from './ProductList';

interface IRelatedProductsProps {
    products: IProduct[] | null
}

const RelatedProducts: React.FC<IRelatedProductsProps> = ( { products } ) => {

    return (
        <>
            {products?.map((product: IProduct, index) => {
                return (
                    <div key={index}>
                        <ProductList product={product}/>
                    </div>
                );
            })}
        </> 
    );
}


export default RelatedProducts;