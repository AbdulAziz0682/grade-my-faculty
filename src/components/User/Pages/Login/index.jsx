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

import GoogleLogin from 'react-google-login';

import { useHistory, Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../../redux/accountActions';
import { addToast } from '../../../../redux/toastsActions';

import googleLogo from '../../../../assets/googleLogo.svg';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  function loginUser({ email, password }) {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.message);
          setLoading(false);
          return;
        }
        if (checked) localStorage.setItem('token', res.data.token);
        sessionStorage.setItem('token', res.data.token);
        dispatch(login({ user: res.data.user, role: 'user' }));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }
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
    onSubmit: (values) => loginUser({ ...values }),
  });
  // -----------------
  function googleResponse(res) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/googleSignup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(res),
    })
      .then((r) => r.json()).then((response) => {
        if (response.error) {
          dispatch(addToast({ message: response.error, severity: 'error' }));
        } else if (!response.token) {
          dispatch(addToast({ message: 'Registered successfully', severity: 'success' }));
          history.push('/emailVerification', [{ email: response.user.email }]);
        } else if (response.user && response.token) {
          localStorage.setItem('token', response.token);
          sessionStorage.setItem('token', response.token);
          dispatch(login({ user: response.user, role: 'user' }));
        }
      });
  }
  if (user) return <Redirect push to="/" />;
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
              <p className="text-sm font-semibold text-red-700" style={{ fontFamily: 'montserrat' }}>{ error }</p>
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
              <GoogleLogin
                // eslint-disable-next-line react/jsx-curly-brace-presence
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                onSuccess={(res) => googleResponse(res)}
                onFailure={(res) => googleResponse(res)}
                cookiePolicy="single_host_origin"
                buttonText="Login"
                render={(renderProps) => (
                  <Button
                    onClick={(e) => renderProps.onClick(e)}
                    disabled={renderProps.disabled}
                    variant="contained"
                    className="py-3 bg-white hover:bg-white rounded-xl"
                    startIcon={
                      <img src={googleLogo} alt="google" />
                    }
                  >
                    <Typography
                      variant="body2"
                      className="text-lg font-normal text-gray-400 normal-case md:text-2xl"
                    >
                      Sign Up with Google
                    </Typography>
                  </Button>
                )}
              />
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
