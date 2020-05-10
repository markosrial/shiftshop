import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    stepContent: {
        paddingTop: theme.spacing(1)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    buttonProgress: {
        position: 'absolute',
    },
}));
