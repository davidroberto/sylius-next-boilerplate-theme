import React from 'react';
import { IProduct } from '../../types/resources/productTypes';
import { getResourceTranslation } from '../../lib/api/resources/common';


interface IProductTabs {
    product: IProduct;
}

const ProductTabs: React.FC<IProductTabs> = ({ product }) => {

    return (
        <>
            <h3>Description</h3>
            <div dangerouslySetInnerHTML={{__html: getResourceTranslation(product).description}}></div>
        </>
    );
}

export default ProductTabs;