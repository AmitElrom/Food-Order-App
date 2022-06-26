import { useState } from "react";

const useInput = (validationFunc) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validationFunc(enteredValue);
    const hasError = !isValid && isTouched;

    const inputChangeHandler = e => {
        setEnteredValue(e.target.value)
    }

    const inputBlurHandler = () => {
        setIsTouched(true)
    }

    return {
        enteredValue,
        hasError,
        isTouched,
        isValid,
        inputChangeHandler,
        inputBlurHandler
    }
}

export default useInput;