import { IResource } from './common';

export interface ITaxonSlugTranslation {
    translations: {
        [key: string]: {
            slug: string
        }
    }
}

export interface ITaxonTranslation {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export interface ITaxon extends IResource {
    id: number;
    code: string;
}

export interface IProductTaxon {
    id: number;
    taxon: string;
}