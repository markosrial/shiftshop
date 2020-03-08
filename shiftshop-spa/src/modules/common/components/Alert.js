import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {IconButton, Typography, Paper} from '@material-ui/core';
import {CheckCircle, Close, Error, Info, Warning} from '@material-ui/icons';

import useStyles from '../styles/Alert';

import ErrorContent from './ErrorContent';

const icons = {
  default: <Info/>,
  success: <CheckCircle/>,
  info: <Info/>,
  warning: <Warning/>,
  error: <Error/>
};

const Alert = ({icon, variant, message, backendError, onClose, className}) => {
  const classes = useStyles();

  return (
      <Paper className={classNames(classes.root, classes[variant], className)} elevation={1}>
        <span className={classes.icon}>{icon || icons[variant]}</span>
        <Typography className={classes.message} color="inherit" variant="subtitle2">
          {backendError
              ? <ErrorContent errors={message}/>
              : message}
        </Typography>
        {onClose && (
            <IconButton className={classes.action} color="inherit" size="small" key="close" onClick={onClose}>
              <Close/>
            </IconButton>
        )}
      </Paper>
  );
};

Alert.propTypes = {
  icon: PropTypes.node,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]).isRequired,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  backendError: PropTypes.bool
};

Alert.defaultProps = {
  variant: 'default'
};

export default Alert;
