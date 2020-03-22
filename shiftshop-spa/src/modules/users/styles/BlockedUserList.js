import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    list: {padding: theme.spacing(0)},
    listItem: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0)
    }
}));

export default useStyles;
