const isNatural = (num) => {
    return (num > 0.0) && (Math.floor(num) === num) && num !== Infinity;
}

export { isNatural }