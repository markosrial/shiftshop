import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';

import useStyles from '../styles/CategorySelector';

import * as selectors from '../selectors';

const CategorySelector = ({selectedCategory, handleSelectedCategory, allCategories, ...extra}) => {

    const classes = useStyles();

    /* Necessary -> outlined select  */
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    /* */

    const categories = useSelector(selectors.getCategories);

    return (
        <FormControl {...extra}>
            <InputLabel className={classes.placeholder} ref={inputLabel} id="categorySelector" shrink={allCategories || selectedCategory !== ''}>
                <FormattedMessage id="project.global.field.category"/>
            </InputLabel>
            <Select labelId="categorySelector" labelWidth={labelWidth}
                    value={selectedCategory} onChange={handleSelectedCategory}
                    displayEmpty={allCategories} notched={allCategories || selectedCategory !== ''}>
                {allCategories && <MenuItem key={0} value=""><FormattedMessage id="project.catalog.CategorySelector.allCategories"/></MenuItem>}
                {categories && categories.map(category =>
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

CategorySelector.propTypes = {
    selectedCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleSelectedCategory: PropTypes.func.isRequired,
    allCategories: PropTypes.bool,
};

export default CategorySelector;
