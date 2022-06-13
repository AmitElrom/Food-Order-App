import React, { Fragment, useContext, useState } from 'react'

import Order from './Order';

import CartContext from '../../../Store/CartContext';

import classes from './OrdersModal.module.css';
import Modal from '../../UI/Modal/Modal';


const OrdersModal = () => {

    const [isOrdered, setIsOrdered] = useState(false);
    const [price, setPrice] = useState(0);

    const { meals, totalPrice, hideCartHandler, cleanCart } = useContext(CartContext);

    const orderComponents = <ul className={classes['cart-items']} >{meals.map(meal => {
        return <Order key={meal.id} mealData={meal} />
    })}</ul>

    const closeOrdersHandler = () => {
        hideCartHandler()
    }

    const orderHandler = () => {
        setPrice(totalPrice);
        setIsOrdered(true)
        cleanCart()
    }

    const noItemsTxt = meals.length === 0 && <div>
        <h4>Didn't find anything ?</h4>
        <p>For our customers who struggle to decide we recommend on our delectable Schnitzel !</p>
    </div>

    let ordersProcess = <Fragment>
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
    </Fragment>

    let ordersOrdered = <Fragment>
        <h3>Ordered !</h3>
        <p>Your total is <strong>${price}</strong></p>
        <p>Enjoy your meal !</p>
        <div className={classes.actions} >
            <button className={classes['button--alt']} onClick={closeOrdersHandler} >Close</button>
        </div>
    </Fragment>

    return (
        <Modal >
            {isOrdered ? ordersOrdered : ordersProcess}
        </Modal>
    )
}

export default OrdersModal