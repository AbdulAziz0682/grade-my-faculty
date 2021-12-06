/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Edit, Delete } from '@mui/icons-material/';

import { useMutation } from '@apollo/client';

import { useSelector, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { addToast } from '../../../redux/toastsActions';
import { logout } from '../../../redux/accountActions';

import { UPDATE_USER, DELETE_USER } from '../../../graphqlQueries';

export default function AccountSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const [isEditing, setEditing] = React.useState(false);
  const [updateUser, { loading }] = useMutation(UPDATE_USER);
  const [deleteUser, deleteQuery] = useMutation(DELETE_USER);
  // Email Form requirements
  const schema = yup.object({
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup.string().required('Password is required').min(8, 'Enter at least 8 characters'),
  });
  const formik = useFormik({
    initialValues: {
      email: user?.email,
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (values.password !== user.password) return dispatch(addToast({ message: 'Incorrect password, please try again', severity: 'error' }));
      const vars = {
        ...user,
        id: Number(user._id),
        institute: Number(user.institute),
        ...values,
        confirmPassword: user.password,
      };
      return updateUser({
        variables: vars,
      })
        .then(() => {
          dispatch(addToast({ message: 'Email changed, please login again', severity: 'warning' }));
          dispatch(logout());
        })
        .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
    },
  });
  //-------------------------
  // Password Form requirements
  const schema1 = yup.object({
    password: yup.string().required('Password is required').min(8, 'Enter at least 8 characters'),
    newPassword: yup.string().required('Password is required').min(8, 'Enter at least 8 characters'),
  });
  const formik1 = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validationSchema: schema1,
    onSubmit: (values) => {
      if (values.password !== user.password) return dispatch(addToast({ message: 'Incorrect password, please try again', severity: 'error' }));
      const vars = {
        ...user,
        id: Number(user._id),
        institute: Number(user.institute),
        password: values.newPassword,
        confirmPassword: values.newPassword,
      };
      return updateUser({
        variables: vars,
      })
        .then(() => dispatch(addToast({ message: 'Password changed successfully', severity: 'success' })))
        .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
    },
  });
  //-------------------------
  function handleDelete(id) {
    deleteUser({ variables: { id: Number(id) } })
      .then(() => {
        dispatch(addToast({ message: 'Account deleted successfully', severity: 'success' }));
        dispatch(logout());
      })
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
  }
  if (!user) return <Redirect push to="/login" />;
  return (
    !isEditing
      ? (
        <Stack spacing={2} className="my-3">
          <div className="self-end">
            <Button
              variant="contained"
              onClick={() => setEditing(true)}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </div>
          <div className="flex gap-3">
            <Typography variant="h6" className="flex-grow">Email:</Typography>
            <Typography variant="body1" className="w-8/12 md:w-9/12">{user.email}</Typography>
          </div>
          <div className="flex gap-3">
            <Typography variant="h6" className="flex-grow">Password:</Typography>
            <Typography variant="body1" className="w-8/12 md:w-9/12">********</Typography>
          </div>
        </Stack>
      )
      : (
        <Stack spacing={3}>
          <Stack spacing={2} className="my-3" component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="h3">Update Email</Typography>
            <div className="flex items-center gap-3">
              <Typography variant="h6" className="w-5/12 md:w-4/12">Email:</Typography>
              <TextField
                required
                size="small"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                placeholder="Email"
                className="w-7/12 md:w-6/12"
                InputProps={{
                  className: 'bg-gray-50',
                }}
                style={{ fontFamily: 'montserrat' }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Typography variant="h6" className="w-5/12 md:w-4/12">Password:</Typography>
              <TextField
                required
                size="small"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                placeholder="Password"
                className="w-7/12 md:w-6/12"
                InputProps={{
                  type: 'password',
                  className: 'bg-gray-50',
                }}
                style={{ fontFamily: 'montserrat' }}
              />
            </div>
            <div className="flex self-end gap-6">
              <Button variant="text" onClick={() => setEditing(false)}>Cancel</Button>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Update Email
              </Button>
            </div>
          </Stack>
          <Stack spacing={2} className="my-3" component="form" onSubmit={formik1.handleSubmit}>
            <Typography variant="h3">Update Password</Typography>
            <div className="flex items-center gap-3">
              <Typography variant="h6" className="w-5/12 md:w-4/12">Old Password:</Typography>
              <TextField
                required
                size="small"
                name="password"
                value={formik1.values.password}
                onChange={formik1.handleChange}
                error={formik1.touched.password && Boolean(formik1.errors.password)}
                helperText={formik1.touched.password && formik1.errors.password}
                placeholder="Password"
                className="w-7/12 md:w-6/12"
                InputProps={{
                  type: 'password',
                  className: 'bg-gray-50',
                }}
                style={{ fontFamily: 'montserrat' }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Typography variant="h6" className="w-5/12 md:w-4/12">New Password:</Typography>
              <TextField
                required
                size="small"
                name="newPassword"
                value={formik1.values.newPassword}
                onChange={formik1.handleChange}
                error={formik1.touched.newPassword && Boolean(formik1.errors.newPassword)}
                helperText={formik1.touched.newPassword && formik1.errors.newPassword}
                placeholder="New Password"
                className="w-7/12 md:w-6/12"
                InputProps={{
                  type: 'password',
                  className: 'bg-gray-50',
                }}
                style={{ fontFamily: 'montserrat' }}
              />
            </div>
            <div className="flex self-end gap-6">
              <Button variant="text" onClick={() => setEditing(false)}>Cancel</Button>
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Update Password
              </Button>
            </div>
          </Stack>
          <div className="flex items-center gap-9">
            <Typography variant="h3">Delete Account</Typography>
            <Button variant="contained" disabled={deleteQuery.loading} color="error" startIcon={<Delete />} onClick={() => handleDelete(user._id)}>
              {
                deleteQuery.loading
                  ? <CircularProgress />
                  : 'Delete'
              }
            </Button>
          </div>
        </Stack>
      )
  );
}
