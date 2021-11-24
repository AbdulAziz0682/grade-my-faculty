import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';

import { CheckSharp } from '@mui/icons-material';

import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { gql, useMutation } from '@apollo/client';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../../redux/accountActions';

import googleLogo from '../../../../assets/googleLogo.svg';

const LOGIN_USER = gql`
  mutation LoginUser($email:String! $password:String!) {
    loginUser(email:$email password:$password) {
      user {
        firstName
        lastName
        email
        ratings
        registeredAt
      }
      token
    }
  }
`;

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const [checked, setChecked] = useState(false);
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
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
    onSubmit: (values) => loginUser({ variables: values })
      .then((res) => {
        localStorage.setItem('token', res.data.loginUser.token);
        sessionStorage.setItem('token', res.data.loginUser.token);
        dispatch(login({ user: res.data.loginUser.user, role: 'user' }));
      })
      .catch((res) => console.log(res)),
  });
  // -----------------
  if (user) history.push('/');
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-12">
        <Paper
          component="form"
          className="w-full p-8 py-10 md:w-7/12 lg:w-5/12 md:px-12 rounded-xl"
          onSubmit={formik.handleSubmit}
        >
          <Grid container direction="column" className="gap-3">
            <Grid item>
              <Typography variant="body2" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Sign In</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className="text-sm font-semibold" style={{ fontFamily: 'montserrat' }}>Email Address *</Typography>
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
            <Grid item>
              <Typography variant="h6" className="text-sm font-semibold" style={{ fontFamily: 'montserrat' }}>Password *</Typography>
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
                className="mt-2"
                InputProps={{
                  className: 'bg-gray-50',
                }}
                style={{ fontFamily: 'montserrat' }}
              />
            </Grid>
            <Grid item className={`${error ? 'block' : 'hidden'} mt-3`}>
              <p className="text-sm font-semibold text-red-700" style={{ fontFamily: 'montserrat' }}>{ error?.message }</p>
            </Grid>
            <Grid item className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center flex-grow gap-3">
                <div className={`border rounded w-6 h-6 flex justify-center items-center ${checked ? 'bg-primary border-primary' : 'bg-transparent border-black'}`} aria-hidden onClick={() => setChecked(!checked)}>
                  <CheckSharp htmlColor="white" className="w-4" />
                </div>
                <Typography variant="h6" className="text-sm font-semibold" sx={{ fontFamily: 'montserrat' }}>Remember Me</Typography>
              </div>
              <p className="text-sm font-semibold text-gray-400 cursor-pointer" aria-hidden onClick={() => history.push('/forgotPassword')} style={{ fontFamily: 'montserrat' }}>Forget Password</p>
            </Grid>
            <Grid item className="my-5">
              <Button variant="contained" disabled={loading} type="submit" className="py-4 text-xl" fullWidth>
                {
                  loading
                    ? <CircularProgress />
                    : 'Sign In'
                }
              </Button>
            </Grid>
            <Grid item className="md:my-1">
              <Typography className="text-sm font-semibold" align="center" style={{ fontFamily: 'montserrat' }}>or continue with</Typography>
            </Grid>
            <Grid item className="flex flex-col items-center mt-5">
              <Button
                variant="contained"
                className="py-3 bg-white hover:bg-white rounded-xl"
                startIcon={
                  <img src={googleLogo} alt="google" />
                }
              >
                <Typography variant="body2" className="text-xl font-normal text-gray-400 normal-case md:text-2xl">Sign In with Google</Typography>
              </Button>
            </Grid>
            <Grid item className="flex justify-center mt-9">
              <p className="text-sm font-semibold" style={{ fontFamily: 'montserrat' }}>
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
