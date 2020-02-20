import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        overflowY: 'auto',
    },
    content: {
        padding: theme.spacing(2),
        minWidth: theme.spacing(30)
    },
    navigation: {marginTop: theme.spacing(2)}
}));

export default useStyles;
