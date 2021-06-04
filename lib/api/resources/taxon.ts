import { getResource } from "../client";
import { ITaxon } from '../../../types/resources/taxonTypes';

export const getAllTaxons = async (): Promise<ITaxon[]> => {
    let taxons = await getResource('shop/taxons');

    taxons = taxons.filter(function(taxon: ITaxon) {
        if (taxon.code !== "MENU_CATEGORY") {
            return taxon;
        }
    });

    return taxons;
}