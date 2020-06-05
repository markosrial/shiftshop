import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    }
}));

export default useStyles;
