const isNatural = num => {
    return (num > 0.0) && (Math.floor(num) === num) && num !== Infinity;
}

const isNotEmpty = value => {
    return value.trim() !== '';
}

const containsWhitespace = str => {
    return /\s/.test(str);
}

const isEmail = str => {
    return str.includes('@') && !containsWhitespace(str);
}

const isNumChars = (value, num) => {
    return value.length === num;
}

export { isNatural, isNotEmpty, isEmail, isNumChars }