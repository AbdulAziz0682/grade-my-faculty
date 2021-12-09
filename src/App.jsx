import React from 'react';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';

import './index.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  gql,
} from '@apollo/client';

import { LinearProgress, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';

import ErrorBoundary from './components/ErrorBoundary';

import Routes from './routes/Routes';

import themeOptions from './themeOptions';
import { login } from './redux/accountActions';

const theme = createTheme(themeOptions);

const GET_LOGGEDIN_USER = gql`
  query {
    loggedUser {
      user {
        _id
        firstName
        lastName
        email
        ratings
        savedFaculties
        institute
        graduationYear
        registeredAt
        password
      }
      token
    }
  }
`;

const GET_LOGGEDIN_ADMIN = gql`
  query {
    loggedAdmin {
      admin {
        _id
        name
        email
        status
      }
      token
    }
  }
`;

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const link = new HttpLink({
    uri: 'https://grade-my-faculty-backend.herokuapp.com/graphql',
    headers: {
      Authentication: localStorage.getItem('token') || sessionStorage.getItem('token'),
    },
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
  React.useEffect(() => {
    client.query({
      query: GET_LOGGEDIN_USER,
    })
      .then(({ data }) => {
        dispatch(login({ user: data.loggedUser.user, role: 'user' }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
    client.query({
      query: GET_LOGGEDIN_ADMIN,
    })
      .then(({ data }) => {
        dispatch(login({ admin: data.loggedAdmin.admin, role: 'admin' }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center">
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
