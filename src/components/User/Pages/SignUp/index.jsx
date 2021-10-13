import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Button,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

import { CheckSharp } from '@mui/icons-material';

import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import googleLogo from '../../../../assets/googleLogo.svg';

export default function SignUp() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  // Form requirements
  const schema = yup.object({
    firstName: yup.string().required('First name is required').min(2, 'Enter at least 2 characters'),
    lastName: yup.string().required('Last name is required').min(2, 'Enter at least 2 characters'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    role: yup.string().oneOf(['student', 'admin'], 'Role should be one of studet or admin').required('Role is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: 'student',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => console.dir(values),
  });
  // -----------------
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container maxWidth="xl" className="flex items-center justify-center py-20">
        <Paper component="form" onSubmit={formik.handleSubmit} className="w-full lg:w-11/12 p-2 md:px-12 lg:px-32 py-9 rounded-xl">
          <Grid container direction="column" className="gap-6">
            <Grid item>
              <Typography variant="body2" classes={{ root: 'font-extrabold text-2xl' }}>Sign Up</Typography>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 2, md: 6, lg: 12 }} className="mt-1">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>First Name *</Typography>
                <TextField
                  fullWidth
                  required
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  placeholder="First Name"
                  className="mt-2"
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                  style={{ fontFamily: 'montserrat' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>Last Name *</Typography>
                <TextField
                  fullWidth
                  required
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  placeholder="Last Name"
                  className="mt-2"
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                  style={{ fontFamily: 'montserrat' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>Email *</Typography>
                <TextField
                  fullWidth
                  required
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  placeholder="example@gmail.com"
                  className="mt-2"
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                  style={{ fontFamily: 'montserrat' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>Role *</Typography>
                <Select
                  fullWidth
                  required
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  placeholder="Role"
                  className="mt-2"
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                  style={{ fontFamily: 'montserrat' }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
                <Typography variant="caption" className={`${(formik.touched.role && formik.errors.role) ? 'block' : 'hidden'} text-red-500 px-3`}>
                  {formik.errors.role}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>Password *</Typography>
                <TextField
                  fullWidth
                  required
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  type="password"
                  placeholder="*************"
                  className="mt-2"
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                  style={{ fontFamily: 'montserrat' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>Confirm Password *</Typography>
                <TextField
                  fullWidth
                  required
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  type="password"
                  placeholder="*************"
                  className="mt-2"
                  InputProps={{
                    className: 'bg-gray-50',
                  }}
                  style={{ fontFamily: 'montserrat' }}
                />
              </Grid>
            </Grid>
            <Grid item className={`${!formik.isValid ? 'block' : 'hidden'} mt-3`}>
              <p className="font-semibold text-sm text-red-700" style={{ fontFamily: 'montserrat' }}>There are some errors in form. Please try again.</p>
            </Grid>
            <Grid item className="flex justify-between items-center">
              <div className="flex-grow flex gap-3 items-center">
                <div className={`border rounded w-6 h-6 flex justify-center items-center ${checked ? 'bg-primary border-primary' : 'bg-transparent border-black'}`} aria-hidden onClick={() => setChecked(!checked)}>
                  <CheckSharp htmlColor="white" className="w-4" />
                </div>
                <Typography variant="h6" className="font-semibold text-sm" sx={{ fontFamily: 'montserrat' }}>Remember Me</Typography>
              </div>
              <p className="font-semibold text-gray-400 text-sm" style={{ fontFamily: 'montserrat' }}>Forget Password</p>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" className="py-4 text-xl" fullWidth>Sign Up</Button>
            </Grid>
            <Grid item className="mt-5">
              <Typography className="font-bold text-sm" align="center" style={{ fontFamily: 'montserrat' }}>or continue with</Typography>
            </Grid>
            <Grid item className="my-3 flex flex-col items-center">
              <Button
                variant="contained"
                className="bg-white hover:bg-white rounded-xl py-3"
                startIcon={
                  <img src={googleLogo} alt="google" />
                }
              >
                <Typography variant="body2" className="font-semibold text-lg md:text-2xl text-gray-400">Sign Up with Google</Typography>
              </Button>
            </Grid>
            <Grid item className="mt-3 flex justify-center">
              <p className="font-bold text-sm lg:text-sm" style={{ fontFamily: 'montserrat' }}>
                Already have an account?
                <span className="text-primary mx-1 cursor-pointer" aria-hidden onClick={() => history.push('/login')}>Click here</span>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
