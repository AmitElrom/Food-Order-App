import { createContext, useState, useReducer, useEffect } from "react";

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
            } else {
                updatedMeals = [...state.meals, { ...payload }];
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

const mealsReducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_MEAL':
            // Check if the same meal already exists - 
            //if it exists don't add the meal, just increase the amount

            let existedMealIndex = state.meals.findIndex(meal => meal?.id === payload.id)
            let existedMeal = state.meals[existedMealIndex]

            let updatedMeal;
            let updatedMeals;

            if (existedMeal) {
                updatedMeal = {
                    ...existedMeal,
                    amount: existedMeal.amount + payload.amount
                };
                updatedMeals = [...state.meals];
                updatedMeals[existedMealIndex] = updatedMeal;
            } else {
                updatedMeal = { ...payload };
                updatedMeals = state.meals.concat(updatedMeal);
            }
            return {
                meals: updatedMeals,
                totalPrice: state.totalPrice
            }
        case 'MEALS_CHANGE':
            const totalPrice = state.meals.map(meal => {
                const { price, amount } = meal
                return price * amount
            }).reduce((acc, price) => acc + price, 0)

            return {
                meals: state.meals,
                totalPrice
            }
        case 'DELETE_AMOUNT':
            const filteredMeals = state.meals.filter(meal => meal.id !== payload)
            let wantedMeal = state.meals.find(meal => meal.id === payload)
            wantedMeal.amount -= 1
            if (wantedMeal.amount <= 0) {
                return {
                    totalPrice: state.totalPrice,
                    meals: [...filteredMeals]
                }
            }
            return {
                totalPrice: state.totalPrice,
                meals: [...filteredMeals, wantedMeal]
            }
        case 'ADD_AMOUNT':
            const filteredMeals2 = state.meals.filter(meal => meal.id !== payload)
            let wantedMeal2 = state.meals.find(meal => meal.id === payload)
            wantedMeal2.amount += 1
            return {
                totalPrice: state.totalPrice,
                meals: [...filteredMeals2, wantedMeal2]
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