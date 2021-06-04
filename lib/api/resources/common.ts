import { IResource } from '../../../types/resources/common';
import { getLocale } from '../../config/locales';

export const getResourceTranslation = (resource: IResource | null) => {

    if (resource) {
        if (getLocale() in resource.translations) {
            return resource.translations[getLocale()]
        }
        return resource.translations[Object.keys(resource.translations)[0]];
    }

    return null   
}