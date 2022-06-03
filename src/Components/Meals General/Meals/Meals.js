import React, { useContext } from 'react'

// Regualr components
import Meal from '../Meal/Meal';

// UI components
import Card from '../../UI/Card/Card';

// Contexts
import MealsContext from '../../../Store/MealsContext';


const Meals = () => {

    // Get the array of all meals from meals context
    const mealsCtx = useContext(MealsContext);

    // Mapping meals context
    const mealsComps = mealsCtx._currentValue2.map(meal => {
        return <Meal key={meal.id} mealData={meal} />
    })

    return (
        <Card >
            {mealsComps}
        </Card>
    )
}

export default Meals