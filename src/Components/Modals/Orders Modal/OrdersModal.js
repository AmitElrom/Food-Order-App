import React, { useContext } from 'react'

import Order from './Order';

import CartContext from '../../../Store/CartContext';

import classes from './OrdersModal.module.css';
import Modal from '../../UI/Modal/Modal';

const OrdersModal = () => {

    const { meals, totalPrice, hideCartHandler } = useContext(CartContext);

    const price = `$${totalPrice.toFixed(2)}`

    const orderComponents = meals.map(meal => {
        return <Order key={meal.id} mealData={meal} />
    })

    const closeOrdersHandler = () => {
        hideCartHandler()
    }

    const orderHandler = () => {
        setTimeout(() => {
            alert('ordered !');
        }, 2000)
    }

    return (
        <Modal>
            {orderComponents}
            <div className={classes.total} >
                <span>Total Amount</span>
                <span>{price}</span>
            </div>
            <div className={classes.actions} >
                <button className={classes['button--alt']} onClick={closeOrdersHandler} >Close</button>
                <button className={classes.button} onClick={orderHandler} >Order</button>
            </div>
        </Modal>
    )
}

export default OrdersModal