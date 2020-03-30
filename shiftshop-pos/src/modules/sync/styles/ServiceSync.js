import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    errorMessage: {
        display: 'flex',
        alignItems: 'center'
    },
    errorIcon: {
        marginRight: theme.spacing(1)
    }
}));
