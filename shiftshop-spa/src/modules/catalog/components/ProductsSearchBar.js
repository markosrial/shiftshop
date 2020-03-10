import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {Button, Hidden, TextField} from '@material-ui/core';
import {Search} from '@material-ui/icons';

import useStyles from '../styles/ProductsSearchBar';

import CategorySelector from './CategorySelector';

const ProductsSearchBar = ({keywords, category, handleChangeKeywords, handleChangeCategory, searching, onSearch}) => {
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        onSearch();
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <CategorySelector className={classes.categorySelect} allCategories
                              selectedCategory={category} handleSelectedCategory={handleChangeCategory}
                              variant="outlined" margin="dense" fullWidth/>
            <TextField className={classes.searchText} label={<FormattedMessage id="project.global.field.keywords"/>}
                       value={keywords} onChange={handleChangeKeywords}
                       variant="outlined" margin="dense" fullWidth/>
            <Button className={classes.searchButton} size="medium" variant="contained" color="primary"
                    type="submit" disabled={searching}>
                <Search fontSize="small"/><Hidden smUp>&nbsp;<FormattedMessage id="project.global.button.search"/></Hidden>
            </Button>
        </form>
    );
};

ProductsSearchBar.propTypes = {
    keywords: PropTypes.string.isRequired,
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleChangeKeywords: PropTypes.func.isRequired,
    handleChangeCategory: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired
};


export default ProductsSearchBar;
