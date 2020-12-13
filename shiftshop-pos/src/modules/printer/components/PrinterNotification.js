import React from 'react';
import {Box} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

const PrinterNotification = ({id, errorCode}) => (
    <Box>
        <FormattedMessage id={id}/>
        <br/>
        {errorCode && <FormattedMessage id="project.printer.connection.errorCode" values={{errorCode}}/>}
    </Box>
);

export default PrinterNotification;
