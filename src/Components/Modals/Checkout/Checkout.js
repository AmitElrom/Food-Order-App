import { useState } from 'react'

const Checkout = () => {

    const [isConfirmed, setIsConfirmed] = useState(false);

    const submitFormHandler = e => {
        e.preventDefault()

        setIsConfirmed(true)
    }

    return (
        <form onSubmit={submitFormHandler} >
            <div>
                <label htmlFor='first_name'>First Name</label>
                <input type='text' id='first_name' />
            </div>
            <div>
                <label htmlFor='last_name'>Last Name</label>
                <input type='text' id='last_name' />
            </div>
            <div>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' />
            </div>
            <div>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' />
            </div><div>
                <label htmlFor='number'>Number</label>
                <input type='text' id='number' />
            </div><div>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' />
            </div>
            <div>
                <button type='button'>Back to Cart</button>
                <button type='button'>Close</button>
                <button type='submit'>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout