/* eslint-disable no-underscore-dangle */
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

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

export default function AddEmailDialog({
  open,
  handleClose,
  handleUpdate,
  email,
}) {
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = React.useState({
    emailDomain: email.emailDomain,
    isAllowed: email.isAllowed,
  });
  function handleSubmit() {
    if (newEmail.emailDomain !== '') {
      handleUpdate({ ...newEmail, id: Number(email._id), status: email.status });
      handleClose();
    } else dispatch(addToast({ message: 'Email Domain is required', severity: 'error' }));
  }
  return (
    <Dialog open={open} components="div" onClose={handleClose} classes={{ paper: 'flex-grow max-w-full md:mx-16 px-4 md:px-8 py-14' }}>
      <DialogTitle className="text-3xl font-medium text-gray-500">Edit Email</DialogTitle>
      <DialogContent className="flex flex-col items-start gap-9">
        <span className="flex flex-col justify-between w-full gap-9 md:flex-row">
          <TextField
            variant="standard"
            label="Email Domain"
            value={newEmail.emailDomain}
            onChange={(e) => setNewEmail({ ...newEmail, emailDomain: e.target.value })}
            required
            className="md:w-3/6"
          />
          <Select
            variant="standard"
            label="Is Allowed"
            className="md:w-2/6"
            value={newEmail.isAllowed ? 'Allowed' : 'Not Allowed'}
            onChange={(e) => setNewEmail({ ...newEmail, isAllowed: e.target.value === 'Allowed' })}
            required
          >
            <MenuItem value="Allowed">Allowed</MenuItem>
            <MenuItem value="Not Allowed">Not Allowed</MenuItem>
          </Select>
        </span>
      </DialogContent>
      <DialogActions className="flex justify-between w-full gap-9">
        <Button
          variant="contained"
          style={{ maxHeight: '38px' }}
          className="md:w-1/3 lg:w-1/6 shadow-primaryGlow"
          onClick={() => handleSubmit()}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddEmailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  email: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    emailDomain: PropTypes.string.isRequired,
    isAllowed: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
