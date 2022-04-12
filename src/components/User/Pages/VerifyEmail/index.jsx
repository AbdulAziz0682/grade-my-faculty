import React from 'react';

import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from '@mui/material';

import { CheckCircleRounded } from '@mui/icons-material';

import axios from 'axios';

import { Redirect } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addToast } from '../../../../redux/toastsActions';
import WelcomeDialog from './WelcomeDialog';

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  function verifyEmail() {
    setLoading(true);
    setError(false);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/verifyEmail${window.location.search}`)
      .then(() => {
        setLoading(false);
        setDialogOpen(true);
        dispatch(addToast({ message: 'Email Verified successfully', severity: 'success' }));
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        dispatch(addToast({ message: e?.response?.data?.error || e.message || 'Error occurred', severity: 'error' }));
      });
  }
  React.useEffect(() => {
    verifyEmail();
  }, []);
  if (!window.location.search) return <Redirect to="/" />;
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex flex-col items-center self-stretch justify-center pt-14 pb-28">
        <Paper className="flex flex-col items-center gap-3 p-10 md:w-4/6 rounded-xl">
          {
            loading
              ? (
                <>
                  <Typography variant="h4" color="primary" align="center" className="w-full">Verifying your email...</Typography>
                  <CircularProgress />
                </>
              )
              : error && (
                <>
                  <Typography variant="h4" color="error" align="center" className="w-full">Could not verify your email.</Typography>
                  <Button variant="outlined" onClick={() => verifyEmail()}>Retry</Button>
                </>
              )
          }
          {
            !loading && !error && (
              <>
                <Typography variant="h4" color="primary" align="center" className="w-full">Email Verified</Typography>
                <div className="flex w-full">
                  <CheckCircleRounded className="m-auto" style={{ width: '80px', height: '80px' }} htmlColor="#5D5FEF" />
                </div>
                <WelcomeDialog open={isDialogOpen} handleClose={() => setDialogOpen(false)} />
              </>
            )
          }
        </Paper>
      </Container>
    </Grid>
  );
}
