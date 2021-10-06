import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  TextField,
  Button,
} from '@mui/material';

export default function ForgetPassword() {
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container className="flex items-center justify-center py-3">
        <Paper component="form" className="sm:w-4/6 lg:w-2/6 p-2 md:p-5 rounded-xl">
          <Grid container direction="column" className="gap-3">
            <Grid item>
              <Typography variant="body2" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Forgot Password</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" className="font-semibold text-sm lg:text-base" style={{ fontFamily: 'montserrat' }}>Email Address *</Typography>
              <TextField
                fullWidth
                required
                placeholder="example@gmail.com"
                className="bg-gray-50 mt-2"
              />
            </Grid>
            <Grid item className="">
              <p className="font-semibold text-sm text-red-700" style={{ fontFamily: 'montserrat' }}>Incorrect email or password. Please try again.</p>
            </Grid>
            <Grid item className="mt-3">
              <Button variant="contained" className="py-3" fullWidth>Reset Password</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
