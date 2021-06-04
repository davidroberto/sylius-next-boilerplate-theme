import React from 'react';
import Image from 'next/image';
import { IProduct } from '../../types/resources/productTypes';
import { getRessourceImageUrl } from '../../lib/api/urls';
import { getResourceTranslation } from '../../lib/api/resources/common';

interface IProductImagesProps {
    product: IProduct;
}

const ProductImages: React.FC<IProductImagesProps> = ({ product }) => {


    return (
        <>
            {
                product.images.map( ( image, index ) =>  
                <div>
                    <Image
                        src={getRessourceImageUrl(image.path)}
                        alt={getResourceTranslation(product).name} 
                        width="200px"
                        height="200px"
                    />
                </div>
                )
            }       
        </>
    )
};

export default ProductImages;