import React, { lazy, Suspense } from 'react';

import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import { createUploadLink } from 'apollo-upload-client';

import Grid from '@mui/material/Grid';
import TopBar from '../components/User/TopBar';
import Footer from '../components/User/Footer';
import Home from '../components/User/Pages/Home';
import Faculty from '../components/User/Pages/Faculty';
import Grade from '../components/User/Pages/Grade';
import GradingForm from '../components/User/Pages/Grade/GradingForm';
import Blog from '../components/User/Pages/Blog';
import Contact from '../components/User/Pages/Contact';
import NewInstitute from '../components/User/Pages/NewInstitute';
import NewFaculty from '../components/User/Pages/NewFaculty';
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
import AdminLogin from '../components/Admin/Login';
import AdminForgetPassword from '../components/Admin/ForgetPassword';
import AdminResetPassword from '../components/Admin/ResetPassword';
import AdminVerifyConfirmationCode from '../components/Admin/VerifyConfirmationCode';

import Toasts from '../components/Toasts';
import VerifyConfirmationCode from '../components/User/Pages/Login/VerifyConfirmationCode';
import SplashScreen from '../SplashScreen';
// Lazy loading
const Admin = lazy(() => import('../components/Admin'));

export default function Routes() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const link = createUploadLink({
    uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
    headers: {
      Authentication: token,
      'keep-alive': 'true',
    },
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
  const location = useLocation();
  const history = useHistory();
  history.listen(() => window.scrollTo(0, 0));
  const adminRoutes = [
    '/admin',
    '/adminlogin',
    '/adminforgotpassword',
    '/adminresetpassword',
    '/adminverifyConfirmationCode',
  ];
  function isAdminRoute(pathname) {
    const found = adminRoutes.find((r) => pathname.startsWith(r));
    if (found) {
      return true;
    }
    return false;
  }
  return (
    <>
      <Switch>
        <ApolloProvider client={client}>
          <Grid container direction="column" className="min-h-screen">
            <Grid item>
              { !isAdminRoute(location.pathname) && <TopBar /> }
            </Grid>
            <Grid item className="flex flex-col flex-grow w-full" sx={{ marginTop: isAdminRoute(location.pathname) ? '0px' : '86px' /* MaxHeight of Topbar */ }}>
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
              <Route exact path="/new-institute">
                <NewInstitute />
              </Route>
              <Route exact path="/new-faculty">
                <NewFaculty />
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
              <Route exact path="/verifyConfirmationCode/:email">
                <VerifyConfirmationCode />
              </Route>
              <Route exact path="/adminverifyConfirmationCode/:email">
                <AdminVerifyConfirmationCode />
              </Route>
              <Route exact path="/resetPassword/:token">
                <ResetPassword />
              </Route>
              <Route exact path="/adminresetPassword/:token">
                <AdminResetPassword />
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
                <Suspense fallback={<SplashScreen />}>
                  <Admin />
                </Suspense>
              </Route>
              <Route exact path="/profile">
                <UserProfile />
              </Route>
            </Grid>
            <Grid item>
              { !isAdminRoute(location.pathname) && <Footer /> }
            </Grid>
          </Grid>
        </ApolloProvider>
      </Switch>
      <Toasts />
    </>
  );
}
