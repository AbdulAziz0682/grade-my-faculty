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
        <Grid item className="flex-grow flex flex-col" sx={{ marginTop: '86px' /* MaxHeight of Topbar */ }}>
          <Route path="/">
            <Admin />
          </Route>
        </Grid>
      </Grid>
    </Switch>
  );
}
