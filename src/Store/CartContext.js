import { createContext, useState } from "react";

const CartContext = createContext({
    meals: [],
    onAddMeal: () => { }
});

export const CartProvider = ({ children }) => {

    const [meals, setMeals] = useState([]);

    const addMealHandler = (mealData) => {
        setMeals(prevMeals => {

            // Check if the same meal already exists - 
            //if it exists don't add the meal, just increase the amount
            let existedMeal = prevMeals.find(meal => meal?.id === mealData.id)

            if (existedMeal) {
                existedMeal.amount += mealData.amount;
                const filteredMeals = prevMeals.filter(meal => meal?.id !== existedMeal.id)
                return [...filteredMeals, existedMeal]
            } else {
                return [...prevMeals, mealData]
            }
        })
        console.log(meals);
    }

    return (
        <CartContext.Provider
            value={{
                meals,
                onAddMeal: addMealHandler
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;