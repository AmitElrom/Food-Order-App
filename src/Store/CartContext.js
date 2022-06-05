import { createContext, useState, useReducer, useEffect } from "react";

const CartContext = createContext({
    meals: [],
    isCartSeen: false,
    totalPrice: 0,
    onAddMeal: () => { },
    showCartHandler: () => { },
    hideCartHandler: () => { },
    deleteAmountHandler: () => { },
    addAmountHandler: () => { }
});

const mealsReducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_MEAL':
            // Check if the same meal already exists - 
            //if it exists don't add the meal, just increase the amount
            let existedMeal = state.meals.find(meal => meal?.id === payload.id)

            if (existedMeal) {
                existedMeal.amount += payload.amount;
                const filteredMeals = state.meals.filter(meal => meal?.id !== existedMeal.id)
                return { meals: [...filteredMeals, existedMeal], totalPrice: state.totalPrice }
            } else {
                return { meals: [...state.meals, payload], totalPrice: state.totalPrice }
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
    const [mealsState, setMealsState] = useReducer(mealsReducer, {
        meals: [],
        totalPrice: 0
    })
    const { meals, totalPrice } = mealsState;

    useEffect(() => {
        setMealsState({
            type: 'MEALS_CHANGE'
        })
    }, [mealsState.meals])

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
                addAmountHandler
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;