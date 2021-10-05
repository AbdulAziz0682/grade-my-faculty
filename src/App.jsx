import React from 'react';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';

import './index.css';

import Routes from './routes/index';

import themeOptions from './themeOptions';

const theme = createTheme(themeOptions);

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
