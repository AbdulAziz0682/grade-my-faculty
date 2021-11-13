import React from 'react';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import TopBar from '../components/User/TopBar';
import Footer from '../components/User/Footer';
import Home from '../components/User/Pages/Home';
import Faculty from '../components/User/Pages/Faculty';
import Grade from '../components/User/Pages/Grade';
import GradingForm from '../components/User/Pages/Grade/GradingForm';
import Blog from '../components/User/Pages/Blog';
import Contact from '../components/User/Pages/Contact';
import Login from '../components/User/Pages/Login';
import SingUp from '../components/User/Pages/SignUp';
import EmailVerification from '../components/User/Pages/SignUp/EmailVerification';
import ForgetPassword from '../components/User/Pages/Login/ForgetPassword';
import Faq from '../components/User/Pages/Faq';
import StudentsFaq from '../components/User/Pages/Faq/StudentsFaq';
import TeachersFaq from '../components/User/Pages/Faq/TeachersFaq';
import AboutUs from '../components/User/Pages/AboutUs';
import Post from '../components/User/Pages/Post';
// admin route
import Admin from '../components/Admin';
import ResetPassword from '../components/User/Pages/Login/ResetPassword';
import UserProfile from './UserProfile';

export default function UserRoutes() {
  const location = useLocation();
  const history = useHistory();
  history.listen(() => window.scrollTo(0, 0));
  return (
    <Switch>
      <Grid container direction="column" className="min-h-screen">
        <Grid item>
          <TopBar />
        </Grid>
        <Grid item className="flex flex-col flex-grow w-full" sx={{ marginTop: location.pathname === '/admin' ? '0px' : '86px' /* MaxHeight of Topbar */ }}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/faculty">
            <Faculty />
          </Route>
          <Route exact path="/grade">
            <Grade />
          </Route>
          <Route exact path="/grading">
            <GradingForm />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route exact path="/post">
            <Post />
          </Route>
          <Route exact path="/aboutUs">
            <AboutUs />
          </Route>
          <Route exact path="/faq">
            <Faq />
          </Route>
          <Route exact path="/studentsFaq">
            <StudentsFaq />
          </Route>
          <Route exact path="/teachersFaq">
            <TeachersFaq />
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
          <Route exact path="/resetPassword">
            <ResetPassword />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/profile">
            <UserProfile />
          </Route>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Switch>
  );
}
