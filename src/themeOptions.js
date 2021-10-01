const themeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 960,
      xl: 1140,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#5D5FEF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#40BB15',
    },
    error: {
      main: '#E74040',
    },
    warning: {
      main: '#E77C40',
    },
    success: {
      main: '#2DC071',
    },
    text: {
      primary: '#252B42',
      secondary: '#737373',
      disabled: '#BDBDBD',
    },
  },
  typography: {
    h1: {
      fontSize: 58,
      lineHeight: 1.38,
      fontWeight: 700,
    },
    h2: {
      fontSize: 40,
      lineHeight: 1.42,
      fontWeight: 700,
    },
    h3: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.33,
    },
    h4: {
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.51,
    },
    h5: {
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: 15,
      lineHeight: 1.71,
      fontWeight: 700,
    },
    button: {
      fontSize: 15,
      lineHeight: 1.57,
      fontWeight: 600,
      textTransform: 'capitalize',
    },
    body1: {
      fontSize: 17,
      lineHeight: 1.4,
    },
  },
};

export default themeOptions;
