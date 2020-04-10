import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

import * as selectors from '../selectors';

const CatalogAutocomplete = ({label, onSelect}) => {

    const catalog = useSelector(selectors.getCatalog);

    const [inputValue, setInputValue] = useState('');

    return (
        <Autocomplete options={catalog} getOptionLabel={option => option.name}
                      autoHighlight openOnFocus clearOnEscape style={{width: '100%'}}
                      value={null} onChange={(event, value) => onSelect(value)}
                      onClose={(e, reason) => (reason === 'select-option' || reason === "escape") && setInputValue('')}
                      inputValue={inputValue} onInputChange={(e, value) => setInputValue(value)}
                      noOptionsText={<FormattedMessage id="project.sales.CatalogAutocomplete.noOptions"/>}
                      renderInput={params =>
                          <TextField {...params} label={label} variant="outlined" margin="dense" fullWidth
                                     InputProps={{...params.InputProps}}/>}/>
    );
};

export default CatalogAutocomplete;
