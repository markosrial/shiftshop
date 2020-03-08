import React, {Fragment,useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {Box, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';

import useStyles from '../styles/CategorySelector';

import * as selectors from '../selectors';

const CategorySelector = ({selectedCategory, handleSelectedCategory, previous, allCategories, empty, ...extra}) => {

    const classes = useStyles();

    const categories = useSelector(selectors.getCategories);

    const previousCategory = selectors.getCategoryName(categories, previous);

    /* Necessary -> outlined select  */
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl {...extra}>
            <InputLabel className={classes.placeholder} ref={inputLabel} id="categorySelector" shrink={allCategories || selectedCategory !== ''}>
                <Box display="inline"><FormattedMessage id="project.global.field.category"/>{previousCategory && <Fragment> ({previousCategory})</Fragment>}</Box>
            </InputLabel>
            <Select labelId="categorySelector" labelWidth={labelWidth}
                    value={selectedCategory} onChange={handleSelectedCategory}
                    displayEmpty={allCategories} notched={allCategories || selectedCategory !== ''}>
                {empty && <MenuItem value="">&nbsp;</MenuItem>}
                {!empty && allCategories && <MenuItem value=""><FormattedMessage id="project.catalog.CategorySelector.allCategories"/></MenuItem>}
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
