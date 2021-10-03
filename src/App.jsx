import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StylesProvider, jssPreset, createGenerateClassName } from '@mui/styles';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';

import Routes from './routes/index';

import themeOptions from './themeOptions';

const theme = createTheme(themeOptions);

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById('jss-insertion-point'),
});

export default function App() {
  return (
    <StylesProvider jss={jss} generateClassName={createGenerateClassName()}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </StylesProvider>
  );
}
