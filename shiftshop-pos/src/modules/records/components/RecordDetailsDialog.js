import React, {Fragment} from 'react';
import {FormattedDate, FormattedMessage, FormattedTime} from 'react-intl';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import {Close} from '@material-ui/icons';

import useStyles from '../styles/RecordDeetailsDialog';

const RecordsDetailsDialog = ({record, printRecord, closeDialog}) => {

    const classes = useStyles();

    if (!record) {
        return null;
    }

    return (
        <Dialog open fullWidth scroll="body" onClose={closeDialog}>
            <DialogTitle>
                <Typography component="span" variant="h4">
                    <FormattedMessage id="project.records.RecordDetailsDialog.title"/>
                </Typography>
                <IconButton className={classes.closeButton} onClick={closeDialog}>
                    <Close/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <List component={Paper} style={{paddingTop: 0, paddingBottom: 0}}>
                    <ListItem selected>
                        <Box display="flex" width={1}>
                            <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                <FormattedMessage id="project.global.field.barcode"/>&nbsp;
                            </Box>
                            <Box>{record.barcode}</Box>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box display="flex" width={1}>
                            <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                <FormattedMessage id="project.global.field.date"/>&nbsp;
                            </Box>
                            <Box>
                                <FormattedTime value={record.date} hour="numeric" minute="numeric" second="numeric"/>
                                &nbsp;-&nbsp;
                                <FormattedDate value={record.date}/>
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem selected>
                        <Box display="flex" width={1}>
                            <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                <FormattedMessage id="project.records.RecordDetailsDialog.numItems"/>&nbsp;
                            </Box>
                            <Box>{record.items.length}</Box>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box width={1}>
                            <Box fontWeight={700} fontStyle="italic" mb={1}>
                                <FormattedMessage id="project.records.RecordDetailsDialog.products"/>&nbsp;
                            </Box>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead style={{backgroundColor: 'white'}}>
                                        <TableRow>
                                            <TableCell><FormattedMessage id="project.global.field.name"/></TableCell>
                                            <TableCell align="right"><FormattedMessage id="project.global.field.quantity"/></TableCell>
                                            <TableCell align="right"><FormattedMessage id="project.global.field.unitPrice"/></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {record.items.map(
                                            item => <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell align="right">x{item.quantity}</TableCell>
                                                <TableCell align="right">{item.salePrice.toFixed(2)} €</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </ListItem>
                    <ListItem selected>
                        <Box width={1}>
                            {record.discount &&
                            <Fragment>
                                <Box display="flex" width={1} mb={1}>
                                    <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                        <FormattedMessage id="project.global.field.subtotal"/>:&nbsp;
                                    </Box>
                                    <Box>{(record.total + record.discount).toFixed(2)} €</Box>
                                </Box>
                                <Box display="flex" width={1} mb={1}>
                                    <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                        <FormattedMessage id="project.global.field.discount"/>:&nbsp;
                                    </Box>
                                    <Box>{record.discount.toFixed(2)} €</Box>
                                </Box>
                            </Fragment>}
                            <Box display="flex" width={1}>
                                <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                    <FormattedMessage id="project.global.field.total"/>:&nbsp;
                                </Box>
                                <Box fontWeight={700}>{record.total.toFixed(2)} €</Box>
                            </Box>
                        </Box>
                    </ListItem>
                    {record.cash && <ListItem>
                        <Box width={1}>
                            <Box display="flex" width={1} mb={1}>
                                <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                    <FormattedMessage id="project.global.field.cash"/>:&nbsp;
                                </Box>
                                <Box>{record.cash.toFixed(2)} €</Box>
                            </Box>
                            <Box display="flex" alignItems="center" width={1} disabled>
                                <Box fontWeight={700} fontStyle="italic" flexGrow={1}>
                                    <FormattedMessage id="project.global.field.change"/>
                                </Box>
                                <Box fontWeight={700}>{(record.cash - record.total).toFixed(2)} €</Box>
                            </Box>
                        </Box>
                    </ListItem>}
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" autoFocus disableElevation onClick={printRecord}>
                    <FormattedMessage id="project.global.button.print"/>
                </Button>
            </DialogActions>
        </Dialog>
    );

};

export default RecordsDetailsDialog;

