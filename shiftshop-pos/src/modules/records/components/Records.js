import React, {useState} from 'react';
import {FormattedMessage, FormattedTime} from 'react-intl';
import {
    Box,
    Button,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';
import {Print, Visibility} from '@material-ui/icons';

import {noRecords} from '../../../assets/images';
import useStyles from '../styles/Records';
import RecordsDetailsDialog from './RecordDetailsDialog';

const Records = ({records}) => {

    const classes = useStyles();

    const [selectedRecord, setSelectedRecord] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const printRecord = sale => console.log(sale);

    if (records.length === 0) {
        return (
            <Box className={classes.rootBox}>
                <Box className={classes.emptyPlaceholder}>
                    <img className={classes.image} src={noRecords} alt="Empty records"/>
                    <Typography className={classes.emptyText} variant="subtitle1">
                        <FormattedMessage id="project.records.Records.emptySales"/>
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Paper className={classes.recordsPaper}>
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><FormattedMessage id="project.global.field.barcode"/></TableCell>
                            <TableCell align="center"><FormattedMessage id="project.global.field.hour"/></TableCell>
                            <TableCell align="right"><FormattedMessage id="project.global.field.total"/></TableCell>
                            <TableCell align="center"><FormattedMessage id="project.global.field.actions"/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                            sale => <TableRow key={sale.barcode}>
                                <TableCell>{sale.barcode}</TableCell>
                                <TableCell align="center">
                                    <FormattedTime value={sale.date} hour='numeric' minute='numeric' second='numeric'/>
                                </TableCell>
                                <TableCell align="right">{sale.total.toFixed(2)} €</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" onClick={() => setSelectedRecord(sale)} disableElevation>
                                        <Visibility fontSize="small"/>
                                    </Button>
                                    &nbsp;
                                    <Button variant="outlined" onClick={null} disableElevation>
                                        <Print fontSize="small"/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider/>
            <Box display="flex">
                <Box flexGrow={1}/>
                <TablePagination component="div" count={records.length} page={page}
                                 rowsPerPageOptions={[10, 20]} rowsPerPage={rowsPerPage}
                                 onChangePage={handleChangePage}
                                 onChangeRowsPerPage={handleChangeRowsPerPage}/>
            </Box>
            {selectedRecord && <RecordsDetailsDialog record={selectedRecord}
                                                     printRecord={printRecord}
                                                     closeDialog={() => setSelectedRecord(null)}/>}
        </Paper>
    );

}

export default Records;
