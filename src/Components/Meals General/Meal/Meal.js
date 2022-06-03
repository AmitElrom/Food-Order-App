import React, { useContext, useReducer } from 'react';

// Utils
import { isNatural } from '../../../Utils/Validities';

// Contexts
import CartContext from '../../../Store/CartContext';

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

const Meal = ({ mealData }) => {

    const { mealName, description, price, amount } = mealData;

    const cartCtx = useContext(CartContext);
    console.log(cartCtx);

    // amount's state that handles amount's value and validity
    const [amountState, dispatchAmount] = useReducer(amountReducer, {
        value: amount,
        isValid: null
    });
    const { value } = amountState;


    const changeAmountHandler = (e) => {
        dispatchAmount({
            type: 'INPUT_CHANGE',
            payload: e.target.value
        })
        console.log(mealData);
    }

    // pending - building add function in cart context
    const addMealHandler = () => {
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