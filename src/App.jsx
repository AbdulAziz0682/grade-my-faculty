import React from 'react';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import './index.css';

import Routes from './routes/index';

import themeOptions from './themeOptions';

const theme = createTheme(themeOptions);

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
