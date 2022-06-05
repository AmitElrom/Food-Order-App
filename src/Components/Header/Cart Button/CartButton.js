import React, { useContext, useState, useEffect } from 'react'

import CartContext from '../../../Store/CartContext'

const CartButton = () => {

    const { meals, showCartHandler } = useContext(CartContext);

    const [mealsAmount, setMealsAmount] = useState([]);
    const [totalMealsAmount, setTotalMealsAmount] = useState(0);

    // ? Do I need these two states above ?
    // pending - maybe to wotk with amount reducer
    useEffect(() => {
        setMealsAmount(meals.map(meal => { return meal.amount }))
    }, [meals])

    useEffect(() => {
        setTotalMealsAmount(mealsAmount.reduce((acc, current) => acc + current, 0))
    }, [mealsAmount])

    const clickCartHandler = () => showCartHandler()

    return (
        <button onClick={clickCartHandler} >Your Cart <span>{totalMealsAmount}</span></button>
    )
}

export default CartButton                   