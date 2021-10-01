import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import TopBar from '../components/TopBar/index';
import Home from '../components/Pages/Home/index';
import Blog from '../components/Pages/Blog/index';
import AboutUs from '../components/Pages/AboutUs/index';
import Contact from '../components/Pages/Contact/index';
import Login from '../components/Pages/Login/index';
import SingUp from '../components/Pages/SignUp/index';

export default function App() {
  return (
    <Router>
      <TopBar />
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
    </Router>
  );
}
