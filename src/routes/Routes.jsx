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
import GeneralFaq from '../components/User/Pages/Faq/GeneralFaq';
import LegalFaq from '../components/User/Pages/Faq/LegalFaq';
import AboutUs from '../components/User/Pages/AboutUs';
import Post from '../components/User/Pages/Post';
import ResetPassword from '../components/User/Pages/Login/ResetPassword';
import UserProfile from '../components/User/Profile/UserProfile';
// admin route
import Admin from '../components/Admin';
import AdminLogin from '../components/Admin/Login';
import AdminForgetPassword from '../components/Admin/ForgetPassword';
import AdminResetPassword from '../components/Admin/ResetPassword';

import Toasts from '../components/Toasts';

export default function Routes() {
  const location = useLocation();
  const history = useHistory();
  history.listen(() => window.scrollTo(0, 0));
  const adminRoutes = {
    '/admin': true,
    '/adminlogin': true,
    '/adminforgotpassword': true,
    '/adminresetpassword': true,
  };
  return (
    <>
      <Switch>
        <Grid container direction="column" className="min-h-screen">
          <Grid item>
            { !adminRoutes[location.pathname] && <TopBar /> }
          </Grid>
          <Grid item className="flex flex-col flex-grow w-full" sx={{ marginTop: adminRoutes[location.pathname] ? '0px' : '86px' /* MaxHeight of Topbar */ }}>
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
            <Route exact path="/generalFaq">
              <GeneralFaq />
            </Route>
            <Route exact path="/legalFaq">
              <LegalFaq />
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
            <Route exact path="/adminlogin">
              <AdminLogin />
            </Route>
            <Route exact path="/adminforgotpassword">
              <AdminForgetPassword />
            </Route>
            <Route exact path="/adminresetpassword">
              <AdminResetPassword />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/profile">
              <UserProfile />
            </Route>
          </Grid>
          <Grid item>
            { !adminRoutes[location.pathname] && <Footer /> }
          </Grid>
        </Grid>
      </Switch>
      <Toasts />
    </>
  );
}
