import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

import googleLogo from '../../../assets/googleLogo.svg';

export default function Login() {
  const history = useHistory();
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container className="flex items-center justify-center py-3">
        <Paper component="form" className="sm:w-4/6 lg:w-3/6 p-2 md:p-5 rounded-xl">
          <Grid container direction="column" className="gap-3">
            <Grid item>
              <Typography variant="body2" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Sign In</Typography>
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
            <Grid item>
              <Typography variant="h6" className="font-semibold text-sm lg:text-base" style={{ fontFamily: 'montserrat' }}>Password *</Typography>
              <TextField
                fullWidth
                required
                placeholder="********"
                className="bg-gray-50 mt-2"
              />
            </Grid>
            <Grid item className="mt-3">
              <p className="font-semibold text-sm text-red-700" style={{ fontFamily: 'montserrat' }}>Incorrect email or password. Please try again.</p>
            </Grid>
            <Grid item className="flex gap-3 justify-between items-center">
              <FormControl>
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Typography variant="h6" className="font-semibold text-sm lg:text-lg" sx={{ fontFamily: 'montserrat' }}>Remember Me</Typography>}
                  defaultChecked
                />
              </FormControl>
              <p className="font-semibold text-gray-400 text-sm lg:text-lg" style={{ fontFamily: 'montserrat' }}>Forget Password</p>
            </Grid>
            <Grid item className="my-5">
              <Button variant="contained" className="py-4 text-xl" fullWidth>Sign In</Button>
            </Grid>
            <Grid item className="my-5">
              <Typography className="font-bold text-lg" align="center" style={{ fontFamily: 'montserrat' }}>or continue with</Typography>
            </Grid>
            <Grid item className="mt-5 flex flex-col items-center">
              <Button
                variant="contained"
                className="bg-white hover:bg-white rounded-xl py-3"
                startIcon={
                  <img src={googleLogo} alt="google" />
                }
              >
                <Typography variant="body2" className="font-semibold text-xl md:text-2xl text-gray-400">Sign In with Google</Typography>
              </Button>
            </Grid>
            <Grid item className="mt-9 flex justify-center">
              <p className="font-bold text-sm lg:text-lg" style={{ fontFamily: 'montserrat' }}>
                Don&apos;t have an account?
                <span className="text-primary mx-1.5 cursor-pointer" aria-hidden onClick={() => history.push('/signUp')}>Click here</span>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
