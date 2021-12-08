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

import { useFormik } from 'formik';
import * as yup from 'yup';

export default function EditAdDialog({
  open,
  handleClose,
  ad,
  handleUpdate,
}) {
  // Form requirements
  const schema = yup.object({
    title: yup.string().required('Title is required').min(2, 'Enter at least 2 characters'),
    locationId: yup.string().required('Location ID is required').min(2, 'Enter at least 2 characters'),
    code: yup.string().required('Code is required').min(2, 'Enter at least 2 characters'),
  });
  const formik = useFormik({
    initialValues: {
      title: ad.title,
      locationId: ad.locationId,
      code: ad.code,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleClose();
      handleUpdate({ ...values, id: Number(ad._id), status: ad.status });
    },
  });
  return (
    <Dialog open={open} components="div" onClose={handleClose} classes={{ paper: 'flex-grow max-w-full md:mx-16 px-4 md:px-8 py-14' }}>
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <DialogTitle className="text-3xl font-medium text-gray-500">Edit Ad</DialogTitle>
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
            <Select
              variant="standard"
              label="Location ID"
              placeholder="Location ID"
              className="md:w-3/6"
              name="locationId"
              value={formik.values.locationId}
              onChange={formik.handleChange}
              error={formik.touched.locationId && Boolean(formik.errors.locationId)}
            >
              <MenuItem value="" disabled>Select Location</MenuItem>
              <MenuItem value="/blog">Blog Page</MenuItem>
              <MenuItem value="/post">Post Page</MenuItem>
            </Select>
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
          <Button type="submit" variant="contained" style={{ maxHeight: '38px' }} className="md:w-1/3 lg:w-1/6 shadow-primaryGlow">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

EditAdDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  ad: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    locationId: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
