import React from 'react';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';

import { useState } from '@hookstate/core';
import account from './hookState/account';

import './index.css';

import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';

import themeOptions from './themeOptions';

const theme = createTheme(themeOptions);

export default function App() {
  const { role } = useState(account);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {
            role.get() === 'user'
            && (
              <UserRoutes />
            )
          }
          {
            role.get() === 'admin'
            && (
              <AdminRoutes />
            )
          }
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
