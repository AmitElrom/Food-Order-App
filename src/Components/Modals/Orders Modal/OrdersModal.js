import React, { useContext, useState } from 'react'

import Order from './Order';

import CartContext from '../../../Store/CartContext';

import classes from './OrdersModal.module.css';
import Modal from '../../UI/Modal/Modal';

const OrderModal = () => {

    return (
        <Modal>
            Ordered
        </Modal>
    )
}

const OrdersModal = () => {

    const [isOrdered, setIsOrdered] = useState(false);

    const { meals, totalPrice, hideCartHandler, cleanCart } = useContext(CartContext);

    const orderComponents = meals.map(meal => {
        return <Order key={meal.id} mealData={meal} />
    })

    const closeOrdersHandler = () => {
        hideCartHandler()
    }

    const orderHandler = () => {
        hideCartHandler()
        setIsOrdered(true)
        cleanCart()
    }

    const noItemsTxt = meals.length === 0 && <div>
        <h4>Didn't find anything ?</h4>
        <p>For our customers who struggle to decide we recommend on our delectable Schnitzel !</p>
    </div>

    return (
        <Modal>
            {noItemsTxt}
            {orderComponents}
            <div className={classes.total} >
                <span>Total Amount</span>
                <span>{`$${totalPrice}`}</span>
            </div>
            <div className={classes.actions} >
                <button className={classes['button--alt']} onClick={closeOrdersHandler} >Close</button>
                {meals.length !== 0 && <button className={classes.button} onClick={orderHandler} >Order</button>}
            </div>
        </Modal>
    )
}

export default OrdersModal