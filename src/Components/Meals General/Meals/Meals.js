import React, { useContext } from 'react'

// Regualr components
import Meal from '../Meal/Meal';

// UI components
import Card from '../../UI/Card/Card';

// Contexts
import MealsContext from '../../../Store/MealsContext';


const Meals = () => {

    // Get the array of all meals from meals context
    const { _currentValue2: meals } = useContext(MealsContext);

    // Mapping meals context
    const mealsComps = meals.map(meal => {
        return <Meal key={meal.id} mealData={meal} />
    })

    return (
        <Card >
            {mealsComps}
        </Card>
    )
}

export default Meals