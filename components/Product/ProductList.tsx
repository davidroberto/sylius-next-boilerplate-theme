import React from 'react';
import { IProduct } from '../../types/resources/productTypes';
import { getRessourceImageUrl, getProductRelativeUrl } from '../../lib/api/urls';
import { getResourceTranslation } from '../../lib/api/resources/common';
import Link from 'next/link';
import { formatMoney } from '../../lib/config/money';
import { sortIProductmagesById } from '../../lib/resource/product';
import Image from 'next/image';

interface IProductListProps {
    product: IProduct
}

const ProductList: React.FC<IProductListProps> = ({ product }) => {

    const images = sortIProductmagesById(product.images);

    return (
        <Link href={getProductRelativeUrl(product)}>
            <a>
                <Image
                    src={getRessourceImageUrl(images[0].path)}
                    alt={getResourceTranslation(product).name} 
                    width="200px"
                    height="200px"
                />
                <p>{getResourceTranslation(product.mainTaxon)?.name}</p>
                <p>{getResourceTranslation(product).name}</p>
                <div>{formatMoney(product.variants[0].price)}</div>
            </a>
        </Link>
    );
}

export default ProductList;