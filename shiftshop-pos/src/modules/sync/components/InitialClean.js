import React, {Fragment, useEffect, useState} from 'react';
import {Box, Card, CardContent, CircularProgress, Typography} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

import {ProductsDB, UsersDB} from '../../../databases';

import {minDelayFunction} from '../../utils';
import * as actions from '../actions';
import {Alert} from '../../common';

const InitialClean = ({callOnSuccess}) => {

    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        actions.initLocalUpdateTimestamp(
            updateTimestamp => {

                const delay = minDelayFunction(1000);

                const finishClean = () => {
                    delay(() => {
                        setProcessing(false);
                        callOnSuccess();
                    });
                };

                if (updateTimestamp) {
                    finishClean();
                    return;
                }

                clearDBProcess(finishClean);

            }
        );

    }, []);

    const clearDBProcess = async (onSuccess) => {

        try {

            const userDB = UsersDB.instantiate();
            await userDB.destroy();

            const productsDB = ProductsDB.instantiate();
            await productsDB.destroy();

            // Clean succesfull
            onSuccess();

        } catch (e) {
            setProcessing(false);
            setError(e);
        }

    };

    if (error) {
        return (
            <Alert variant="error"
                   message={<Box>
                       <Box><FormattedMessage id="project.sync.InitialClean.cleanError"/></Box>
                       <Box>
                           <Typography variant="body2" color="inherit">
                               <FormattedMessage id={`project.bd.error.${error}`}/>
                           </Typography>
                       </Box>
                   </Box>}/>
        );
    }

    return (
        <Card>
            <CardContent>
                {processing &&
                    <Fragment>
                        <Box><FormattedMessage id="project.sync.InitialClean.message"/>...</Box>
                        <Box display="flex" justifyContent="center" pt={1}>
                            <CircularProgress size={24}/>
                        </Box>
                    </Fragment>}
            </CardContent>
        </Card>
    );
};

export default InitialClean;
