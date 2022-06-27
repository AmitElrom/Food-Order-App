import React, { useContext } from 'react'

import CartContext from '../../../Store/CartContext';

import classes from './OrdersModal.module.css';

const Order = ({ mealData }) => {

    // Destructuring meal data
    const { mealName, amount, price } = mealData;

    // Destructuring cart context
    const { deleteItemHandler, addItemHandler } = useContext(CartContext);

    const deleteHandler = () => {
        deleteItemHandler(mealData)
    }

    const addHandler = () => {
        let newMealData = { ...mealData, amount: 1 }
        addItemHandler(newMealData)
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