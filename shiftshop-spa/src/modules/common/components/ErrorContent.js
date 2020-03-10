import React from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);

const ErrorContent = ({errors}) => {
    const intl = useIntl();

    if (!errors) {
        return null;
    }

    let globalError;
    let fieldErrors;

    if (errors.globalError) {
        globalError = errors.globalError;
    } else if (errors.fieldErrors) {
        fieldErrors = [];
        errors.fieldErrors.forEach(e => {
            let fieldName = intl.formatMessage({id: `project.global.field.${e.fieldName}`});
            fieldErrors.push(`${fieldName}: ${e.message}`);
        });
    }

    return (
        <div>
            {globalError ? capitalizeFirstLetter(globalError) : ''}
            {fieldErrors
                ? <ul style={{paddingLeft: '1rem'}}>
                    {fieldErrors.map((fieldError, index) =>
                        <li key={index}>{fieldError}</li>
                    )}
                </ul>
                : ''
            }
        </div>
    );
};

ErrorContent.propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default ErrorContent;
