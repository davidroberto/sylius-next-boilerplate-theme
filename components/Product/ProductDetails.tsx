import React, { useEffect } from 'react';
import { IProduct } from '../../types/resources/productTypes';
import { getResourceTranslation } from '../../lib/api/resources/common';
import MultipleVariants from './MultipleVariants';
import SingleVariant from './SingleVariant';
import { formatMoney } from '../../lib/config/money';
import { getTaxonRelativeUrl } from '../../lib/api/urls';
import { ITaxon } from '../../types/resources/taxonTypes';
import Link from 'next/link';
import { hasPromo } from '../../lib/resource/product';

interface IProductDetailsProps {
    product: IProduct,
    currentTaxon: ITaxon | null,
}

const ProductDetails: React.FC<IProductDetailsProps> = ({ product, currentTaxon }) => {

    return (
        <>
            <h1>{ getResourceTranslation(product).name }</h1>

            { hasPromo(product)
            ?
                <>
                    <span>{formatMoney(product.variants[0].price)}</span>
                    <del>Original price: {formatMoney(product.variants[0].originalPrice)}</del>
                </>
            :
                <p>{formatMoney(product.variants[0].price)}</p>
            }

            <p dangerouslySetInnerHTML={{__html: getResourceTranslation(product).shortDescription}}></p>

            {product.variants.length > 1 
            ?
                <MultipleVariants product={product}/>
            :
                <SingleVariant product={product}/>
            } 

            { currentTaxon &&
                <>
                    <p>Category :</p>
                    
                    <Link href={getTaxonRelativeUrl(currentTaxon)}>
                        <a>{ getResourceTranslation(currentTaxon).name }</a>
                    </Link>
                </>
            }

           
        </>
    )
}

export default ProductDetails;