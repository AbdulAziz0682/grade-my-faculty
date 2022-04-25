import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function NotFound() {
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-20">
        <Typography variant="h1">404, sorry page not found :(</Typography>
      </Container>
    </Grid>
  );
}
