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

export default function AddFaqDialog({ open, handleClose }) {
  return (
    <Dialog open={open} components="div" onClose={handleClose} classes={{ paper: 'flex-grow max-w-full md:mx-16 px-4 md:px-8 py-14' }}>
      <DialogTitle className="text-3xl font-medium text-gray-500">Add Faq</DialogTitle>
      <DialogContent className="flex flex-col items-start gap-9">
        <span className="flex flex-col justify-between w-full gap-9 md:flex-row">
          <TextField
            variant="standard"
            label="Faq Title"
            className="md:w-3/6"
          />
          <Select
            variant="standard"
            label="Category"
            className="md:w-2/6"
            value="student"
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
          </Select>
        </span>
        <TextField
          fullWidth
          label="Answer of Faq"
          variant="standard"
        />
      </DialogContent>
      <DialogActions className="flex justify-between w-full gap-9">
        <Button variant="contained" style={{ maxHeight: '38px' }} className="md:w-1/3 lg:w-1/6">Add</Button>
      </DialogActions>
    </Dialog>
  );
}

AddFaqDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
