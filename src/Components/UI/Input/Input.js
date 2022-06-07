import React from 'react'

import classes from './Input.module.css';

const Input = ({ input, label }) => {
    return (
        <div className={classes.input} >
            <label htmlFor={input.id} >{label}</label>
            <input {...input} onChange={input.onChange} />
        </div>
    )
}

export default Input