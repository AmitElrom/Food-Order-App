import React, { useEffect } from 'react'

const Order = ({ mealData }) => {

    // Destructuring meal data
    const { id, mealName, description, amount, price } = mealData;

    return (
        <div>
            <span>{mealName}</span>
        </div>
    )
}

export default Order