import { IGetResource, IPostResource, IPatchResource, IDeleteResource, IPutResource } from '../../types/fetchTypes';
import { getResourceUrl } from './urls';
import { getCustomerTokenFromCookie, removeCustomerTokenFromCookie } from '../resource/customer';
import { getCustomerFromCookie } from './resources/customer';


export const postResource: IPostResource = async (ressourceLocator, pathParams, queryParams, body) => {
    const url = getResourceUrl(ressourceLocator, pathParams, queryParams);

    return postFetchResponse(url, body).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return false;
        }
    }).catch(() => {
        return true;
    });
}

export const patchResource: IPatchResource = async (ressourceLocator, pathParams, queryParams, body) => {
    const url = getResourceUrl(ressourceLocator, pathParams, queryParams);

    return patchFetchResponse(url, body).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return false;
        }
    }).catch(() => {
        return true;
    });
}

export const putResource: IPutResource = async (ressourceLocator, pathParams, queryParams, body) => {
    const url = getResourceUrl(ressourceLocator, pathParams, queryParams);

    const response = await putFetchResponse(url, body);

    if (!response.ok) {
        return false;
    }

    return true;
}

export const deleteResource: IDeleteResource = async (resourceLocator, pathParams, queryParams) => {
    const url = getResourceUrl(resourceLocator, pathParams, queryParams);

    const response = await deleteFetchResponse(url);

    if (!response.ok) {
        return false;
    }

    return true
}

export const getResource: IGetResource = async (ressourceLocator, pathParams, queryParams) => {

    const url = getResourceUrl(ressourceLocator, pathParams, queryParams);
    
    return getFetchResponse(url).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return false;
        }
    }).catch(() => {
        return true;
    });
}

export const getCustomerResource: IGetResource = async (ressourceLocator, pathParams, queryParams) => {

    const url = getResourceUrl(ressourceLocator, pathParams, queryParams);
    const customerToken = getCustomerTokenFromCookie();

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${customerToken}`
        }
    }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return false;
        }
    }).catch(() => {
        return true;
    });
}

const getFetchResponse = async (url: string) => {
    return await fetchApi('GET', url);
}

const deleteFetchResponse = async (url: string) => {
    return await fetchApi('DELETE', url);
}

const postFetchResponse = async (url: string, body?: {}) => {
    return await fetchApi('POST', url, body);
}

const putFetchResponse = async (url: string, body?: {}) => {
    return await fetchApi('PUT', url, body);
}

const patchFetchResponse = async (url: string, body?: {}) => {
    return await fetchApi('PATCH', url, body);
}

const fetchApi = async (httpMethod: string, url: string, body?: {}) => {

    const customerToken = getCustomerTokenFromCookie();
    let customer = false;

    if (customerToken) {
        customer = await getCustomerFromCookie();
        if (!customer) {
            removeCustomerTokenFromCookie();
        }
    }

    return await fetch(url, {
        method: httpMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': httpMethod === 'PATCH' ? 'application/merge-patch+json' : 'application/json',
            'Authorization': customer ? `Bearer ${customerToken}` : ''
        },
        body: body ? JSON.stringify(body) : null
    });
}

