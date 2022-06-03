const isNatural = (num) => {
    return (num >= 0.0) && (Math.floor(num) === num) && num !== Infinity;
}

// Is natural, equal and bigger than number function
const isEqualAndBigger = (checkedNumber, number) => {
    return checkedNumber > number;
}

export { isEqualAndBigger, isNatural }