import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    }
}));

export default useStyles;
