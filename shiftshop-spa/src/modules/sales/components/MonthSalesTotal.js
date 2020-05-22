import React from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Avatar, Box, CircularProgress, colors, makeStyles} from '@material-ui/core';
import {LocalAtm} from '@material-ui/icons';

import * as selectors from '../selectors';
import MonthResumeCard from './MonthResumeCard';

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundImage: `linear-gradient(180deg, ${colors.indigo[300]} 0%, ${colors.indigo[800]} 100%)`,
        height: 48,
        width: 48
    }
}));

const MonthSalesTotal = () => {

    const classes = useStyles();

    const monthSalesResume = useSelector(selectors.getMonthSalesResume);

    return (
        <MonthResumeCard title={<FormattedMessage id="project.sales.MonthSalesTotal.title"/>}
                         content={monthSalesResume
                             ? <Box component="h3">{monthSalesResume.total.toFixed(2)}&nbsp;€</Box>
                             : <CircularProgress size={24}/>}
                         icon={<Avatar className={classes.avatar}><LocalAtm/></Avatar>}
        />
    );
};

export default MonthSalesTotal;
