import React, { useContext, useState, useEffect } from 'react'

import CartContext from '../../../Store/CartContext'

import CartIcon from '../CartIcon';
import classes from './CartButton.module.css';

const CartButton = () => {

    const { meals, showCartHandler } = useContext(CartContext);

    const [mealsAmount, setMealsAmount] = useState([]);
    const [totalMealsAmount, setTotalMealsAmount] = useState(0);
    const [isBump, setIsBump] = useState(false);

    const btnClasses = `${classes.button} ${isBump && classes.bump}`

    // ? Do I need these two states above ?
    // pending - maybe to wotk with amount reducer
    useEffect(() => {
        setMealsAmount(meals.map(meal => { return meal.amount }))
    }, [meals])

    useEffect(() => {
        setTotalMealsAmount(mealsAmount.reduce((acc, current) => acc + current, 0))
        setIsBump(true)
    }, [mealsAmount])

    const clickCartHandler = () => showCartHandler()

    return (
        <button className={btnClasses} onClick={clickCartHandler} >
            <span className={classes.icon} ><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge} >{totalMealsAmount}</span>
        </button>
    )
}

export default CartButton                   