import React from 'react';

import {
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Edit, Delete } from '@mui/icons-material/';

import { useFormik } from 'formik';
import * as yup from 'yup';

export default function AccountSettings() {
  const [isEditing, setEditing] = React.useState(false);
  // Email Form requirements
  const schema = yup.object({
    email: yup.string().required('Email is required').email('Enter a valid email'),
    password: yup.string().required('Password is required').min(8, 'Enter at least 8 characters'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => console.dir(values),
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
    onSubmit: (values) => console.dir(values),
  });
  //-------------------------
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
            <Typography variant="body1" className="w-8/12 md:w-9/12">user@email.com</Typography>
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
              >
                Update Password
              </Button>
            </div>
          </Stack>
          <div className="flex items-center gap-9">
            <Typography variant="h3">Delete Account</Typography>
            <Button variant="contained" color="error" startIcon={<Delete />}>Delete</Button>
          </div>
        </Stack>
      )
  );
}
