import {isIPv4} from 'net';

export const isEmpty = value => value.trim() === '';
export const isNotEmpty = value => !isEmpty(value);
export const isFullEmpty = value => value === '';
export const isNotFullEmpty = value => !isFullEmpty(value);

export const isValidIPv4 = value => isIPv4(value);
