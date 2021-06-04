import { IgetResourceUrl } from '../../types/fetchTypes';
import { IProduct } from '../../types/resources/productTypes';
import { ITaxon } from '../../types/resources/taxonTypes';
import { createUrl } from '../router/router';
import { getResourceTranslation } from './resources/common';


export const getApiResourcePublicUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_RESOURCE_BASE_URL as string;
}

export const getApiPublicUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_PUBLIC_URL as string;
}

export const getRessourceImageUrl = (imageSlug: string): string => {
    return getApiPublicUrl()+'media/image/'+imageSlug;
}

export const getTaxonRelativeUrl = (taxon: ITaxon): string => {
    return '/'+getPrefixCategories()+'/'+getResourceTranslation(taxon).slug;
}

export const getProductRelativeUrl = (product: IProduct) => {
    let mainTaxonSlug = getGenericMainTaxonSlug();
    const productSlug = getResourceTranslation(product).slug;

    if (product.mainTaxon) {
        mainTaxonSlug = getResourceTranslation(product.mainTaxon).slug;
    }

    return '/'+getPrefixCategories()+'/'+mainTaxonSlug+'/'+productSlug;
}

const getPrefixCategories = (): string => {
    return 'categories';
}

export const getGenericMainTaxonSlug = (): string => {
    return 'tout';
}

// construct the fetch url for a specific ressource, including parameters
export const getResourceUrl: IgetResourceUrl = (ressourceLocator, pathParams, queryParams) => {
    let baseUrl = getApiResourcePublicUrl() + ressourceLocator;

    return createUrl(baseUrl, pathParams, queryParams);
}
