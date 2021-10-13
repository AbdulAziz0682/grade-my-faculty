import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

export default function EditAdDialog({ open, handleClose, ad }) {
  return (
    <Dialog open={open} components="div" onClose={handleClose} classes={{ paper: 'flex-grow max-w-full md:mx-16 px-4 md:px-8 py-14' }}>
      <DialogTitle className="text-3xl font-medium text-gray-500">Ad Details</DialogTitle>
      <DialogContent className="flex flex-col items-start gap-9">
        <span className="flex flex-col justify-between w-full gap-9 md:flex-row">
          <TextField
            variant="standard"
            label="Ad Title"
            value={ad.title}
            className="md:w-3/6"
          />
          <TextField
            variant="standard"
            label="Location ID"
            value={ad.locationID}
            className="md:w-2/6"
          />
        </span>
        <TextField
          fullWidth
          label="Ad Code"
          value={ad.code}
          variant="standard"
        />
      </DialogContent>
      <DialogActions className="flex justify-between w-full gap-9">
        <Button variant="contained" className="md:w-1/3 lg:w-1/6">Update</Button>
      </DialogActions>
    </Dialog>
  );
}

EditAdDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  ad: PropTypes.shape({
    title: PropTypes.string.isRequired,
    locationID: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};
