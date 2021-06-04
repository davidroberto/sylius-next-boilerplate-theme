import { getResource, postResource, patchResource, deleteResource } from '../client';
import { getLocale } from '../../config/locales';
import Cookies from 'js-cookie';
import { IOrder } from '../../../types/resources/orderTypes';
import { IAddAddressesToCart } from '../../../types/resources/cartTypes';
import { removeCustomerTokenFromCookie } from '../../resource/customer';

export const addProductToCart = async (productCode: string, productVariantCode: string, quantity: number): Promise<IOrder> => {
    const orderToken = await getOrderToken();

    const pathParams = {
        'id': orderToken
    }

    const body = {
        "productCode": productCode,
        "productVariantCode": productVariantCode,
        "quantity": quantity
    };

    return await patchResource('shop/orders/{id}/items', pathParams, null, body);
}

export const addAddressesToCart: IAddAddressesToCart = async (addresses)  => {
    const orderToken = await getOrderToken();

    const pathParams = {
        'id': orderToken
    }

    const body = addresses;

    return await patchResource('shop/orders/{id}/address', pathParams, null, body);
}

export const completeCart = async (orderToken: string): Promise<IOrder> => {

    const pathParams = {
        'id': orderToken
    }

    const body = {};

    return await patchResource('shop/orders/{id}/complete', pathParams, null, body);
}

export const applyCoupon = async (couponCode: string): Promise<IOrder> => {
    const orderToken = await getOrderToken();

    const pathParams = {
        'id': orderToken
    }

    const body = {
        "couponCode": couponCode
    }

    return await patchResource('shop/orders/{id}/apply-coupon', pathParams, null, body);
}

export const createStripeCheckoutSession = async (orderToken: string): Promise<any> => {
    const pathParams = {
        'id': orderToken
    }

    const body = {};

    return await postResource('shop/orders/{id}/stripe/checkout', pathParams, null, body);
}

export const removeOrderFromCookie = () => {
    Cookies.remove('cartToken');
}

export const deleteCart = async (orderToken: string): Promise<boolean> => {

    const pathParams = {
        'id': orderToken
    }

    const isOrderDeleted = await deleteResource('shop/orders/{id}', pathParams);

    if (isOrderDeleted) {
        removeOrderFromCookie();
    }

    return isOrderDeleted; 
}


const getOrderToken =  async(): Promise<string> => {
    let cookieCartToken = Cookies.get('cartToken');

    if (cookieCartToken) {
        return cookieCartToken;
    }

    const order: IOrder = await postResource('shop/orders', null, null, {
        localeCode: getLocale()
    });

    if (order) {
        Cookies.set('cartToken', order.tokenValue);
    } else {
        removeCustomerTokenFromCookie();
    }
    return order.tokenValue
}


export const getOrderFromCookie = async (): Promise<IOrder | null> => {
    let order = null
    const cookieCartToken = Cookies.get('cartToken');


    if (cookieCartToken) {
        order = await getResource('shop/orders/{id}', {
            'id': cookieCartToken
        });
    }

    return order;
}
