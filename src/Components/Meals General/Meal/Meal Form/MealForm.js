import React from 'react'

import Input from '../../../UI/Input/Input';

import classes from './MealForm.module.css';

const MealForm = ({ id, addMealHandler, defaultValue, onChange }) => {
    return (
        <form className={classes.form} onSubmit={addMealHandler} >
            <Input
                label='Amount'
                input={{
                    id,
                    min: '1',
                    max: '5',
                    type: 'number',
                    step: '1',
                    defaultValue,
                    onChange
                }} />

            <button type='submit'>
                + Add
            </button>
        </form>
    )
}

export default MealForm