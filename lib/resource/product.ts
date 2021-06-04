import { IProduct } from '../../types/resources/productTypes';
import { IResourceImage } from '../../types/resources/imageTypes';

export const hasPromo = (product: IProduct): boolean => {
    if (product.variants[0].originalPrice &&
        product.variants[0].originalPrice !== product.variants[0].price
    ) {
        return true;
    }

    return false;
}

export const sortIProductmagesById = (productImages: IResourceImage[]) => {
    return productImages.sort((a: any, b: any) => a.id - b.id);
}