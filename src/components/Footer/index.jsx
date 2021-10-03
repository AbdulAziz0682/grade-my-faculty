import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Facebook from '@mui/icons-material/FacebookRounded';

export default function Footer() {
  return (
    <Box id="footer" sx={{ bgcolor: 'primary.main', width: '100%' }}>
      <Container maxWidth="xl" sx={{ py: '50px' }}>
        <Grid container>
          <Grid
            item
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Typography variant="h6" color="white">Grade My Faculty</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" color="white">FAQ</Typography>
              <Typography variant="h6" color="white">Contact Us</Typography>
              <Typography variant="h6" color="white">Blog</Typography>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Typography variant="h6" color="white" className="bg-yellow-300">Follow Us</Typography>
            <div style={{ display: 'flex', gap: 3 }}>
              <Facebook htmlColor="white" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
