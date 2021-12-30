import React from 'react';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';

import './index.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

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
  const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      Authentication: localStorage.getItem('token') || sessionStorage.getItem('token'),
    },
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
  React.useEffect(() => {
    axios.post('http://localhost:4000/adminlogin', {}, {
      headers: {
        Authentication: localStorage.getItem('token') || sessionStorage.getItem('token'),
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
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    axios.post('http://localhost:4000/login', {}, {
      headers: {
        Authentication: localStorage.getItem('token') || sessionStorage.getItem('token'),
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
      .catch((e) => {
        setLoading(false);
        console.log(e);
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
        <ErrorBoundary>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ApolloProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
