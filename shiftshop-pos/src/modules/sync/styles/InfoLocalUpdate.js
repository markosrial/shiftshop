import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    noDataChip: {
        backgroundColor: theme.palette.error.main
    },
    noDataText: {
        color: theme.palette.error.contrastText,
        fontWeight: 500
    },
    message : {
        color: theme.palette.secondary.contrastText,
        fontWeight: 500
    }
}));
