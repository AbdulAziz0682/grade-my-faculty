module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#5D5FEF',
        pageBg: 'rgba(93, 95, 239, 0.1)',
      },
    },
    screen: {
      xs: '0px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      '2xl': '1836px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
