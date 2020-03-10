import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {IconButton, ListItem, ListItemText, Tooltip} from '@material-ui/core';
import {Edit} from '@material-ui/icons';

const CategoriesListItem = ({category, edit}) => (
    <ListItem>
        <ListItemText primary={category.name}/>
        {edit && <Tooltip title={<FormattedMessage id="project.catalog.CategoriesListItem.modifyTooltip"/>}>
            <IconButton size="small" onClick={() => edit(category)}>
                <Edit/>
            </IconButton>
        </Tooltip>}
    </ListItem>
);

CategoriesListItem.propTypes = {
    category: PropTypes.object.isRequired,
    edit: PropTypes.func
};

export default CategoriesListItem;
