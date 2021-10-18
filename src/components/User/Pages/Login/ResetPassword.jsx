import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  TextField,
  Button,
} from '@mui/material';

export default function ResetPassword() {
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-3">
        <Paper component="form" elevation={4} className="p-2 sm:w-4/6 lg:w-2/6 md:p-5 rounded-xl">
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
                placeholder="***********"
                className="mt-2 bg-gray-50"
              />
            </Grid>
            <Grid item className="mt-9">
              <Button variant="contained" className="py-3" fullWidth>Reset Password</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
