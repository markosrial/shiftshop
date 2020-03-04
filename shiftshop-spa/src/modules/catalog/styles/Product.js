import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    gridRow: {padding: theme.spacing(1)},
    rowContent: {
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing(1),
        },
    }
}));

export default useStyles;
