import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Button,
  TextField,
} from '@mui/material';

import { CheckSharp } from '@mui/icons-material';

import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import googleLogo from '../../../../assets/googleLogo.svg';

export default function Login() {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  // Form requirements
  const schema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => console.dir(values),
  });
  // -----------------
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container className="flex items-center justify-center py-3">
        <Paper
          component="form"
          className="sm:w-4/6 lg:w-3/6 p-2 md:px-12 py-10 rounded-xl"
          onSubmit={formik.handleSubmit}
        >
          <Grid container direction="column" className="gap-3">
            <Grid item>
              <Typography variant="body2" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Sign In</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>Email Address *</Typography>
              <TextField
                fullWidth
                required
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                placeholder="example@gmail.com"
                className="bg-gray-50 mt-2"
                style={{ fontFamily: 'montserrat' }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>Password *</Typography>
              <TextField
                fullWidth
                required
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                placeholder="********"
                className="bg-gray-50 mt-2"
                style={{ fontFamily: 'montserrat' }}
              />
            </Grid>
            <Grid item className={`${!formik.isValid ? 'block' : 'hidden'} mt-3`}>
              <p className="font-semibold text-sm text-red-700" style={{ fontFamily: 'montserrat' }}>There are some errors in form. Please try again.</p>
            </Grid>
            <Grid item className="flex gap-3 my-3 justify-between items-center">
              <div className="flex-grow flex gap-3 items-center">
                <div className={`border rounded w-6 h-6 flex justify-center items-center ${checked ? 'bg-primary border-primary' : 'bg-transparent border-black'}`} aria-hidden onClick={() => setChecked(!checked)}>
                  <CheckSharp htmlColor="white" className="w-4" />
                </div>
                <Typography variant="h6" className="font-semibold text-sm" sx={{ fontFamily: 'montserrat' }}>Remember Me</Typography>
              </div>
              <p className="font-semibold text-gray-400 text-sm" style={{ fontFamily: 'montserrat' }}>Forget Password</p>
            </Grid>
            <Grid item className="my-5">
              <Button variant="contained" type="submit" className="py-4 text-xl" fullWidth>Sign In</Button>
            </Grid>
            <Grid item className="my-5">
              <Typography className="font-semibold text-sm" align="center" style={{ fontFamily: 'montserrat' }}>or continue with</Typography>
            </Grid>
            <Grid item className="mt-5 flex flex-col items-center">
              <Button
                variant="contained"
                className="bg-white hover:bg-white rounded-xl py-3"
                startIcon={
                  <img src={googleLogo} alt="google" />
                }
              >
                <Typography variant="body2" className="font-semibold text-xl md:text-2xl text-gray-400">Sign In with Google</Typography>
              </Button>
            </Grid>
            <Grid item className="mt-9 flex justify-center">
              <p className="font-semibold text-sm" style={{ fontFamily: 'montserrat' }}>
                Don&apos;t have an account?
                <span className="text-primary mx-1.5 cursor-pointer" aria-hidden onClick={() => history.push('/signUp')}>Click here</span>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
