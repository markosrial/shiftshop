import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    topBar: {
        zIndex: 2,
        position: 'relative'
    },
    container: {
        display: 'flex',
        flex: '1 1',
        overflow: 'hidden'
    },
    sideBar: {
        zIndex: 3,
        flex: '0 0'
    },
    content: {
        flex: '1 1',
        overflowY: 'auto',
        maxWidth: '100%',
        margin: '0 auto',
        padding: theme.spacing(2),
    },
}));

export default useStyles;
