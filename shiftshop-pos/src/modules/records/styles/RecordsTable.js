import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardContent: {
        flexGrow: 1,
        height: '100%'
    },
    actionsBox: {width: '100%'}
}));

export default useStyles;
