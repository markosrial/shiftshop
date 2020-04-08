import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    content: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    shoppingCart: {
        flexGrow: 1,
        height: '100%',
        paddingBottom: theme.spacing(1)
    }
}));

export default useStyles;
