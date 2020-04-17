
export const isEmpty = value => value.trim() === '';
export const isNotEmpty = value => !isEmpty(value);
export const isFullEmpty = value => value === '';
export const isNotFullEmpty = value => !isFullEmpty(value);

export const isCategorySelected = value => value !== '';
export const isSomeRoleSelected = value => value.length !== 0;

export const isValidPrice = value => value.match(/^[0-9]+(\.[0-9]{1,2})?$/);
export const isValidPriceOrEmpty = value => value.match(/^([0-9]+(\.[0-9]{1,2})?)?$/);
