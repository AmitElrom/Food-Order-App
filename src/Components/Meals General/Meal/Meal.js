import React, { useReducer } from 'react';

import { isNatural } from '../../../Utils/Validities';

// amount reducer for amount state
// pending - add another case for validity
const amountReducer = (state, { type, payload }) => {
    switch (type) {
        case 'INPUT_CHANGE':
            return { value: +payload, isValid: isNatural(payload) };
        default:
            return state;
    }
}

const Meal = ({ mealData: { mealName, description, price, amount } }) => {


    const [amountState, dispatchAmount] = useReducer(amountReducer, {
        // amount's state that handles amount's value and validity
        value: amount,
        isValid: null
    });
    const { value } = amountState;


    const changeAmountHandler = (e) => {
        dispatchAmount({
            type: 'INPUT_CHANGE',
            payload: e.target.value
        })
    }

    const addMealHandler = () => {
        console.log(value);
    }

    return (
        <div>
            <h4>{mealName}</h4>
            <p>{description}</p>
            <p>${price}</p>
            <input
                type='number'
                defaultValue={value}
                onChange={changeAmountHandler} />
            <button onClick={addMealHandler} >+Add</button>
        </div>
    )
}

export default Meal