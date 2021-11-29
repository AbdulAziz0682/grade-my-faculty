import React from 'react';

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

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import { ADMINS, NEW_ADMIN } from '../../graphqlQueries';

export default function AddAdmin() {
  const dispatch = useDispatch();
  const [newAdmin, { loading }] = useMutation(
    NEW_ADMIN,
    { refetchQueries: [{ query: ADMINS }] },
  );
  // Form requirements
  const schema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Enter at least 2 characters'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => newAdmin({ variables: values })
      .then(() => dispatch(addToast({ message: 'Admin added successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  return (
    <div className="flex flex-col w-full">
      <Grid container rowSpacing={5} columnSpacing={15}>
        <Grid item xs={12}>
          <Typography className="text-4xl font-medium text-gray-500 pb-9">Add Admin</Typography>
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
              required
              label="Confirm Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <Button type="submit" variant="contained" disabled={loading} style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">
              {
                loading
                  ? <CircularProgress />
                  : 'Add'
              }
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
