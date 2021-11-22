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

import Routes from './routes/Routes';

import themeOptions from './themeOptions';

const theme = createTheme(themeOptions);

export default function App() {
  const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      Authentication: localStorage.getItem('token'),
    },
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
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
