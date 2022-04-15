import React from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  AlertTitle,
  Snackbar,
  IconButton,
} from '@mui/material';

import { Close } from '@mui/icons-material';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Toast({
  open,
  onDismissClick,
  severity,
  message,
}) {
  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} className="bg-white" sx={{ minWidth: '25vw' }} autoHideDuration={5000} open={open} onClose={() => onDismissClick()}>
      <Alert
        elevation={4}
        variant="standard"
        className="items-center bg-transparent"
        severity={severity}
        sx={{ width: '100%' }}
        action={(
          <IconButton onClick={() => onDismissClick()}>
            <Close />
          </IconButton>
        )}
      >
        <AlertTitle className="font-bold">{capitalizeFirstLetter(severity)}</AlertTitle>
        { message }
      </Alert>
    </Snackbar>
  );
}

Toast.propTypes = {
  severity: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
