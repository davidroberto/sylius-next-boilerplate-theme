import React from 'react';
import { IProduct } from '../../types/resources/productTypes';
import ProductList from './ProductList';


interface IProductsListProps {
    products: IProduct[] | null
}

const ProductsList: React.FC<IProductsListProps> = ( { products } ) => {

    return (
        <>
            {products?.map((product: IProduct) => {
                return(
                    <article key={ product.id }>
                        <ProductList product={product} />
                    </article>
                );
            })}
        </>
    );
}


export default ProductsList;