import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    submitButton: {
        fontWeight: theme.typography.fontWeightBold
    },
    buttonProgress: {
        position: 'absolute',
    },
    errorMessage: {
        display: 'flex',
        alignItems: 'center'
    },
    errorIcon: {
        marginRight: theme.spacing(1)
    }
}));
