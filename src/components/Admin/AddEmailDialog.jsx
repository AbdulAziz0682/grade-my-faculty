import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

export default function AddAdDialog({ open, handleClose }) {
  return (
    <Dialog open={open} components="div" onClose={handleClose} classes={{ paper: 'flex-grow max-w-full md:mx-16 px-4 md:px-8 py-14' }}>
      <DialogTitle className="text-3xl font-medium text-gray-500">Add Email</DialogTitle>
      <DialogContent className="flex flex-col items-start gap-9">
        <span className="flex flex-col justify-between w-full gap-9 md:flex-row">
          <TextField
            variant="standard"
            label="Email Domain"
            className="md:w-3/6"
          />
          <Select
            variant="standard"
            label="Location ID"
            className="md:w-2/6"
            value="allowed"
          >
            <MenuItem value="allowed">Allowed</MenuItem>
            <MenuItem value="notAllowed">Not Allowed</MenuItem>
          </Select>
        </span>
      </DialogContent>
      <DialogActions className="flex justify-between w-full gap-9">
        <Button variant="contained" style={{ maxHeight: '38px' }} className="md:w-1/3 lg:w-1/6 shadow-primaryGlow">Add</Button>
      </DialogActions>
    </Dialog>
  );
}

AddAdDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
