type IOrderCheckoutStates = "cart" | 
        "addressed" | 
        "shipping_selected" | 
        "shipping_skipped" |
        "payment_selected" |
        "payment_skipped" |
        "completed"
;

export interface IOrderVariant {
    originalPrice: number;
    price: number;
}

export interface IOrder extends IOrderAddresses{
    tokenValue: string,
    id: number,
    items: [
        {
            variant: IOrderVariant
            productName: string,
            id: number,
            quantity: number,
            total: number,
            subtotal: number
        }
    ],
    total: number,
    taxTotal: number,
    shippingTotal: number,
    orderPromotionTotal: number,
    checkoutState: IOrderCheckoutStates
}

export interface IOrderAddresses {
    billingAddress: {
       firstName: string,
       lastName: string,
       street: string,
       countryCode: string,
       city: string,
       postcode: string,
    },
    shippingAddress: {
       firstName: string,
       lastName: string,
       countryCode: string,
       street: string,
       city: string,
       postcode: string,
     }
}