import React, { Fragment, useEffect, useState } from 'react'
import useHttp from '../../../Hooks/use-http';
// import axios from 'axios';

// Regualr components
import Meal from '../Meal/Meal Item/Meal';

// UI components
import Card from '../../UI/Card/Card';
import LoadingIcon from '../../UI/Loading/LoadingIcon';

// Contexts
// import MealsContext from '../../../Store/MealsContext';

import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);


    const { isLoading, error, sendRequest: getMeals } = useHttp();

    // meals from firebase db
    useEffect(() => {
        const transformMeals = mealsObj => {
            const loadedMeals = [];
            for (const mealProp in mealsObj) {
                loadedMeals.push(mealsObj[mealProp])
            }
            setMeals(loadedMeals)
        }

        getMeals({
            method: 'GET',
            url: 'https://react-food-order-app-2ce6b-default-rtdb.firebaseio.com/meals.json'
        }, transformMeals)
    }, [getMeals])

    // Get the array of all meals from meals context - alternative to firebase
    // const { _currentValue2: meals } = useContext(MealsContext);

    // Mapping meals context
    const mealsComps = <ul>{meals.map(meal => {
        return <Meal key={meal.id} mealData={meal} />
    })}</ul>

    if (isLoading) {
        return <LoadingIcon />
    }

    let content = mealsComps;
    if (error) {
        content = <div className={classes.error} >
            <h3>{error}</h3>
            <button className={classes.button} onClick={getMeals} >Try Again</button>
        </div>
    }

    return (
        <Fragment>
            {!error && !isLoading && <Card className={classes.meals} >
                {content}
            </Card>}
        </Fragment>
    )
}

export default AvailableMeals