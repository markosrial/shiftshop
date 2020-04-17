import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {padding: theme.spacing(3)},
    alert: {marginBottom: theme.spacing(2)},
    expansionPanel: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttonProgress: {position: 'absolute'},
}));

export default useStyles;
