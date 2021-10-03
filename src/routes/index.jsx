import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

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
      <div className="flex flex-col h-screen justify-between">
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
        <Footer />
      </div>
    </Router>
  );
}
