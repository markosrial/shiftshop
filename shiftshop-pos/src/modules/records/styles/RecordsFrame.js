import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    content: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    recordsTable: {
        flexGrow: 1,
        height: '100%',
    }
}));

export default useStyles;
