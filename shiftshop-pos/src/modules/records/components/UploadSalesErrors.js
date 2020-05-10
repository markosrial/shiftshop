import React, {Fragment, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    List,
    ListItem,
    Typography
} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {ErrorContent} from '../../common';
import DialogTitle from '@material-ui/core/DialogTitle';

const UploadSalesErrors = ({errors}) => {

    const [open, setOpen] = useState(false);

    if (!errors || errors.length === 0) {
        return null;
    }

    const closeDialog = () => setOpen(false);

    return (
        <Box>
            <Button size="small" variant="contained" color="secondary" disableElevation
                    onClick={() => setOpen(true)}>
                <FormattedMessage id="project.global.buttons.viewErrors"/>
            </Button>
            <Dialog open={open} scroll="body" onBackdropClick={closeDialog}>
                <DialogTitle>
                    <Typography component="span" variant="h5">
                        <FormattedMessage id="project.records.UploadSalesError.title"/>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <List style={{margin: 0, padding: 0}}>
                        <Divider/>
                        {errors.map(error => (
                            <Fragment key={error.barcode}>
                                <ListItem>
                                    <Box>
                                        <Box mb={1} fontStyle="italic" fontWeight="fontWeightMedium"><FormattedMessage id="project.global.field.sale"/>: {error.barcode}</Box>
                                        {error.content
                                            ? <Box ml={1} fontSize="body1.fontSize"> <ErrorContent errors={error.content}/></Box>
                                            : <Box fontSize="body1.fontSize"><FormattedMessage id="project.records.UploadSalesError.uploadError"/></Box>}
                                    </Box>
                                </ListItem>
                                <Divider/>
                            </Fragment>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" size="small" disableElevation
                            onClick={closeDialog}>
                        <FormattedMessage id="project.global.button.close"/>
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

}

export default UploadSalesErrors;
