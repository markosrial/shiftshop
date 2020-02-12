import React from 'react';
import {FormattedMessage} from 'react-intl';

const NetworkErrorMessage = () => (
    <div>
        <FormattedMessage id="project.app.NetworkErrorMessage.title"/>:<br/>
        <FormattedMessage id="project.app.NetworkErrorMessage.message"/> ...
    </div>
);

export default NetworkErrorMessage;
