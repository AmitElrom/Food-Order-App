import { useState, useRef } from 'react'

import { isNotEmpty, isNumChars } from '../../../Utils/Validities';

import classes from './Checkout.module.css';
// destructure classes 
const { form, control, actions, invalid, submit } = classes;

const Checkout = ({ onClose, onConfirm }) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        firstName: true,
        lastName: true,
        city: true,
        street: true,
        number: true,
        postalCode: true
    });
    // destructure formInputsValidity (object)
    const { firstName, lastName, city, street, number, postalCode } = formInputsValidity;

    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const cityInputRef = useRef();
    const streetInputRef = useRef();
    const numberInputRef = useRef();
    const postalInputRef = useRef();

    const confirmHandler = e => {
        e.preventDefault()

        // get values using refs
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredNumber = numberInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;

        // get validity using built in functions
        const firstNameIsValid = isNotEmpty(enteredFirstName);
        const lastNameIsValid = isNotEmpty(enteredLastName);
        const cityIsValid = isNotEmpty(enteredCity);
        const streetIsValid = isNotEmpty(enteredStreet);
        const numberIsValid = isNotEmpty(enteredNumber);
        const postalIsValid = isNumChars(enteredPostal, 7);

        // set form's inputs validity using state
        setFormInputsValidity({
            firstName: firstNameIsValid,
            lastName: lastNameIsValid,
            city: cityIsValid,
            street: streetIsValid,
            number: numberIsValid,
            postalCode: postalIsValid
        })

        // set form validity
        const isFormValid =
            firstNameIsValid &&
            lastNameIsValid &&
            cityIsValid &&
            streetIsValid &&
            numberIsValid &&
            postalIsValid;

        if (!isFormValid) {
            // pending - error message
            return;
        }

        onConfirm({
            firstName: enteredFirstName,
            lastName: enteredLastName,
            city: enteredCity,
            street: enteredStreet,
            number: enteredCity,
            postalCode: enteredPostal
        })
    }

    const firstNameClasses = firstName ? control : `${control} ${invalid}`;
    const lastNameClasses = lastName ? control : `${control} ${invalid}`;
    const cityClasses = city ? control : `${control} ${invalid}`;
    const streetClasses = street ? control : `${control} ${invalid}`;
    const numberClasses = number ? control : `${control} ${invalid}`;
    const postalCodeClasses = postalCode ? control : `${control} ${invalid}`;

    return (
        <form className={form} onSubmit={confirmHandler} >
            <h3>Personal Details</h3>
            <div className={classes.container} >
                <div className={firstNameClasses} >
                    <label htmlFor='first_name'>First Name</label>
                    <input type='text' id='first_name' ref={firstNameInputRef} />
                    {!firstName && <p>First Name is mandatory.</p>}
                </div>
                <div className={lastNameClasses} >
                    <label htmlFor='last_name'>Last Name</label>
                    <input type='text' id='last_name' ref={lastNameInputRef} />
                    {!lastName && <p>Last Name is mandatory.</p>}
                </div>
            </div>
            <div className={cityClasses} >
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!city && <p>City is mandatory.</p>}
            </div>
            <div className={streetClasses} >
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!street && <p>Street is mandatory.</p>}
            </div>
            <div className={numberClasses} >
                <label htmlFor='number'>Number</label>
                <input type='text' id='number' ref={numberInputRef} />
                {!number && <p>Number is mandatory.</p>}
            </div><div className={postalCodeClasses} >
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!postalCode && <p>Postal must contain only 7 digits.</p>}
            </div>
            <div className={actions} >
                <button type='button' onClick={onClose} >Close</button>
                <button type='submit' className={submit} >Confirm</button>
            </div>
        </form>
    )
}

export default Checkout