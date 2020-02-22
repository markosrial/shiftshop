import React from 'react';
import PropTypes from 'prop-types';
import {ListItem, ListItemText} from '@material-ui/core';

const CategoriesListItem = ({category}) => (
    <ListItem>
        <ListItemText primary={category.name}/>
    </ListItem>
);

CategoriesListItem.propTypes = {
    category: PropTypes.object.isRequired
};

export default CategoriesListItem;
