import React, { useContext } from 'react'

import Order from './Order';
import Card from '../../UI/Card/Card';

import CartContext from '../../../Store/CartContext';

const OrdersModal = () => {

    const { meals, totalPrice } = useContext(CartContext);

    const orderComponents = meals.map(meal => {
        return <Order key={meal.id} mealData={meal} />
    })

    return (
        <Card>
            {orderComponents}
            <strong>Total Amount <span>{totalPrice}</span></strong>
        </Card>
    )
}

export default OrdersModal