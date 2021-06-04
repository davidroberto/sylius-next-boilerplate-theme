import { IOrder } from '../../types/resources/orderTypes';
import { ICustomer } from '../../types/resources/customerTypes';
import { formatMoney } from '../../lib/config/money';

interface ICartResumeProps {
    cart: IOrder | null;
    customer: ICustomer | null
}

const CartResume: React.FC<ICartResumeProps> = ({ cart, customer }) => {
    return (
        <>
    
            {cart && cart.items.length > 0 ?
               
                <table >
                    <tbody>
                        <tr>
                            <td>{cart.shippingAddress ? 'Shipping fee' : 'Shiping fee estimate'} :</td>
                            <td>{formatMoney(cart.shippingTotal)}</td>
                        </tr>

                        <tr>
                            <td>Montant des taxes :</td>
                            <td>{formatMoney(cart.taxTotal)}</td>
                        </tr>

                        <tr>
                            <td>Code Promo :</td>
                            <td>{formatMoney(cart.orderPromotionTotal)}</td>
                        </tr>

                        <tr>
                            <td>Montant de la commande :</td>
                            <td>{formatMoney(cart.total)}</td>
                        </tr>
                    </tbody>
                </table>

            :
                <table>
                    <tbody>
                        <tr>
                            <td>Estimation des frais de port :</td>
                            <td>0€</td>
                        </tr>

                        <tr>
                            <td>Montant des taxes :</td>
                            <td>0€</td>
                        </tr>

                        <tr>
                            <td>Code Promo :</td>
                            <td>0€</td>
                        </tr>

                        <tr>
                            <td>Montant de la commande :</td>
                            <td>0€</td>
                        </tr>
                    </tbody>
                </table>
            }

        </>

    );
}

export default CartResume;