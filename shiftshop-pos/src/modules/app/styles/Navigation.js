import {colors, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {marginBottom: theme.spacing(2),},
    navTitle: {
        color: colors.blueGrey[500],
        fontSize: '0.8rem',
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'uppercase',
    }
}));

export default useStyles;
