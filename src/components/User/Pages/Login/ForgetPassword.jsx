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

export default function ForgetPassword() {
  const history = useHistory();
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-3">
        <Paper component="form" elevation={4} className="p-2 sm:w-4/6 lg:w-2/6 md:p-5 rounded-xl">
          <Grid container direction="column" rowSpacing={1}>
            <Grid item>
              <Typography variant="body2" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Forget Password</Typography>
            </Grid>
            <Grid item className="mt-9">
              <Typography variant="h6" className="text-sm font-semibold lg:text-base" style={{ fontFamily: 'montserrat' }}>Email Address *</Typography>
              <TextField
                fullWidth
                required
                placeholder="example@gmail.com"
                className="mt-2 bg-gray-50"
              />
              <p className="text-sm font-semibold text-red-500" style={{ fontFamily: 'montserrat' }}>Incorrect email or password. Please try again.</p>
            </Grid>
            <Grid item className="mt-3">
              <Button variant="contained" className="py-3" fullWidth onClick={() => history.push('/resetPassword')}>Reset Password</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
