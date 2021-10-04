import React from 'react';
import {
  BrowserRouter as Router,
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
    <Router>
      <Grid container direction="column" justifyContent="space-between" className="w-full">
        <Grid item>
          <TopBar />
        </Grid>
        <Grid item className="flex-grow self-stretch" sx={{ marginTop: '91px' /* MaxHeight of Topbar */ }}>
          <Switch>
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
          </Switch>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Router>
  );
}
