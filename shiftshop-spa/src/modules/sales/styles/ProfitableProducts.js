import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        textTransform: 'uppercase',
        color: theme.palette.primary.contrastText,
        fontWeight: 700
    },
    details: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    avatar: {
        backgroundColor: theme.palette.light.main,
        color: theme.palette.primary.main,
        height: 48,
        width: 48
    },
    listItem: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        paddingBottom: theme.spacing(0),
    },
    chip: {
        backgroundColor: theme.palette.light.light,
        color: theme.palette.primary.main,
        fontWeight: 500
    },
}));

export default useStyles;
