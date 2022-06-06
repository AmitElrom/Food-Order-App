import React, { Fragment } from 'react'

import CartButton from '../Cart Button/CartButton'

import classes from './Header.module.css';
import foodImage from '../../../Assets/food_pic.jpg';

const Header = () => {

    return (
        <Fragment>
            <header className={classes.header} >
                <h1>React Meals</h1>
                <span></span>
                <CartButton />
            </header>
            <div className={classes['main-image']} >
                <img src={foodImage} alt='food in restaurant' />
            </div>
        </Fragment>
    )
}

export default Header

