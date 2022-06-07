import React, { useContext } from 'react'

import CartContext from '../../../Store/CartContext';

import classes from './OrdersModal.module.css';

const Order = ({ mealData }) => {

    // Destructuring meal data
    const { id, mealName, amount, price } = mealData;

    // Destructuring cart context
    const { deleteAmountHandler, addAmountHandler } = useContext(CartContext);

    const deleteHandler = () => {
        deleteAmountHandler(id)
    }

    const addHandler = () => {
        addAmountHandler(id)
    }

    return (
        <div>
            <p><strong>{mealName}</strong></p>
            <span>{`$${price}`}{' '}{`x${amount}`}{' '}</span>
            <div className={classes.actions} >
                <button onClick={deleteHandler} >-</button>
                <button onClick={addHandler} >+</button>
            </div>
        </div>
    )
}

export default Order