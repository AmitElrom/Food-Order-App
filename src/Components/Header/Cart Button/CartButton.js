import React, { useContext, useState, useEffect } from 'react'

import CartContext from '../../../Store/CartContext'

const CartButton = () => {

    const { meals } = useContext(CartContext);

    const [mealsAmount, setMealsAmount] = useState([]);
    const [totalMealsAmount, setTotalMealsAmount] = useState(0);

    // ? Do I need these two states above ?
    // pending - maybe to wotk with amount reducer
    useEffect(() => {
        setMealsAmount(meals.map(meal => { return meal.amount }))
        setTotalMealsAmount(prevValue => {
            mealsAmount.forEach(amount => {
                prevValue = prevValue + amount
            })
            return prevValue
        })
    }, [meals, mealsAmount])

    return (
        <button>Your Cart <span>{totalMealsAmount}</span></button>
    )
}

export default CartButton                   