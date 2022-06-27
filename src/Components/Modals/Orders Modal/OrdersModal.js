import React, { Fragment, useContext, useState } from 'react';
import useHttp from '../../../Hooks/use-http';

import Checkout from '../Checkout/Checkout';
import Order from './Order';

import CartContext from '../../../Store/CartContext';

import classes from './OrdersModal.module.css';
import Modal from '../../UI/Modal/Modal';


const OrdersModal = () => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [userName, setUserName] = useState('');
    const [price, setPrice] = useState(0);

    const { meals, totalPrice, hideCartHandler, cleanCart } = useContext(CartContext);

    const { isLoading, error, sendRequest: sendOrder } = useHttp();


    const closeOrderHandler = () => {
        hideCartHandler()
    }

    const orderHandler = () => {
        setPrice(totalPrice);
        setIsCheckout(true)
    }

    const confirmHandler = (userData) => {
        setIsConfirmed(true)
        setUserName(`${userData.firstName} ${userData.lastName}`)
        sendOrder({
            method: 'POST',
            url: 'https://react-food-order-app-2ce6b-default-rtdb.firebaseio.com/orders.json',
            body: { userData, meals }
        })
        cleanCart()
    }

    const orderComponentsClasses =
        meals.length > 2 ?
            classes['cart-items2'] :
            classes['cart-items1'];

    const orderComponents = <ul className={orderComponentsClasses} >
        {meals.map(meal => {
            return <Order key={meal.id} mealData={meal} />
        })}</ul>

    const noItemsTxt = meals.length === 0 && <div>
        <h4>Didn't find anything ?</h4>
        <p>For our customers who struggle to decide we recommend on our delectable Schnitzel !</p>
    </div>

    const orderActions = <div className={classes.actions} >
        <button className={classes['button--alt']} onClick={closeOrderHandler} >Close</button>
        {meals.length !== 0 && <button className={classes.button} onClick={orderHandler} >Order</button>}
    </div>

    let ordersProcess = <Fragment>
        {noItemsTxt}
        {orderComponents}
        <div className={classes.total} >
            <span>Total Amount</span>
            <span>{`$${totalPrice}`}</span>
        </div>
        {isCheckout && <Checkout onClose={closeOrderHandler} onConfirm={confirmHandler} />}
        {!isCheckout && orderActions}
    </Fragment>

    let theOrder = <Fragment>
        <h3>Ordered !</h3>
        <p>Your total is <strong>${price}</strong></p>
        <p>{userName} enjoy your meal !</p>
        <div className={classes.actions} >
            <button className={classes['button--alt']} onClick={closeOrderHandler} >Close</button>
        </div>
    </Fragment>

    let modalContent = ordersProcess
    if (isLoading && isConfirmed && !error) {
        modalContent = <p>Order is sending...</p>
    }
    if (!isLoading && isConfirmed && !error) {
        modalContent = theOrder;
    }
    if (error) {
        modalContent = error
    }


    return (
        <Modal >
            {modalContent}
        </Modal>
    )
}

export default OrdersModal