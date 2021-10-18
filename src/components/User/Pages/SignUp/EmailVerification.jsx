import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function EmailVerification() {
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-20">
        <Paper component="form" className="flex flex-col gap-6 px-3 pt-8 pb-16 sm:w-4/6 lg:w-4/6 md:px-16 rounded-xl">
          <Typography variant="h5" style={{ fontFamily: 'montserrat', paddingInline: '1.5rem' }}>Verify Your Email</Typography>
          <Typography variant="body1" style={{ fontFamily: 'montserrat' }}>
            You have successfully signed up. Please check the link sent to your given email address
            to activate your account. Email was sent to &nbsp;
            <span className="text-primary">sukichan@gmail.com</span>
          </Typography>
          <Typography variant="body1" style={{ fontFamily: 'montserrat' }}>
            Wrong email?&nbsp;
            <span className="font-bold cursor-pointer text-primary">Click here</span>
            &nbsp;to correct.
          </Typography>
        </Paper>
      </Container>
    </Grid>
  );
}
