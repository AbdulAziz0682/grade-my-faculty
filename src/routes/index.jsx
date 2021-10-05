import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import Home from '../components/Pages/Home';
import Blog from '../components/Pages/Blog';
import AboutUs from '../components/Pages/AboutUs';
import Contact from '../components/Pages/Contact';
import Login from '../components/Pages/Login';
import SingUp from '../components/Pages/SignUp';

export default function App() {
  return (
    <>
      <Switch>
        <Grid container direction="column" className="min-w-screen min-h-screen">
          <Grid item>
            <TopBar />
          </Grid>
          <Grid item className="flex-grow flex flex-col" sx={{ marginTop: '88px' /* MaxHeight of Topbar */ }}>
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/blog">
                <Blog />
              </Route>
              <Route exact path="/aboutUs">
                <AboutUs />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/singUp">
                <SingUp />
              </Route>
            </>
          </Grid>
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </Switch>
    </>
  );
}
