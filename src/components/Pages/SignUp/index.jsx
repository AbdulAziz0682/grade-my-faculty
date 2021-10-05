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
  Select,
  MenuItem,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

import googleLogo from '../../../assets/googleLogo.svg';

export default function SignUp() {
  const history = useHistory();
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container className="flex items-center justify-center py-20">
        <Paper component="form" className="sm:w-4/6 lg:w-4/6 p-2 md:p-5 rounded-xl">
          <Grid container direction="column" className="gap-3">
            <Grid item>
              <Typography variant="body2" classes={{ root: 'font-extrabold text-2xl' }}>Sign Up</Typography>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 2, md: 6, lg: 12 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="font-semibold text-sm lg:text-base" style={{ fontFamily: 'montserrat' }}>First Name *</Typography>
                <TextField
                  fullWidth
                  required
                  placeholder="First Name"
                  className="bg-gray-50 mt-2"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="font-semibold text-sm lg:text-base" style={{ fontFamily: 'montserrat' }}>Last Name *</Typography>
                <TextField
                  fullWidth
                  required
                  placeholder="Last Name"
                  className="bg-gray-50 mt-2"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="font-semibold text-sm lg:text-base" style={{ fontFamily: 'montserrat' }}>Email *</Typography>
                <TextField
                  fullWidth
                  required
                  placeholder="example@gmail.com"
                  className="bg-gray-50 mt-2"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="font-semibold text-sm lg:text-base" style={{ fontFamily: 'montserrat' }}>Role *</Typography>
                <Select
                  fullWidth
                  required
                  placeholder="Last Name"
                  className="bg-gray-50 mt-2"
                  value="student"
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="font-semibold text-sm lg:text-base" style={{ fontFamily: 'montserrat' }}>Password *</Typography>
                <TextField
                  fullWidth
                  required
                  type="password"
                  placeholder="*************"
                  className="bg-gray-50 mt-2"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="font-semibold text-sm lg:text-base" style={{ fontFamily: 'montserrat' }}>Confirm Password *</Typography>
                <TextField
                  fullWidth
                  required
                  type="password"
                  placeholder="*************"
                  className="bg-gray-50 mt-2"
                />
              </Grid>
            </Grid>
            <Grid item className="mt-3">
              <p className="font-semibold text-sm text-red-700 hidden" style={{ fontFamily: 'montserrat' }}>Email already exits. Please try again.</p>
            </Grid>
            <Grid item className="flex justify-between items-center">
              <FormControl>
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Typography variant="h6" className="font-semibold text-sm lg:text-lg" sx={{ fontFamily: 'montserrat' }}>Remember Me</Typography>}
                  defaultChecked
                />
              </FormControl>
              <p className="font-semibold text-gray-400 text-sm lg:text-lg" style={{ fontFamily: 'montserrat' }}>Forget Password</p>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" className="py-4 text-xl" fullWidth>Sign Up</Button>
            </Grid>
            <Grid item className="mt-5">
              <Typography className="font-bold text-lg" align="center" style={{ fontFamily: 'montserrat' }}>or continue with</Typography>
            </Grid>
            <Grid item className="my-3 flex flex-col items-center">
              <Button
                variant="contained"
                className="bg-white hover:bg-white rounded-xl py-3"
                startIcon={
                  <img src={googleLogo} alt="google" />
                }
              >
                <Typography variant="body2" className="font-semibold text-xl md:text-2xl text-gray-400">Sign Up with Google</Typography>
              </Button>
            </Grid>
            <Grid item className="mt-3 flex justify-center">
              <p className="font-bold text-sm lg:text-lg" style={{ fontFamily: 'montserrat' }}>
                Already have an account?
                <span className="text-primary mx-1 cursor-pointer" aria-hidden onClick={() => history.push('/login')}>Click here</span>
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
