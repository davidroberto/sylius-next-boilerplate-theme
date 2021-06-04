import { getResource } from '../client';
import { ICountry } from '../../../types/resources/countryTypes';

export const getCountries = async (): Promise<ICountry[]> => {
    return await getResource('shop/countries');
}