import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Routes from './routes/index';

import themeOptions from './themeOptions';

const theme = createTheme(themeOptions);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
