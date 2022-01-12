import React from 'react';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';

import './index.css';

import { LinearProgress, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';

import axios from 'axios';

import ErrorBoundary from './components/ErrorBoundary';

import Routes from './routes/Routes';

import themeOptions from './themeOptions';
import { login } from './redux/accountActions';

const theme = createTheme(themeOptions);

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  React.useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/adminlogin`, {}, {
      headers: {
        Authentication: token,
      },
    })
      .then((res) => {
        if (res.data.error) {
          setLoading(false);
          return;
        }
        dispatch(login({ admin: res.data.admin, role: 'admin' }));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {}, {
      headers: {
        Authentication: token,
      },
    })
      .then((res) => {
        if (res.data.error) {
          setLoading(false);
          return;
        }
        dispatch(login({ user: res.data.user, role: 'user' }));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <Typography variant="h3" align="center" color="primary">
          Grade My Faculty
          <LinearProgress className="w-full" />
        </Typography>
      </div>
    );
  }
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
