import React from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

import { useHistory } from 'react-router-dom';

import facebook from '../../../assets/facebook.svg';
import instagram from '../../../assets/instagram.svg';
import twitter from '../../../assets/twitter.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <Box id="footer" className={`${history.location.pathname === '/admin' && 'hidden'}`} sx={{ top: 'auto', bottom: 0, zIndex: 0 }}>
      <Box sx={{ bgcolor: 'primary.main', width: '100%' }}>
        <Container className="md:px-20" sx={{ py: '50px' }}>
          <Grid container justifyContent="space-between">
            <Grid
              item
              xs={6}
              sm={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              <Typography className="font-semibold" color="white">Grade My Faculty</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography className="font-semibold cursor-pointer" color="white">
                  <span aria-hidden onClick={() => history.push('/faq')}>FAQ</span>
                </Typography>
                <Typography className="font-semibold cursor-pointer" color="white">
                  <span aria-hidden onClick={() => history.push('/contact')}>Contact Us</span>
                </Typography>
                <Typography className="font-semibold cursor-pointer" color="white">
                  <span aria-hidden onClick={() => history.push('/blog')}>Blog</span>
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              lg={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              <Typography color="white" className="font-semibold">Follow Us</Typography>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Icon>
                  <img src={facebook} alt="facebook" />
                </Icon>
                <Icon>
                  <img src={instagram} alt="instagram" />
                </Icon>
                <Icon>
                  <img src={twitter} alt="twittter" />
                </Icon>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container className="md:px-20" sx={{ py: 3, bgcolor: 'white' }}>
        <div className="w-full">
          <Typography color="gray" className="font-semibold">&copy; 2021 Grade My Faculty. All Rights Reserved</Typography>
        </div>
      </Container>
    </Box>
  );
}
