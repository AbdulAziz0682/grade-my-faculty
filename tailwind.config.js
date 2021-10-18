module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#5D5FEF',
        pageBg: 'rgba(93, 95, 239, 0.1)',
        primaryLight: '#7778F0',
        activeTab: '#E0DBF8',
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.03)',
      },
      boxShadow: {
        primaryGlow: '0 7px 7px rgba(93, 95, 239, 0.03), 0 7px 7px rgba(93, 95, 239, 0.15)',
        redGlow: '0 7px 7px rgba(231, 64, 64, 0.03), 0 7px 7px rgba(231, 64, 64, 0.15)',
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
    extend: {
      dropShadow: ['hover'],
      filter: ['hover'],
    },
  },
  plugins: [],
};
