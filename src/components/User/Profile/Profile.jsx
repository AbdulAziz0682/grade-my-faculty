/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Edit } from '@mui/icons-material/';

import { Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { addToast } from '../../../redux/toastsActions';
import { login } from '../../../redux/accountActions';

import { UPDATE_USER } from '../../../graphqlQueries';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const [updateUser, { loading }] = useMutation(UPDATE_USER);
  const [isEditing, setEditing] = React.useState(false);
  // Form requirements
  const schema = yup.object({
    firstName: yup.string().required('First name is required').min(2, 'Enter at least 2 characters'),
    lastName: yup.string().required('Last name is required').min(2, 'Enter at least 2 characters'),
    institute: yup.string().min(2, 'Enter at least 2 characters'),
    graduationYear: yup.number().min((new Date()).getFullYear(), 'Enter valid value'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      institute: user?.institute || '',
      graduationYear: user?.graduationYear || (new Date()).getFullYear(),
    },
    validationSchema: schema,
    onSubmit: (values) => {
      updateUser({ variables: values })
        .then((res) => {
          dispatch(addToast({ message: 'Profile updated successfully', severity: 'success' }));
          dispatch(login({ user: res.data.updateUser, role: 'user' }));
        })
        .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
    },
  });
  //-------------------------
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
            <Typography variant="h6" className="flex-grow">First Name:</Typography>
            <Typography variant="body1" className="w-6/12 md:w-8/12">{user.firstName}</Typography>
          </div>
          <div className="flex gap-3">
            <Typography variant="h6" className="flex-grow">Last Name:</Typography>
            <Typography variant="body1" className="w-6/12 md:w-8/12">{user.lastName}</Typography>
          </div>
          <div className="flex gap-3">
            <Typography variant="h6" className="flex-grow">University:</Typography>
            <Typography variant="body1" className="w-6/12 md:w-8/12">
              {user.institute}
            </Typography>
          </div>
          <div className="flex gap-3">
            <Typography variant="h6" className="flex-grow">Expected Graduation Year:</Typography>
            <Typography variant="body1" className="w-6/12 md:w-8/12">{user.graduationYear}</Typography>
          </div>
        </Stack>
      )
      : (
        <Stack spacing={2} className="my-3" component="form" onSubmit={formik.handleSubmit}>
          <div className="flex items-center gap-3">
            <Typography variant="h6" className="w-6/12 md:w-4/12">First Name:</Typography>
            <TextField
              required
              size="small"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              placeholder="First Name"
              className="w-6/12 md:w-6/12"
              InputProps={{
                className: 'bg-gray-50',
              }}
              style={{ fontFamily: 'montserrat' }}
            />
          </div>
          <div className="flex items-center gap-3">
            <Typography variant="h6" className="w-6/12 md:w-4/12">Last Name:</Typography>
            <TextField
              required
              size="small"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              placeholder="Last Name"
              className="w-6/12 md:w-6/12"
              InputProps={{
                className: 'bg-gray-50',
              }}
              style={{ fontFamily: 'montserrat' }}
            />
          </div>
          <div className="flex items-center gap-3">
            <Typography variant="h6" className="w-6/12 md:w-4/12">University:</Typography>
            <TextField
              required
              size="small"
              name="institute"
              value={formik.values.institute}
              onChange={formik.handleChange}
              error={formik.touched.institute && Boolean(formik.errors.institute)}
              helperText={formik.touched.institute && formik.errors.institute}
              placeholder="University"
              className="w-6/12 md:w-6/12"
              InputProps={{
                className: 'bg-gray-50',
              }}
              style={{ fontFamily: 'montserrat' }}
            />
          </div>
          <div className="flex items-center gap-3">
            <Typography variant="h6" className="w-6/12 md:w-4/12">Expected Graduation Year:</Typography>
            <TextField
              required
              type="number"
              size="small"
              name="graduationYear"
              value={formik.values.graduationYear}
              onChange={formik.handleChange}
              error={formik.touched.graduationYear && Boolean(formik.errors.graduationYear)}
              helperText={formik.touched.graduationYear && formik.errors.graduationYear}
              placeholder="Expected Graduation Year"
              className="w-6/12 md:w-6/12"
              InputProps={{
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
              {
                loading
                  ? <CircularProgress />
                  : 'Save Changes'
              }
            </Button>
          </div>
        </Stack>
      )
  );
}
