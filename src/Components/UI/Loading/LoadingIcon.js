import React from 'react'

import classes from './LoadingIcon.module.css';

const LoadingIcon = () => {
    return (
        <div class={classes['lds-ellipsis']}><div></div><div></div><div></div><div></div></div>
    )
}

export default LoadingIcon