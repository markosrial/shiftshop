import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {padding: theme.spacing(3)},
    alert: {marginBottom: theme.spacing(2)},
    buttonProgress: {position: 'absolute'},
}));

export default useStyles;
