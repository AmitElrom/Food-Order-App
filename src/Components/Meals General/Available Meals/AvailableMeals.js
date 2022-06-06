import React, { useContext } from 'react'

// Regualr components
import Meal from '../Meal/Meal Item/Meal';

// UI components
import Card from '../../UI/Card/Card';

// Contexts
import MealsContext from '../../../Store/MealsContext';

import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

    // Get the array of all meals from meals context
    const { _currentValue2: meals } = useContext(MealsContext);

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