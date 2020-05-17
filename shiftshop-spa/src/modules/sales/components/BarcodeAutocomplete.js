import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { debounce } from 'lodash';
import {FormattedMessage} from 'react-intl';
import {Icon, TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

import {barcodeIcon} from '../../../assets/images';

import * as actions from '../actions';
import Popper from '@material-ui/core/Popper';

const BarcodeIcon = () => (
    <Icon style={{height:'100%', textAlign: 'center'}}>
        <img src={barcodeIcon} alt="barcode icon"/>
    </Icon>);

const BarcodeAutocomplete = () => {

    const history = useHistory();

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const debounceInputChange = useCallback(debounce(value => getBarcodes(value), 400), []);

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false;
        // eslint-disable-next-line
    }, []);

    const onSelect = value => value && history.push(`/sales/records/${value}`);

    const onInputChange = (e, value) => {

        const startingCode = value.toUpperCase();

        setInputValue(startingCode);
        setOptions([]);

        if (startingCode.trim() === "") {
            setLoading(false);
            return;
        }

        setLoading(true);
        debounceInputChange(startingCode);

    }

    const getBarcodes = value =>
        actions.findFirstSaleBarcodes(value,
                barcodes => _isMounted.current && setOptions(barcodes),
            () => _isMounted.current && setLoading(false));



    return (
        <Autocomplete options={options} openOnFocus clearOnEscape style={{minWidth: '14rem'}}
                      value={null} onChange={(event, value) => onSelect(value)}
                      loading={loading} loadingText={<FormattedMessage id="project.sales.BarcodeAutocomplete.loadingOptions"/>}
                      inputValue={inputValue} onInputChange={onInputChange}
                      noOptionsText={<FormattedMessage id="project.sales.BarcodeAutocomplete.noOptions"/>}
                      renderInput={params =>
                          <TextField {...params} label={<FormattedMessage id="project.sales.BarcodeAutocomplete.label"/>}
                                     variant="outlined" margin="dense"
                                     InputProps={{...params.InputProps, startAdornment: (<BarcodeIcon/>)}}/>}
                      PopperComponent={props => <Popper {...props} style={{ width: 'auto', minWidth: '14rem'}}
                                                        />}
        />
    );

};

export default BarcodeAutocomplete;
