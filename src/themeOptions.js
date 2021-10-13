const themeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1380,
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
      lineHeight: '80px',
      fontWeight: 'bold',
      fontFamily: 'Century Gothic, sans-serif',
    },
    h2: {
      fontSize: 40,
      lineHeight: '57px',
      fontWeight: 'bold',
      fontFamily: 'Century Gothic, sans-serif',
    },
    h3: {
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: 'bold',
      fontFamily: 'Century Gothic, sans-serif',
    },
    h4: {
      fontSize: 20,
      lineHeight: '30px',
      fontWeight: 'bold',
      fontFamily: 'Century Gothic, sans-serif',
    },
    h5: {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 'bold',
      fontFamily: 'Century Gothic, sans-serif',
    },
    h6: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 'bold',
      fontFamily: 'Century Gothic, sans-serif',
    },
    button: {
      fontSize: 15,
      lineHeight: 1.57,
      textTransform: 'capitalize',
      fontWeight: 800,
      fontFamily: 'Century Gothic, sans-serif',
    },
    body1: {
      fontSize: 17,
      lineHeight: 1.4,
      fontFamily: 'Century Gothic, sans-serif',
    },
  },
};

export default themeOptions;
