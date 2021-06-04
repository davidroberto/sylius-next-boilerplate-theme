import { IResourceImage } from "./imageTypes";
import { ITaxonSlugTranslation } from "./taxonTypes";

interface IProductTranslation {
    id: number;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
}

interface IProductVariant {
    id: number;
    code: string;
    translations: {
        [key: string]: {
            name: string;
        }
    }
    price: number;
    originalPrice: number;
    enabled: boolean;
    onHand: number;
}

export interface IProduct {
    id: number;
    code: string;
    mainTaxon: ITaxonSlugTranslation;
    translations: {
        [key: string]: IProductTranslation
    };
    images: IResourceImage[];
    variants: IProductVariant[];
    enabled: boolean;
}