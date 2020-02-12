import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    root: { },
    submitButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
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
