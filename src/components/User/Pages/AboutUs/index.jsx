import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function AboutUs() {
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container>
        <Grid container direction="column" className="pt-16 pb-60">
          <Grid item className="w-full">
            <Typography variant="h1" align="center"> About Us </Typography>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
