import { useRouter } from "next/dist/client/router";

export const replaceWildcardsUrl = (url: string, pathParams: any ) => {
    if (pathParams) {
        return url.replace(/{(.+?)}/g, (_,g1) => pathParams[g1] || g1)
    }

    return url
}

const addQueryParamsUrl = (url: string, queryParams: ({} | null) | undefined) => {
    if (queryParams) {
        Object.entries(queryParams).forEach(
            ([key, value], index) => {
                if (index === 0) {
                    url = url + '?' + key + '=' + value;
                } else {
                    url = url + '&' + key + '=' + value;
                }
            }
        );
    }

    return url;
}

export const createUrl = (url: string, pathParams: ({ [key: string]: string | number; } | null) | undefined, queryParams: ({} | null) | undefined) => {
    url = replaceWildcardsUrl(url, pathParams);
    url = addQueryParamsUrl(url, queryParams);

    return url;
}

export const redirectTo = (url: string) => {
    const router = useRouter();

    router.push(url);
}

export const getQueryParam = (name: string): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) as string;
}