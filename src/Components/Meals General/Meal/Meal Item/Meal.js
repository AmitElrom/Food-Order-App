import React, { useContext, useReducer } from 'react';

// Utils
import { isNatural } from '../../../../Utils/Validities';

// Contexts
import CartContext from '../../../../Store/CartContext';

import classes from './Meal.module.css';

// amount reducer for amount state
// pending - add another case for validity
const amountReducer = (state, { type, payload }) => {
    switch (type) {
        case 'INPUT_CHANGE':
            return { value: +payload, isValid: isNatural(+payload) };
        default:
            return state;
    }
}

const Meal = ({ mealData }) => {

    const { mealName, description, price, amount } = mealData;

    const cartCtx = useContext(CartContext);

    // amount's state that handles amount's value and validity
    const [amountState, dispatchAmount] = useReducer(amountReducer, {
        value: amount,
        isValid: true
    });
    const { value, isValid } = amountState;

    const changeAmountHandler = (e) => {
        dispatchAmount({
            type: 'INPUT_CHANGE',
            payload: e.target.value
        })
    }

    // pending - add validations
    const addMealHandler = () => {
        if (isValid) {
            const meal = { ...mealData, amount: value }
            cartCtx.onAddMeal(meal)
        }
    }

    return (
        <li className={classes.meal} >
            <div >
                <h3>{mealName}</h3>
                <div className={classes.description} >{description}</div>
                <div className={classes.price} >${price}</div>
            </div>
            <div>
                <input
                    type='number'
                    defaultValue={value}
                    min='1'
                    onChange={changeAmountHandler} />
                <button onClick={addMealHandler} >+Add</button>
            </div>
        </li>
    )
}

export default Meal