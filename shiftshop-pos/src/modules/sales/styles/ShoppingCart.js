import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardContent: {
        flexGrow: 1,
        height: '100%',
        overflow: 'hidden'
    }
}));

export default useStyles;
