import React from 'react';

import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { BrowserRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import './index.css';

import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';

import themeOptions from './themeOptions';

const theme = createTheme(themeOptions);

export default function App() {
  const role = useSelector((state) => state.account.role);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {
            role === 'user'
            && (
              <UserRoutes />
            )
          }
          {
            role === 'admin'
            && (
              <AdminRoutes />
            )
          }
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
