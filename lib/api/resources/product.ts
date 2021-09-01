import { IProduct } from '../../../types/resources/productTypes';
import { ITaxon } from "../../../types/resources/taxonTypes";
import { getResource } from "../client";

export const getAllProducts = async (): Promise<IProduct[]> => {
    const products = await getResource('shop/products', null, {
        'enabled': true,
        'itemsPerPage': 9999999,
        'variants.onHand[gt]': 0
    });

    return products;
}

export const searchProducts = async (search: string): Promise<IProduct[]> => {
    const products = await getResource('shop/products/search/{search}', {
            'search': search
        },
        {
            'enabled': true,
            'itemsPerPage': 9999999,
            'variants.onHand[gt]': 0
        }
    );


    return products;
}

export const getLastProducts = async (limit: number): Promise<IProduct[]> => {
    const products = await getResource('shop/products', null, {
        'page': 1,
        'itemsPerPage': limit,
        'enabled': true,
        'variants.onHand[gt]': 0
    });

    return products;
}

export const getProductByTranslatedSlug = async(slug: string): Promise<IProduct> => {
    const product = await getResource('shop/products/by-slug/{slug}', {
        'slug': slug
    },
    {
        'enabled': true,
        'itemsPerPage': 9999999,
        'variants.onHand[gt]': 0
    });
    return product;
}

export const getProductsByTaxon = async (taxon: ITaxon | null): Promise<IProduct[] | null> => {

    let products = null;

    if (taxon) {
        products = await getResource('shop/products', null, {
            'productTaxons.taxon.code': taxon.code,
            'enabled': true,
            'variants.onHand[gt]': 0,
            'order[createdAt]': 'desc',
            'itemsPerPage': 9999999,
        });
    }


    return products;
}
