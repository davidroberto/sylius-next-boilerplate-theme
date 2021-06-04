import { formatMoney } from '../../lib/config/money';
import { IOrder } from '../../types/resources/orderTypes';

type CartItemsProps = {
    cart: IOrder | null
}

const CartItems = ({cart}: CartItemsProps): JSX.Element => {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>

            <tbody>
                {cart && cart.items.length > 0 ?
                    <>
                        {cart.items.map(item => {
                            return (
                                <tr key={ 'cart-item-' + item.id }>
                                <td>
                                    <h3>{item.productName}</h3>
                                </td>

                                { item.hasOwnProperty('total') ?
                                    <td>
                                        {formatMoney(item.total / item.quantity)}
                                    </td>
                                :
                                    <td>
                                        {formatMoney(item.variant.price / item.quantity)}
                                    </td>
                                }

                                <td>
                                    {item.quantity}
                                </td>

                                { item.hasOwnProperty('total') ?
                                    <td>
                                        {formatMoney(item.total)}
                                    </td>
                                :
                                    <td>
                                        {formatMoney(item.variant.price)}
                                    </td>
                                }
                            </tr>
                            );

                        })}
                    </>
                :
                    <tr>
                        <td>
                            <p> You have no product in your cart </p>
                        </td>
                    </tr>
                }

            </tbody>
        </table>
    );
}

export default CartItems;