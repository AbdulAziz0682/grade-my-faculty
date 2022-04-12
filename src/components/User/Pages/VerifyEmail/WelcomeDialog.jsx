import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  Typography,
  DialogTitle,
  IconButton,
} from '@mui/material';

import {
  Close,
} from '@mui/icons-material';

export default function WelcomeDialog({
  open, handleClose,
}) {
  return (
    <Dialog classes={{ paper: 'w-full pb-9' }} open={open} onClose={() => handleClose()}>
      <DialogTitle className="flex justify-end">
        <IconButton onClick={() => handleClose()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="flex flex-col w-full gap-3">
        <Typography variant="h2" color="primary" align="center" className="w-full">Welcome to Grade My Faculty!</Typography>
        <Typography align="center" className="flex flex-wrap items-center justify-center w-full text-sm">
          You are good to go.
          <Link push to="/login">
            <Typography variant="h6" className="mx-2">Login</Typography>
          </Link>
          to grade your faculty.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

WelcomeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
