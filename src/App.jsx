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

import { useDispatch } from 'react-redux';

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
    client.query({
      query: GET_LOGGEDIN_USER,
    })
      .then(({ data }) => dispatch(login({ user: data.loggedUser.user, role: 'user' })))
      .catch((error) => error);
    client.query({
      query: GET_LOGGEDIN_ADMIN,
    })
      .then(({ data }) => dispatch(login({ admin: data.loggedAdmin.admin, role: 'admin' })))
      .catch((error) => error);
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
