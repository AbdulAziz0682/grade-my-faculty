import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Admin from '../components/Admin';

export default function AdminRoutes() {
  return (
    <Switch>
      <Grid container direction="column" className="min-h-screen">
        <Grid item className="flex flex-col flex-grow w-full">
          <Route path="/">
            <Admin />
          </Route>
        </Grid>
      </Grid>
    </Switch>
  );
}
