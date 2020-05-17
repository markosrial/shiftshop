import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    gridRow: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
    gridRowSelected: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        backgroundColor: theme.palette.light.main
    },
    rowContent: {
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing(1),
        },
    }
}));

export default useStyles;
