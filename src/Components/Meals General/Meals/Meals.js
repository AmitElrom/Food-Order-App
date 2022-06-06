import React, { Fragment } from 'react'

import MealsSummary from '../Meals Summary/MealsSummary';
import AvailableMeals from '../Available Meals/AvailableMeals';

const Meals = () => {

    return (
        <Fragment>
            <MealsSummary />
            <AvailableMeals />
        </Fragment>
    )
}

export default Meals