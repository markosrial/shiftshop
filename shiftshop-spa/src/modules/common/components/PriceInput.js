import React from 'react';
import NumberFormat from 'react-number-format';

const PriceInput = (props) => {

    const { inputRef, onChange, ...other } = props;

    return <NumberFormat {...other} getInputRef={inputRef} isNumericString suffix=" €"
                         onValueChange={values => onChange({target: {value: values.value,}})} />
};

export default PriceInput;
