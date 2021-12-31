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

import { UPDATE_USER_EMAIL, UPDATE_USER_PASSWORD, DELETE_USER } from '../../../graphqlQueries';

export default function AccountSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const [isEditing, setEditing] = React.useState(false);
  const [updateUserEmail, emailMutation] = useMutation(UPDATE_USER_EMAIL);
  const [updateUserPassword, passwordMutation] = useMutation(UPDATE_USER_PASSWORD);
  const [deleteUser, deleteQuery] = useMutation(DELETE_USER);
  // Email Form requirements
  const emailFormSchema = yup.object({
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup.string().required('Password is required').min(8, 'Enter at least 8 characters'),
  });
  const emailFormik = useFormik({
    initialValues: {
      email: user?.email,
      password: '',
    },
    validationSchema: emailFormSchema,
    onSubmit: (values) => {
      const vars = {
        id: Number(user._id),
        ...values,
      };
      return updateUserEmail({
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
  const passwordFormSchema = yup.object({
    oldPassword: yup.string().required('Password is required').min(8, 'Enter at least 8 characters'),
    newPassword: yup.string().required('Password is required').min(8, 'Enter at least 8 characters'),
  });
  const passwordFormik = useFormik({
    initialValues: {
      oldpassword: '',
      newPassword: '',
    },
    validationSchema: passwordFormSchema,
    onSubmit: (values) => {
      const vars = {
        id: Number(user._id),
        ...values,
      };
      return updateUserPassword({
        variables: vars,
      })
        .then(() => {
          dispatch(addToast({ message: 'Password changed successfully', severity: 'success' }));
          setEditing(false);
        })
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
          <Stack spacing={2} className="my-3" component="form" onSubmit={emailFormik.handleSubmit}>
            <Typography variant="h3">Update Email</Typography>
            <div className="flex items-center gap-3">
              <Typography variant="h6" className="w-5/12 md:w-4/12">Email:</Typography>
              <TextField
                required
                size="small"
                name="email"
                value={emailFormik.values.email}
                onChange={emailFormik.handleChange}
                error={emailFormik.touched.email && Boolean(emailFormik.errors.email)}
                helperText={emailFormik.touched.email && emailFormik.errors.email}
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
                value={emailFormik.values.password}
                onChange={emailFormik.handleChange}
                error={emailFormik.touched.password && Boolean(emailFormik.errors.password)}
                helperText={emailFormik.touched.password && emailFormik.errors.password}
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
                disabled={emailMutation.loading}
              >
                {
                  emailMutation.loading
                    ? <CircularProgress />
                    : 'Update Email'
                }
              </Button>
            </div>
          </Stack>
          <Stack spacing={2} className="my-3" component="form" onSubmit={passwordFormik.handleSubmit}>
            <Typography variant="h3">Update Password</Typography>
            <div className="flex items-center gap-3">
              <Typography variant="h6" className="w-5/12 md:w-4/12">Old Password:</Typography>
              <TextField
                required
                size="small"
                name="oldPassword"
                value={passwordFormik.values.oldPassword}
                onChange={passwordFormik.handleChange}
                error={
                  passwordFormik.touched.oldPassword && Boolean(passwordFormik.errors.oldPassword)
                }
                helperText={passwordFormik.touched.oldPassword && passwordFormik.errors.oldPassword}
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
                value={passwordFormik.values.newPassword}
                onChange={passwordFormik.handleChange}
                error={
                  passwordFormik.touched.newPassword && Boolean(passwordFormik.errors.newPassword)
                }
                helperText={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
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
                disabled={passwordMutation.loading}
              >
                {
                  passwordMutation.loading
                    ? <CircularProgress />
                    : 'Update Password'
                }
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
