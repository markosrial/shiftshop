import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {Box, FormControl, Grid, InputLabel, MenuItem, Select} from '@material-ui/core';

import useStyles from '../styles/RoleMultiSelector';

import * as selectors from '../selectors';
import Chip from '@material-ui/core/Chip';
import Role from '../constants/Role';

const RoleName = ({roles, id}) => {

    const role = selectors.getRoleName(roles, id);
    const message = `project.global.field.roles.${role !== '' ? role : '?'}`;

    return <FormattedMessage id={message}/>
};

const RoleChip = ({roles, id}) => {

    const classes = useStyles();

    const role = selectors.getRoleName(roles, id);
    const message = `project.global.field.roles.${role !== '' ? role : '?'}`;

    let chipClasses;

    switch (role) {
        case Role.ADMIN:
            chipClasses = classes.adminChip;
            break;
        case Role.MANAGER:
            chipClasses = classes.managerChip;
            break;
        case Role.SALESMAN:
            chipClasses = classes.salesmanChip;
            break;
        default:
            chipClasses = classes.undefinedChip;
            break;
    }

    return (
        <Chip className={chipClasses} size="small" label={<FormattedMessage id={message}/>}/>
    );
};

const RoleMultiSelector = ({selectedRoles, handleSelectedRoles, ignoreRoles, ...extra}) => {

    const classes = useStyles();

    const roles = useSelector(selectors.getRoles);

    /* Necessary -> outlined select  */
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl {...extra}>
            <InputLabel className={classes.placeholder} ref={inputLabel} id="roleMultiSelector">
                <Box display="inline"><FormattedMessage id="project.global.field.roles"/></Box>
            </InputLabel>
            <Select labelId="roleMultiSelector" labelWidth={labelWidth}
                    value={selectedRoles} onChange={handleSelectedRoles}
                    multiple
                    MenuProps={{
                        anchorOrigin: {vertical: "bottom", horizontal: "left"},
                        transformOrigin: {vertical: "top", horizontal: "left"},
                        getContentAnchorEl: null
                    }}
                    renderValue={selected => (
                        <Grid container spacing={1}>
                            {selected.map(value => (
                                <Grid item key={value}>
                                    <RoleChip roles={roles} id={value}/>
                                </Grid>
                            ))}
                        </Grid>
                    )}>
                {roles && roles.map(role =>
                    !ignoreRoles.includes(role.name) && <MenuItem key={role.id} value={role.id}><RoleName roles={roles} id={role.id}/></MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

RoleMultiSelector.defaultProps = {
    ignoreRoles: []
};

RoleMultiSelector.propTypes = {
    selectedRoles: PropTypes.array.isRequired,
    handleSelectedRoles: PropTypes.func.isRequired,
    ignoreRoles: PropTypes.array
};

export default RoleMultiSelector;
