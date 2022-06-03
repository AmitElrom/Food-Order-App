import React from 'react'

const Meal = ({ mealData: { mealName, description, price, amount } }) => {
    return (
        <div>
            <h4>{mealName}</h4>
            <p>{description}</p>
            <p>${price}</p>
        </div>
    )
}

export default Meal