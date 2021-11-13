import React from 'react';

import {
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Edit } from '@mui/icons-material/';

import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Profile() {
  const [isEditing, setEditing] = React.useState(true);
  // Form requirements
  const schema = yup.object({
    firstName: yup.string().required('First name is required').min(2, 'Enter at least 2 characters'),
    lastName: yup.string().required('Last name is required').min(2, 'Enter at least 2 characters'),
    institute: yup.string().required('Email is required').min(5, 'Enter at least 5 characters'),
    graduationYear: yup.number().required('Graduation Year is required').min((new Date()).getFullYear(), 'Enter valid value'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      institute: '',
      graduationYear: new Date().getFullYear(),
    },
    validationSchema: schema,
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
            <Typography variant="h6" className="flex-grow">First Name:</Typography>
            <Typography variant="body1" className="w-6/12 md:w-8/12">First</Typography>
          </div>
          <div className="flex gap-3">
            <Typography variant="h6" className="flex-grow">Last Name:</Typography>
            <Typography variant="body1" className="w-6/12 md:w-8/12">Last</Typography>
          </div>
          <div className="flex gap-3">
            <Typography variant="h6" className="flex-grow">University:</Typography>
            <Typography variant="body1" className="w-6/12 md:w-8/12">North South University</Typography>
          </div>
          <div className="flex gap-3">
            <Typography variant="h6" className="flex-grow">Expected Graduation Year:</Typography>
            <Typography variant="body1" className="w-6/12 md:w-8/12">2022</Typography>
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
            >
              Save Changes
            </Button>
          </div>
        </Stack>
      )
  );
}
