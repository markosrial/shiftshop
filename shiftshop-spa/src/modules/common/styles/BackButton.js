import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {marginRight: theme.spacing(1)}
}));

export default useStyles;
