import React from 'react'

import classes from './Card.module.css';

const Card = ({ className, children }) => {

    let classNames = `${classes.card} ${className}`;

    return (
        <div className={classNames} >
            {children}
        </div>
    )
}

export default Card