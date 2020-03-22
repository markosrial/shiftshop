import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, CircularProgress} from '@material-ui/core';
import {ToggleOffRounded, ToggleOnRounded} from '@material-ui/icons';

import * as actions from '../actions';
import users, {Role} from '../../users';
import {ErrorContent} from '../../common';
import {FormattedMessage} from 'react-intl';
import {useSnackbar} from 'notistack';

const ProductChangeState = ({id, active}) => {

    const dispatch = useDispatch();

    const user = useSelector(users.selectors.getUser);
    const hasRole = roles => users.selectors.hasRole(user, roles);

    const [updating, setUpdating] = useState(false);

    const _isMounted = useRef(true);
    useEffect(() => {
        return () => _isMounted.current = false
    }, []);

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const changeState = () => {

        if (updating) return;

        setUpdating(true);

        dispatch(
            actions.setProductActive(id, !active,
                errors => {
                    enqueueSnackbar(<ErrorContent errors={errors}/>,
                        {
                            variant: 'error',
                            persist: 'true',
                            action: key => (<Button color="inherit" variant="outlined" onClick={() => closeSnackbar(key)}>
                                <FormattedMessage id="project.global.button.close"/>
                            </Button>)
                        });
                },
                () => _isMounted.current && setUpdating(false)));
    };

    return (
        hasRole([Role.ADMIN]) &&
        <Button variant="outlined"
                color={active ? 'primary' : 'secondary'}
                onClick={changeState}
                disabled={updating}>
            {updating && <CircularProgress style={{position: 'absolute'}} size={24}/>}
            {active ? <ToggleOnRounded/> : <ToggleOffRounded/>}
        </Button>
    );
};

export default ProductChangeState;
