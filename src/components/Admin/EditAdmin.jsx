/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { addToast } from '../../redux/toastsActions';
import { login, logout } from '../../redux/accountActions';

import { ADMINS, UPDATE_ADMIN } from '../../graphqlQueries';
import { setCurrentTab } from '../../redux/adminActions';

export default function EditAdmin({ admin }) {
  const dispatch = useDispatch();
  const currentAdmin = useSelector((state) => state.account.admin);
  const [updateAdmin, { loading }] = useMutation(
    UPDATE_ADMIN,
    { refetchQueries: [{ query: ADMINS }] },
  );
  // Form requirements
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const schema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Enter at least 2 characters'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
    newPassword: yup.string().min(8, 'Password should be at least 8 characters long'),
    facebookLink: yup.string().matches(urlRegex, 'Not a valid link'),
    instagramLink: yup.string().matches(urlRegex, 'Not a valid link'),
    twitterLink: yup.string().matches(urlRegex, 'Not a valid link'),
  });
  const formik = useFormik({
    initialValues: {
      ...admin,
      password: '',
      newPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => updateAdmin(
      { variables: { ...values, id: Number(admin._id), status: admin.status } },
    )
      .then((r) => {
        if (Number(currentAdmin._id) === Number(r.data.updateAdmin._id)) {
          if (currentAdmin.email !== r.data.updateAdmin.email) {
            dispatch(addToast({ message: 'Email changed, please login again', severity: 'warning' }));
            dispatch(logout());
          } else {
            dispatch(addToast({ message: 'Admin updated successfully', severity: 'success' }));
            dispatch(login({ admin: r.data.updateAdmin, role: 'admin' }));
          }
        }
        dispatch(addToast({ message: 'Admin updated successfully', severity: 'success' }));
        dispatch(setCurrentTab({ name: 'admins', data: null }));
      })
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  return (
    <div className="flex flex-col w-full">
      <Grid container rowSpacing={5} columnSpacing={15}>
        <Grid item xs={12}>
          <Typography className="text-4xl font-medium text-gray-500 pb-9">Update Admin Details</Typography>
          <Card className="flex flex-col w-full gap-12 p-14" elevation={6} component="form" onSubmit={formik.handleSubmit}>
            <TextField
              variant="standard"
              fullWidth
              required
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              variant="standard"
              fullWidth
              required
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="standard"
              type="password"
              fullWidth
              required
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              variant="standard"
              type="password"
              fullWidth
              label="New Password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Facebook Link"
              name="facebookLink"
              value={formik.values.facebookLink}
              onChange={formik.handleChange}
              error={formik.touched.facebookLink && Boolean(formik.errors.facebookLink)}
              helperText={formik.touched.facebookLink && formik.errors.facebookLink}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Instagram Link"
              name="instagramLink"
              value={formik.values.instagramLink}
              onChange={formik.handleChange}
              error={formik.touched.instagramLink && Boolean(formik.errors.instagramLink)}
              helperText={formik.touched.instagramLink && formik.errors.instagramLink}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Twitter Link"
              name="twitterLink"
              value={formik.values.twitterLink}
              onChange={formik.handleChange}
              error={formik.touched.twitterLink && Boolean(formik.errors.twitterLink)}
              helperText={formik.touched.twitterLink && formik.errors.twitterLink}
            />
            <Button type="submit" variant="contained" disabled={loading} style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">
              {
                loading
                  ? <CircularProgress />
                  : 'Update'
              }
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

EditAdmin.propTypes = {
  admin: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    facebookLink: PropTypes.string.isRequired,
    instagramLink: PropTypes.string.isRequired,
    twitterLink: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
