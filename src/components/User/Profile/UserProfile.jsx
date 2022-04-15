import React from 'react';

import {
  Container,
  Grid,
  Typography,
} from '@mui/material';

import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import Profile from './Profile';
import AccountSettings from './AccountSettings';
import Ratings from './Ratings';
import SavedProfessors from './SavedProfessors';

export default function UserProfile() {
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.account.user);
  if (!user) return <Redirect push to="/" />;
  return (
    <Grid container className="flex-grow w-full">
      <Container maxWidth="xl" className="flex flex-col justify-between md:flex-row md:gap-9">
        <Grid container direction="column" columnGap={3} className="w-full py-10 md:px-4">
          <Grid item>
            <Typography variant="h2">
              Hey,&nbsp;
              {user.firstName}
            </Typography>
          </Grid>
          <Grid item className="w-full">
            <div className="flex items-center gap-2 px-1 py-3 bg-gray-100 justify-evenly">
              <Typography className={`${value === 0 && 'font-bold'} cursor-pointer text-xs md:text-lg`} onClick={() => setValue(0)}>Profile</Typography>
              <Typography className={`${value === 1 && 'font-bold'} cursor-pointer text-xs md:text-lg`} onClick={() => setValue(1)}>Account</Typography>
              <Typography className={`${value === 2 && 'font-bold'} cursor-pointer text-xs md:text-lg`} onClick={() => setValue(2)}>Ratings</Typography>
              <Typography className={`${value === 3 && 'font-bold'} cursor-pointer text-xs md:text-lg`} onClick={() => setValue(3)}>Saved Professors</Typography>
            </div>
            <div className={`${value === 0 ? 'block' : 'hidden'}`}>
              <Profile />
            </div>
            <div className={`${value === 1 ? 'block' : 'hidden'}`}>
              <AccountSettings />
            </div>
            <div className={`${value === 2 ? 'block' : 'hidden'}`}>
              <Ratings />
            </div>
            <div className={`${value === 3 ? 'block' : 'hidden'}`}>
              <SavedProfessors />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
