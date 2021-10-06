import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import TopBar from '../components/User/TopBar';
import Footer from '../components/User/Footer';
import Home from '../components/User/Pages/Home';
import Blog from '../components/User/Pages/Blog';
import AboutUs from '../components/User/Pages/AboutUs';
import Contact from '../components/User/Pages/Contact';
import Login from '../components/User/Pages/Login';
import SingUp from '../components/User/Pages/SignUp';
import EmailVerification from '../components/User/Pages/SignUp/EmailVerification';
import ForgetPassword from '../components/User/Pages/Login/ForgetPassword';

export default function UserRoutes() {
  return (
    <Switch>
      <Grid container direction="column" className="min-h-screen">
        <Grid item>
          <TopBar />
        </Grid>
        <Grid item className="flex-grow flex flex-col" sx={{ marginTop: '86px' /* MaxHeight of Topbar */ }}>
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
          <Route exact path="/signUp">
            <SingUp />
          </Route>
          <Route exact path="/emailVerification">
            <EmailVerification />
          </Route>
          <Route exact path="/forgotPassword">
            <ForgetPassword />
          </Route>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Switch>
  );
}
