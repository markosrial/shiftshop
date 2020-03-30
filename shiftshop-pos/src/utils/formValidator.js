
export const isEmpty = value => value.trim() === '';
export const isNotEmpty = value => !isEmpty(value);
export const isFullEmpty = value => value === '';
export const isNotFullEmpty = value => !isFullEmpty(value);
