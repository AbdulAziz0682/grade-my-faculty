import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';

import GoogleLogin from 'react-google-login';

import { useHistory, Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { gql, useMutation } from '@apollo/client';

import { useSelector, useDispatch } from 'react-redux';
import { addToast } from '../../../../redux/toastsActions';

import googleLogo from '../../../../assets/googleLogo.svg';
import { login } from '../../../../redux/accountActions';

const NEW_USER = gql`
  mutation NewUser($firstName:String! $lastName:String! $email:String! $password:String! $confirmPassword:String!) {
    newUser(firstName:$firstName lastName:$lastName email:$email password:$password confirmPassword:$confirmPassword) {
      firstName
      lastName
      email
    }
  }
`;

export default function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const [newUser, { loading, error }] = useMutation(NEW_USER);
  // Form requirements
  const schema = yup.object({
    firstName: yup.string().required('First name is required').min(2, 'Enter at least 2 characters'),
    lastName: yup.string().required('Last name is required').min(2, 'Enter at least 2 characters'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => newUser({ variables: values })
      .then(() => {
        dispatch(addToast({ message: 'Registered successfully', severity: 'success' }));
        history.push('/emailVerification', [{ email: values.email }]);
      }),
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
      <Container maxWidth="xl" className="flex items-center justify-center pt-32 pb-16">
        <Paper component="form" onSubmit={formik.handleSubmit} className="w-full px-8 lg:w-10/12 md:px-12 lg:px-32 py-9 rounded-xl">
          <Grid container direction="column" className="gap-4">
            <Grid item>
              <Typography variant="body2" classes={{ root: 'font-extrabold text-2xl' }}>Sign Up</Typography>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 2, md: 6, lg: 12 }} className="mt-1">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" className="text-sm font-semibold" style={{ fontFamily: 'montserrat' }}>First Name *</Typography>
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
                <Typography variant="h6" className="text-sm font-semibold" style={{ fontFamily: 'montserrat' }}>Last Name *</Typography>
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
              <Grid item xs={12}>
                <Typography variant="h6" className="text-sm font-semibold" style={{ fontFamily: 'montserrat' }}>Email *</Typography>
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
                <Typography variant="h6" className="text-sm font-semibold" style={{ fontFamily: 'montserrat' }}>Password *</Typography>
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
                <Typography variant="h6" className="text-sm font-semibold" style={{ fontFamily: 'montserrat' }}>Confirm Password *</Typography>
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
            <Grid item className={`${error ? 'block' : 'hidden'} mt-3`}>
              <p className="text-sm font-semibold text-red-700" style={{ fontFamily: 'montserrat' }}>{ error?.message }</p>
            </Grid>
            <Grid item>
              <Button variant="contained" disabled={loading} type="submit" className="py-4 text-xl" fullWidth>
                {
                  loading
                    ? <CircularProgress />
                    : 'Sign Up'
                }
              </Button>
            </Grid>
            <Grid item className="mt-5">
              <Typography className="text-sm font-bold" align="center" style={{ fontFamily: 'montserrat' }}>or continue with</Typography>
            </Grid>
            <Grid item className="flex flex-col items-center my-3">
              <GoogleLogin
                // eslint-disable-next-line react/jsx-curly-brace-presence
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                onSuccess={(res) => googleResponse(res)}
                onFailure={(res) => googleResponse(res)}
                cookiepolicy="single_host_origin"
                ux_mode="redirect"
                buttonText="Login"
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
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
                      Sign in with Google
                    </Typography>
                  </Button>
                )}
              />
            </Grid>
            <Grid item className="flex justify-center mt-3">
              <p className="text-sm font-bold lg:text-sm" style={{ fontFamily: 'montserrat' }}>
                Already have an account?
                <span className="mx-1 cursor-pointer text-primary" aria-hidden onClick={() => history.push('/login')}>Click here</span>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
