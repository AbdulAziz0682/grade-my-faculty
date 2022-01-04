import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  TextField,
  Button,
} from '@mui/material';

import axios from 'axios';

import { useParams, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addToast } from '../../../../redux/toastsActions';

export default function ResetPassword() {
  const { token } = useParams();
  console.log({ token });
  const history = useHistory();
  if (!token) return history.push('/forgotPassword');
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  function handleSubmit() {
    if (newPassword !== confirmPassword) return dispatch(addToast({ message: 'Passwords should match', severity: 'error' }));
    if (newPassword.length < 8) return dispatch(addToast({ message: 'Passwords should be at least 8 characters long', severity: 'error' }));
    return axios.post('https://grade-my-faculty-backend.herokuapp.com0/resetPassword', { token, newPassword, confirmPassword }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => {
        dispatch(addToast({ message: r?.data || 'Password changed', severity: 'success' }));
        history.push('/login');
      })
      .catch((e) => dispatch(addToast({ message: e?.response?.data?.error || e.message || 'Error occurred', severity: 'error' })));
  }
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-12">
        <Paper component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} elevation={4} className="p-2 sm:w-4/6 lg:w-2/6 md:p-5 rounded-xl">
          <Grid container direction="column" rowSpacing={1}>
            <Grid item>
              <Typography variant="body2" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Reset Password</Typography>
            </Grid>
            <Grid item className="mt-9">
              <Typography variant="h6" className="text-sm font-semibold lg:text-base" style={{ fontFamily: 'montserrat' }}>New Password *</Typography>
              <TextField
                fullWidth
                required
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="***********"
                className="mt-2 bg-gray-50"
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" className="text-sm font-semibold lg:text-base" style={{ fontFamily: 'montserrat' }}>Confirm Password *</Typography>
              <TextField
                fullWidth
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="***********"
                className="mt-2 bg-gray-50"
              />
            </Grid>
            <Grid item className="mt-9">
              <Button variant="contained" type="submit" className="py-3" fullWidth>Reset Password</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
