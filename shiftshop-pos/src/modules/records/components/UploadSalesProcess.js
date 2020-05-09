import React, {useEffect, useState} from 'react';
import {Badge, Box, Button, LinearProgress} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useSelector} from 'react-redux';

const upload = (pendingSales, setCounter, onSuccess, onError, onFinish) => {

    let sales = [...pendingSales];

    const run = async () => {

        let next;
        let count = 0;
        let successUploads = 0;
        let errors = [];

        while ((next = nextSale()) !== undefined) {

            const {barcode, date, discount, cash, sellerId, items} = next;

            const sale = {barcode, date, discount, cash, sellerId,
                items: items.map(item => {
                    const {id, salePrice, quantity} = item;
                    return ({productId: id, salePrice, quantity});
                })
            };

            await actions.registerSale(sale,
                () => {
                    setCounter(++count);
                    successUploads++;
                    onSuccess(next._id);
                },
                error => {
                    setCounter(++count);
                    errors = [...errors, ({barcode: next.barcode, content: error})];
                    onError(errors.length);
                }
            )
        }

        // Low delay before go into next step
        await new Promise(r => setTimeout(r, 500));

        onFinish(successUploads, errors);

    }

    const nextSale = () => sales.pop();
    const stop = () => sales.length = 0;

    return {run, stop};

}

const UploadSalesProcess = ({pendingSales, onFinish}) => {

    const salesDB = useSelector(selectors.getSalesDB);

    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState(0);
    const [uploading, setUploading] = useState(true);
    const [skipUpload, setSkipUpload] = useState(null);

    useEffect(() => {

        if (!pendingSales || pendingSales.length === 0) {
            onFinish(0, []);
            return;
        }

        const {run, stop} = upload(pendingSales, setCounter, onUpload, addUploadError, finishUpload);

        setSkipUpload(() => () => {
            setUploading(false);
            stop();
        });

        run();

    }, []);

    const addUploadError = errors => setErrors(errors);

    const onUpload = id => salesDB.update(id, {uploaded: true});

    const finishUpload = (count, errors) => {
        setUploading(false);
        onFinish(count, errors);
    }

    const normalise = value => value * 100 / pendingSales.length;

    if (!pendingSales || pendingSales.length === 0) {
        return null;
    }

    return (
        <Box w={1}>
            <Box w={1} display="flex" justifyContent="flex-end">
                {counter}/{pendingSales.length}
                &nbsp;
                {errors > 0 &&
                    <Box ml={1}>
                        <Badge variant="standard" color="error" badgeContent={errors} max={9}>&nbsp;</Badge>
                    </Box>}
            </Box>
            <LinearProgress variant="determinate" value={normalise(counter)}/>
            {skipUpload &&
                <Box mt={1}>
                    <Button variant="contained" size="small" color="secondary" disableElevation
                            onClick={() => skipUpload()} disabled={!uploading}>
                        <FormattedMessage id="project.global.button.skip"/>
                    </Button>
                </Box>}
        </Box>
    );

}

export default UploadSalesProcess;
