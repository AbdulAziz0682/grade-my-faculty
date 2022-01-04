import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  TextField,
  Button,
} from '@mui/material';

// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToast } from '../../../../redux/toastsActions';

export default function VerifyConfirmationCode() {
  const { email } = useParams();
  const history = useHistory();
  if (!email) return <Redirect push to="/forgotPassword" />;
  const [error, setError] = React.useState('');
  const [confirmationCode, setConfirmationCode] = React.useState(0);
  const dispatch = useDispatch();
  function handleSubmit() {
    axios.post('http://localhost:4000/validateCode', { email, confirmationCode }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => {
        setError('');
        dispatch(addToast({ message: 'Code verified successfully', severity: 'success' }));
        history.push(`/resetPassword/${r?.data?.token}`);
      })
      .catch((e) => setError(e?.response?.data?.error || e.message || 'Error occurred'));
  }
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-3">
        <Paper component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} elevation={4} className="p-2 sm:w-4/6 lg:w-2/6 md:p-5 rounded-xl">
          <Grid container direction="column" rowSpacing={1}>
            <Grid item>
              <Typography variant="body2" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Code Confirmation</Typography>
            </Grid>
            <Grid item className="mt-9">
              <Typography variant="h6" className="text-sm font-semibold lg:text-base" style={{ fontFamily: 'montserrat' }}>Email Address *</Typography>
              <TextField
                fullWidth
                required
                type="email"
                value={email}
                disabled
                placeholder="example@gmail.com"
                className="mt-2 bg-gray-50"
              />
            </Grid>
            <Grid item className="mt-2">
              <Typography variant="h6" className="text-sm font-semibold lg:text-base" style={{ fontFamily: 'montserrat' }}>Confirmation Code *</Typography>
              <TextField
                fullWidth
                required
                type="number"
                value={confirmationCode}
                placeholder="1234"
                onChange={(e) => setConfirmationCode(e.target.value)}
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
