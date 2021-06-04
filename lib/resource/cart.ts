import { addAddressesToCart, addProductToCart, applyCoupon } from "../api/resources/cart";
import { IOrder } from '../../types/resources/orderTypes';

export const submitCoupon = async (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const couponCode = target.coupon_code.value;

    return await applyCoupon(couponCode);
}

export const submitCart = async (event: React.FormEvent<HTMLFormElement>): Promise<IOrder | null>  => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    const productCode = target.product_code.value;
    const productVariantCode = target.product_variant_code.value;
    const quantity = parseInt(target.quantity.value);
    
    return await addProductToCart(productCode, productVariantCode, quantity);
}

export const submitAddresses = async (event: React.FormEvent<HTMLFormElement>): Promise<IOrder> => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const addresses = {
         "email": target.email.value,
         "billingAddress": {
            "firstName": target.billing_firstname.value,
            "lastName": target.billing_lastname.value,
            "street": target.billing_street.value,
            "countryCode": target.billing_country.value,
            "city": target.billing_city.value,
            "postcode": target.billing_postcode.value,
         },
         "shippingAddress": {
            "firstName": target.shipping_firstname.value,
            "lastName": target.shipping_lastname.value,
            "countryCode": target.shipping_country.value,
            "street": target.shipping_street.value,
            "city": target.shipping_city.value,
            "postcode": target.shipping_postcode.value
          }
    }

    return await addAddressesToCart(addresses);
}

export const canOrderComplete = (order: IOrder) => {
    if (order.checkoutState === "shipping_selected" || 
        order.checkoutState === "shipping_skipped" || 
        order.checkoutState === "payment_selected" ||
        order.checkoutState === "payment_skipped"
    ) {
        return true;
    }
    return false;
}

export const formatPaymentState = (paymentState: string): string => {
    if (paymentState === "awaiting_payment" || 
        paymentState === "cart" ||
        paymentState === "partially_authorized" ||
        paymentState === "authorized" ||
        paymentState === "partially_paid"
    ) {
        return "En attente de paiement";
    } else if (paymentState === "paid") {
        return "Payé";
    } else if (paymentState === "cancelled") {
        return "Annulé";
    } else if (paymentState === "partially_refunded" ||
        paymentState === "refunded"
    ){
        return "Remboursé";
    }

    return "Inconnu";
}


export const formatShippingState = (shippingState: string): string => {
    if (shippingState === "ready") {
        return "Prêt";
    } else if (shippingState === "shipped") {
        return "Envoyé";
    } else if (shippingState === "cancelled") {
        return "Annulé";
    }

    return "Inconnu";
}