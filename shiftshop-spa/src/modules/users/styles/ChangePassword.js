import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {padding: theme.spacing(3)},
    alert: {marginBottom: theme.spacing(2)},
    repeatPassword: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(1),
        },
    },
    expansionPanel: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    buttonProgress: {position: 'absolute'},
}));

export default useStyles;
