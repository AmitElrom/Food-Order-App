import React, { Fragment, useContext } from 'react'
import { createPortal } from 'react-dom';

import classes from './Modal.module.css';

import CartContext from '../../../Store/CartContext';

const Backdrop = () => {

    const { hideCartHandler } = useContext(CartContext);

    return <div className={classes.backdrop} onClick={hideCartHandler} ></div>
}

const ModalOverlay = ({ children }) => {
    return <div className={classes.modal} >
        <div className={classes.content} >{children}</div>
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal = ({ children }) => {
    return (
        <Fragment>
            {createPortal(<Backdrop />, portalElement)}
            {createPortal(<ModalOverlay classes={classes} >{children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal