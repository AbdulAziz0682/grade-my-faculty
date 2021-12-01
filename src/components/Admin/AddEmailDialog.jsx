/* eslint-disable consistent-return */
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
  CircularProgress,
} from '@mui/material';

import { useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import {
  ALLOWED_EMAILS,
  NEW_ALLOWED_EMAIL,
} from '../../graphqlQueries';

export default function AddAdDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = React.useState({
    emailDomain: '',
    isAllowed: true,
  });
  const [newAllowedEmail, { loading }] = useMutation(
    NEW_ALLOWED_EMAIL,
    { refetchQueries: [{ query: ALLOWED_EMAILS }] },
  );
  function handleSubmit() {
    if (newEmail.emailDomain !== '') {
      newAllowedEmail({ variables: newEmail })
        .then(() => dispatch(addToast({ message: 'Email added successfully', severity: 'success' })))
        .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
    } else return dispatch(addToast({ message: 'Email Domain is required', severity: 'error' }));
    handleClose();
  }
  return (
    <Dialog open={open} components="div" onClose={handleClose} classes={{ paper: 'flex-grow max-w-full md:mx-16 px-4 md:px-8 py-14' }}>
      <DialogTitle className="text-3xl font-medium text-gray-500">Add Email</DialogTitle>
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
        <Button variant="contained" disabled={loading} onClick={() => handleSubmit()} style={{ maxHeight: '38px' }} className="md:w-1/3 lg:w-1/6 shadow-primaryGlow">
          {
            loading
              ? <CircularProgress />
              : 'Add'
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddAdDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
