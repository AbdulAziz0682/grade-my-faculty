import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function EmailVerification() {
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container className="flex items-center justify-center py-20">
        <Paper component="form" className="sm:w-4/6 lg:w-4/6 px-3 md:px-5 pb-16 pt-8 rounded-xl flex flex-col gap-6">
          <Typography variant="h5" style={{ fontFamily: 'montserrat' }}>Verify Your Email</Typography>
          <Typography variant="body1" style={{ fontFamily: 'montserrat' }}>
            You have successfully signed up. Please check the link sent to your given email address
            to activate your account. Email was sent to &nbsp;
            <span className="text-primary">sukichan@gmail.com</span>
          </Typography>
          <Typography variant="body1" style={{ fontFamily: 'montserrat' }}>
            Wrong email?&nbsp;
            <span className="text-primary cursor-pointer font-bold">Click here</span>
            &nbsp;to correct.
          </Typography>
        </Paper>
      </Container>
    </Grid>
  );
}
