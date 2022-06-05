import React, { useContext } from 'react'

import CartContext from '../../../Store/CartContext';

const Order = ({ mealData }) => {

    // Destructuring meal data
    const { id, mealName, amount, price } = mealData;

    // Destructuring cart context
    const { deleteAmountHandler } = useContext(CartContext);

    const deleteHandler = () => {
        deleteAmountHandler(id)
    }

    return (
        <div>
            <p><strong>{mealName}</strong></p>
            <div>
                {price}{' '}{`x${amount}`}{' '}
                <button onClick={deleteHandler} >-</button>
                <button>+</button>
            </div>
        </div>
    )
}

export default Order