import React, { useContext } from 'react'

import Order from './Order';
import Card from '../../UI/Card/Card';

import CartContext from '../../../Store/CartContext';

const OrdersModal = () => {

    const { meals, totalPrice, hideCartHandler } = useContext(CartContext);

    const orderComponents = meals.map(meal => {
        return <Order key={meal.id} mealData={meal} />
    })

    const closeOrdersHandler = () => {
        hideCartHandler()
    }

    const orderHandler = () => {
        setTimeout(() => {
            alert('ordered !');
        }, 4000)
    }

    return (
        <Card>
            {orderComponents}
            <strong>Total Amount <span>{totalPrice}</span></strong>
            <div>
                <button onClick={closeOrdersHandler} >Close</button>
                <button onClick={orderHandler} >Order</button>
            </div>
        </Card>
    )
}

export default OrdersModal