import { ITaxon } from "../../types/resources/taxonTypes";
import { getLocale } from "../config/locales";
import { getResourceTranslation } from '../api/resources/common';

export const getTaxonBySlugFromCollection = (taxons: ITaxon[], taxonTranslatedSlug: string): ITaxon | null => {
    let currentTaxon = null;

    taxons.map((taxon: ITaxon) => {
        if (getResourceTranslation(taxon).slug === taxonTranslatedSlug) {
            currentTaxon = taxon;
        }
    });

    return currentTaxon;
}

