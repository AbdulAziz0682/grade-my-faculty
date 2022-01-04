import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  TextField,
  Button,
} from '@mui/material';

import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { addToast } from '../../../../redux/toastsActions';

export default function ForgetPassword() {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  function handleSubmit() {
    axios.post('https://grade-my-faculty-backend.herokuapp.com0/forgetPassword', { email }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => {
        setError('');
        dispatch(addToast({ message: r?.data || 'Code sent on given email', severity: 'success' }));
        history.push(`/verifyConfirmationCode/${email}`);
      })
      .catch((e) => setError(e?.response?.data?.error || e.message || 'Error occurred'));
  }
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-3">
        <Paper component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} elevation={4} className="p-2 sm:w-4/6 lg:w-2/6 md:p-5 rounded-xl">
          <Grid container direction="column" rowSpacing={1}>
            <Grid item>
              <Typography variant="body2" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Forget Password</Typography>
            </Grid>
            <Grid item className="mt-9">
              <Typography variant="h6" className="text-sm font-semibold lg:text-base" style={{ fontFamily: 'montserrat' }}>Email Address *</Typography>
              <TextField
                fullWidth
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="mt-2 bg-gray-50"
              />
              <p className="pt-2 text-sm font-semibold text-red-500" style={{ fontFamily: 'montserrat' }}>{error}</p>
            </Grid>
            <Grid item className="mt-3">
              <Button variant="contained" type="submit" className="py-3" fullWidth>Reset Password</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
