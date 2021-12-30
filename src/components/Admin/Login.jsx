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

import axios from 'axios';

import { CheckSharp } from '@mui/icons-material';

import { useHistory, Redirect } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/accountActions';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.account);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  function loginAdmin({ email, password }) {
    setLoading(true);
    axios.post('http://localhost:4000/adminlogin', { email, password }, {
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
        dispatch(login({ admin: res.data.admin, role: 'admin' }));
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
    onSubmit: (values) => loginAdmin({ ...values }),
  });
  // -----------------
  if (admin) return <Redirect to="/admin" />;
  return (
    <Grid container className="w-screen h-screen p-0 m-0 border-p">
      <Container maxWidth="xl" className="flex items-center justify-center py-12">
        <Paper
          component="form"
          className="w-full p-8 py-10 md:w-7/12 lg:w-5/12 md:px-12 rounded-xl"
          onSubmit={formik.handleSubmit}
          elevation={3}
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
            <Grid item className="flex items-center justify-between gap-3 mb-2 mt-9">
              <div className="flex items-center flex-grow gap-3">
                <div className={`border rounded w-6 h-6 flex justify-center items-center ${checked ? 'bg-primary border-primary' : 'bg-transparent border-black'}`} aria-hidden onClick={() => setChecked(!checked)}>
                  <CheckSharp htmlColor="white" className="w-4" />
                </div>
                <Typography variant="h6" className="text-sm font-semibold" sx={{ fontFamily: 'montserrat' }}>Remember Me</Typography>
              </div>
              <p className="text-sm font-semibold text-gray-400 cursor-pointer" aria-hidden onClick={() => history.push('/adminforgotpassword')} style={{ fontFamily: 'montserrat' }}>Forget Password</p>
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
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
