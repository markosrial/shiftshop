import React from 'react';
import {Avatar, Box, CircularProgress, colors, makeStyles} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {useSelector} from 'react-redux';
import {Receipt} from '@material-ui/icons';

import * as selectors from '../selectors';
import MonthResumeCard from './MonthResumeCard';


const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundImage: `linear-gradient(180deg, ${colors.brown[300]} 0%, ${colors.brown[900]} 100%)`,
        height: 48,
        width: 48
    }
}));

const MonthSalesCount = () => {

    const classes = useStyles();

    const monthSalesResume = useSelector(selectors.getMonthSalesResume);

    return (
        <MonthResumeCard title={<FormattedMessage id="project.sales.MonthSalesCount.title"/>}
                         content={monthSalesResume
                             ? <Box component="h3">{monthSalesResume.salesCount}</Box>
                             : <CircularProgress size={24}/>}
                         icon={<Avatar className={classes.avatar}><Receipt/></Avatar>}
        />
    );
};

export default MonthSalesCount;
