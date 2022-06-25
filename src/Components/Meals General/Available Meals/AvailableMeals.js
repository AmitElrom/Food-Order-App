import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

// Regualr components
import Meal from '../Meal/Meal Item/Meal';

// UI components
import Card from '../../UI/Card/Card';

// Contexts
import MealsContext from '../../../Store/MealsContext';

import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);

    // meals from firebase db
    useEffect(() => {
        (async () => {
            const { data: mealsObj } = await axios.get('https://react-food-order-app-2ce6b-default-rtdb.firebaseio.com/meals.json')

            // from meal objects from firsbase db to meals array
            const loadedMeals = [];
            for (const mealProp in mealsObj) {
                // setMeals(prevMeals => prevMeals.concat(mealsObj[mealProp]))
                loadedMeals.push(mealsObj[mealProp])
            }
            setMeals(loadedMeals)
        })()
    }, [])

    useEffect(() => {
        console.log(meals);
    }, [meals])

    // Get the array of all meals from meals context
    // const { _currentValue2: meals } = useContext(MealsContext);

    // Mapping meals context
    const mealsComps = meals.map(meal => {
        return <Meal key={meal.id} mealData={meal} />
    })

    return (
        <Card className={classes.meals} >
            <ul>
                {mealsComps}
            </ul>
        </Card>
    )
}

export default AvailableMeals