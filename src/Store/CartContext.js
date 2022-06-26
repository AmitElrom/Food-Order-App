import { createContext, useState, useReducer, useEffect } from "react";
import axios from "axios";

const CartContext = createContext({
    meals: [],
    isCartSeen: false,
    totalPrice: 0,
    onAddMeal: () => { },
    showCartHandler: () => { },
    hideCartHandler: () => { },
    deleteAmountHandler: () => { },
    addAmountHandler: () => { },
    addItemHandler: () => { },
    deleteItemHandler: () => { },
    cleanCart: () => { }
});

const newMealReducer = (state, { payload, type }) => {
    let updatedMeal;
    let updatedMeals;

    switch (type) {
        case 'ADD':

            let existedMealIndex = state.meals.findIndex(meal => meal.id === payload.id);
            let existedMeal = state.meals[existedMealIndex];

            if (existedMeal) {
                updatedMeal = {
                    ...existedMeal,
                    amount: existedMeal.amount + payload.amount
                };
                updatedMeals = [...state.meals];
                updatedMeals[existedMealIndex] = updatedMeal;
                // update existed meal in firebase
                (async () => {
                    const { data: cartMeals } = await axios.get(`https://react-food-order-app-2ce6b-default-rtdb.firebaseio.com/cartMeals.json`)
                    // from object to 
                    const mealsArr = [];
                    for (const mealProp in cartMeals) {
                        let mealObj = cartMeals[mealProp];
                        mealObj.firebaseId = mealProp;
                        mealsArr.push(mealObj)
                    }
                    const { firebaseId } = mealsArr.find(meal => meal.id === existedMeal.id)
                    updatedMeal.firebaseId = firebaseId;
                    const { data } = await axios.put(`https://react-food-order-app-2ce6b-default-rtdb.firebaseio.com/cartMeals/${firebaseId}.json`, updatedMeal)
                    console.log(data);
                })()
            } else {
                updatedMeals = [...state.meals, payload];
                // create new meal in firebase
                (async () => {
                    await axios.post('https://react-food-order-app-2ce6b-default-rtdb.firebaseio.com/cartMeals.json', payload)
                })()
            }
            return {
                meals: updatedMeals,
                totalPrice: +(state.totalPrice + payload.amount * payload.price).toFixed(2)
            };

        case 'DELETE':

            let existedMealIndex2 = state.meals.findIndex(meal => meal.id === payload.id);

            let existedMeal2 = state.meals[existedMealIndex2];

            if (existedMeal2) {
                updatedMeal = {
                    ...existedMeal2,
                    amount: existedMeal2.amount - 1
                };
                if (existedMeal2.amount === 1) {
                    let filteredMeals = state.meals.filter(meal => meal.id !== existedMeal2.id)
                    updatedMeals = [...filteredMeals];
                } else if (existedMeal2.amount > 1) {
                    updatedMeals = [...state.meals];
                    updatedMeals[existedMealIndex2] = updatedMeal;
                }
            }
            return {
                meals: updatedMeals,
                totalPrice: +(state.totalPrice - payload.price).toFixed(2)
            };
        case 'DELETE_ALL':
            return {
                meals: [],
                totalPrice: 0
            }
        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {

    const [isCartSeen, setIsCartSeen] = useState(false);
    const [mealsState, setMealsState] = useReducer(newMealReducer, {
        meals: [],
        totalPrice: 0
    })
    const { meals, totalPrice } = mealsState;

    useEffect(() => {
        setMealsState({
            type: 'MEALS_CHANGE'
        })
    }, [meals])

    // new funcs

    const addItemHandler = (mealData) => {
        setMealsState({
            type: 'ADD',
            payload: mealData
        })
    }

    const deleteItemHandler = (mealData) => {
        setMealsState({
            type: 'DELETE',
            payload: mealData
        })
    }

    // new funcs

    const addMealHandler = (mealData) => {

        setMealsState({
            type: 'ADD_MEAL',
            payload: mealData
        })
    }

    const showCartHandler = () => {
        setIsCartSeen(true);
    }

    const hideCartHandler = () => {
        setIsCartSeen(false)
    }

    const deleteAmountHandler = (mealId) => {
        setMealsState({
            type: 'DELETE_AMOUNT',
            payload: mealId
        })
    }

    const addAmountHandler = (mealId) => {
        setMealsState({
            type: 'ADD_AMOUNT',
            payload: mealId
        })
    }

    const cleanCart = () => {
        setMealsState({
            type: 'DELETE_ALL'
        })
    }

    return (
        <CartContext.Provider
            value={{
                meals,
                isCartShown: false,
                onAddMeal: addMealHandler,
                showCartHandler,
                hideCartHandler,
                isCartSeen,
                totalPrice,
                deleteAmountHandler,
                addAmountHandler,
                addItemHandler,
                deleteItemHandler,
                cleanCart
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;