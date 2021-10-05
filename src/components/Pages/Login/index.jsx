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

import googleLogo from '../../../assets/googleLogo.svg';

export default function Login() {
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container className="flex items-center justify-center">
        <Paper component="form" className="sm:w-4/6 lg:w-3/6 p-3 md:p-5">
          <Grid container direction="column" className="gap-3">
            <Grid item>
              <Typography variant="h3" align="center" classes={{ root: 'font-extrabold text-2xl' }}>Sign In</Typography>
            </Grid>
            <Grid item>
              <div className="font-extrabold text-sm lg:text-lg">Email Address *</div>
              <TextField
                fullWidth
                required
                placeholder="example@gmail.com"
                className="bg-gray-50 mt-2"
              />
            </Grid>
            <Grid item>
              <div className="font-extrabold text-sm lg:text-lg">Password *</div>
              <TextField
                fullWidth
                required
                placeholder="********"
                className="bg-gray-50 mt-2"
              />
            </Grid>
            <Grid item>
              <p className="font-extrabold text-sm text-red-700">Incorrect email or password. Please try again.</p>
            </Grid>
            <Grid item className="flex gap-3 justify-between items-center">
              <FormControl>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remeber me"
                  defaultChecked
                  classes={{
                    label: 'font-extrabold text-sm lg:text-lg',
                  }}
                />
              </FormControl>
              <p className="font-extrabold text-gray-400 text-sm lg:text-lg">Forget Password</p>
            </Grid>
            <Grid item className="my-3">
              <Button variant="contained" className="py-5 text-xl" fullWidth>Sign In</Button>
            </Grid>
            <Grid item className="my-3">
              <Typography className="font-extrabold text-xl" align="center">or continue with</Typography>
            </Grid>
            <Grid item className="mt-3 flex flex-col items-center">
              <Paper className="flex h-12 p-2 md:w-4/6 justify-between gap-2">
                <img src={googleLogo} alt="google" />
                <Typography className="font-medium text-2xl text-gray-400 flex-grow">Sign In with Google</Typography>
              </Paper>
            </Grid>
            <Grid item className="mt-6 flex justify-center">
              <p className="font-extrabold text-sm lg:text-lg">
                Dont&apos;t have an account?
                <span className="text-primary mx-2">Click here</span>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
