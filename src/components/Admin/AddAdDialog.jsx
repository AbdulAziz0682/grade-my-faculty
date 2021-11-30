import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import { NEW_AD } from '../../graphqlQueries';

export default function AddAdDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [newAd, { loading }] = useMutation(
    NEW_AD,
  );
  // Form requirements
  const schema = yup.object({
    title: yup.string().required('Title is required').min(2, 'Enter at least 2 characters'),
    locationId: yup.string().required('Location ID is required').min(2, 'Enter at least 2 characters'),
    code: yup.string().required('Code is required').min(2, 'Enter at least 2 characters'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      locationId: '',
      code: '',
    },
    validationSchema: schema,
    onSubmit: (values) => newAd({ variables: values })
      .then(() => dispatch(addToast({ message: 'Ad added successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  return (
    <Dialog open={open} components="div" onClose={handleClose} classes={{ paper: 'flex-grow max-w-full md:mx-16 px-4 md:px-8 py-14' }}>
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <DialogTitle className="text-3xl font-medium text-gray-500">Ad Details</DialogTitle>
        <DialogContent className="flex flex-col items-start gap-9">
          <span className="flex flex-col justify-between w-full gap-9 md:flex-row">
            <TextField
              variant="standard"
              label="Ad Title"
              className="md:w-3/6"
              required
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              variant="standard"
              label="Location ID"
              className="md:w-3/6"
              required
              name="locationId"
              value={formik.values.locationId}
              onChange={formik.handleChange}
              error={formik.touched.locationId && Boolean(formik.errors.locationId)}
              helperText={formik.touched.locationId && formik.errors.locationId}
            />
          </span>
          <TextField
            fullWidth
            variant="standard"
            label="Ad Code"
            required
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />
        </DialogContent>
        <DialogActions className="flex justify-between w-full gap-9">
          <Button type="submit" variant="contained" disabled={loading} style={{ maxHeight: '38px' }} className="md:w-1/3 lg:w-1/6 shadow-primaryGlow">
            {
              loading
                ? <CircularProgress />
                : 'Add'
            }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddAdDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
