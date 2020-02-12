
export const isEmpty = value => value.trim() === '';
export const isNotEmpty = value => !isEmpty(value);

export const isValidPrice = value => value.match(/^[0-9]+(\.[0-9]{0,2})?$/);
export const isValidPriceOrEmpty = value => value.match(/^([0-9]+(\.[0-9]{0,2})?)?$/);
