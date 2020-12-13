import {colors, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    connected: {background: theme.palette.success.light},
    connecting: {background: colors.amber[500]},
    disconnected: {background: theme.palette.error.main}
}));

export default useStyles;
