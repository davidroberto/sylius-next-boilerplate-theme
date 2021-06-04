
type pathParamsType = {
    [key: string]: string | number
} | null;

type queryParamsType =  {} | null;

export interface IgetResourceUrl {
    (
        ressourceLocator: string, 
        pathParams?: pathParamsType, 
        queryParams?: queryParamsType
    ): string
}

export interface IGetResource {
    (
        ressourceLocator: string, 
        pathParams?: pathParamsType, 
        queryParams?: queryParamsType
    ): Promise<any>
}

export interface IDeleteResource {
    (
        ressourceLocator: string, 
        pathParams?: pathParamsType, 
        queryParams?: queryParamsType
    ): Promise<boolean>
}

export interface IPutResource {
    (
        ressourceLocator: string, 
        pathParams?: pathParamsType, 
        queryParams?: queryParamsType,
        body?: {},
    ): Promise<any>
}

export interface IPostResource {
    (
        ressourceLocator: string, 
        pathParams?: pathParamsType, 
        queryParams?: queryParamsType,
        body?: {},
    ): Promise<any>
}

export interface IPatchResource {
    (
        ressourceLocator: string, 
        pathParams?: pathParamsType, 
        queryParams?: queryParamsType,
        body?: {},
    ): Promise<any>
}



// export interface IFetchApiByRelativeUrl {
//     (relativeUrl: string): Promise<any>
// }

