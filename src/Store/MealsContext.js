import { createContext } from "react";

// fake db - meals collection
const MealsContext = createContext([
    {
        id: 'i1',
        mealName: 'Sushi',
        description: 'Finest meal and veggies',
        price: 22.99,
        amount: null
    },
    {
        id: 'i2',
        mealName: 'Schnitzel',
        description: 'A german specialty',
        price: 16.50,
        amount: null
    },
    {
        id: 'i3',
        mealName: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
        amount: null
    },
    {
        id: 'i4',
        mealName: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
        amount: null
    }
]);

export const MealsProvider = ({ children }) => {

    return (
        <MealsContext.Provider value={MealsContext} >
            {children}
        </MealsContext.Provider>
    )
}

export default MealsContext;