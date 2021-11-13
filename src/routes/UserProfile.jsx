import React from 'react';

import {
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import Profile from '../components/User/Profile/Profile';
import AccountSettings from '../components/User/Profile/AccountSettings';

export default function UserProfile() {
  const [value, setValue] = React.useState(0);
  return (
    <Grid container className="flex-grow w-full">
      <Container maxWidth="xl" className="flex flex-col justify-between md:flex-row md:gap-9">
        <Grid container direction="column" columnGap={3} className="w-full py-10 md:px-4">
          <Grid item>
            <Typography variant="h2">Hey, User</Typography>
          </Grid>
          <Grid item className="w-full">
            <Tabs
              value={value}
              onChange={(e, newVal) => setValue(newVal)}
              TabIndicatorProps={{ className: 'hidden' }}
              className="max-w-full bg-gray-50"
              variant="scrollable"
              allowScrollButtonsMobile
            >
              <Tab value={0} label={<Typography variant="h4">Profile</Typography>} />
              <Tab value={1} label={<Typography variant="h4">Account Settings</Typography>} />
              <Tab value={2} label={<Typography variant="h4">Ratings</Typography>} />
              <Tab value={3} label={<Typography variant="h4">Saved Professors</Typography>} />
            </Tabs>
            <div className={`${value === 0 ? 'block' : 'hidden'}`}>
              <Profile />
            </div>
            <div className={`${value === 1 ? 'block' : 'hidden'}`}>
              <AccountSettings />
            </div>
            <div className={`${value === 2 ? 'block' : 'hidden'}`}>
              Ratings
            </div>
            <div className={`${value === 3 ? 'block' : 'hidden'}`}>
              Saved
            </div>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
