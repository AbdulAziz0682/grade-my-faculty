/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import ArrowForward from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Logout from '@mui/icons-material/Logout';

import { Link, useLocation, useHistory } from 'react-router-dom';
import { TextField } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import MobileMenuDialog from './MobileMenuDialog';

import { logout } from '../../../redux/accountActions';

import logo from '../../../assets/logo.jpg';

const isSearchFieldRoute = {
  '/grade': true,
  '/grading': true,
  '/post': true,
};

export default function TopBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const faculty = useSelector((state) => state.faculty);
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const universities = [
    { name: 'North South University' },
    { name: 'Lahore University' },
    { name: 'Karachi University' },
  ];
  const [openDialog, setOpenDialog] = React.useState(false);
  const mobileMenuId = 'primary-search-account-menu-mobile';
  function userLogout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    dispatch(logout());
  }

  return (
    <Box className={`${pathname === '/admin' && 'hidden'} order-first`}>
      <AppBar position="fixed" color="default" className="bg-white">
        <Container maxWidth="xl" sx={{ height: 98, py: '23px' }} className="flex flex-col justify-center">
          <Toolbar disableGutters style={{ minHeight: '52px' }}>
            <img src={logo} alt="logo" className="w-32 md:w-44" />
            {
              !isSearchFieldRoute[pathname]
                ? <Box sx={{ flexGrow: 1, minWidth: 15 }} />
                : (
                  <Autocomplete
                    className="flex-grow h-full ml-4 text-gray-500"
                    getOptionLabel={(option) => option.name}
                    options={[...faculty, ...universities]}
                    classes={{ paper: 'rounded-none', listbox: 'py-0', popupIndicator: 'transform-none' }}
                    popupIcon={<SearchIcon />}
                    renderInput={(params) => (
                      <TextField
                        InputProps={{
                          startAdornment: <SearchIcon />,
                        }}
                        {...params}
                      />
                    )}
                    renderOption={(props, option) => {
                      if (!option.department) {
                        return (
                          <MenuItem sx={{ border: '1px solid' }} className="py-3 font-semibold bg-gray-100 border-gray-200" value={option.name} onClick={() => history.push('/faculty', [option.name])}>{option.name}</MenuItem>
                        );
                      }
                      return (
                        <MenuItem value={option.name} sx={{ border: '1px solid' }} className="py-1 bg-gray-100 border-gray-200" onClick={() => history.push('/grade', [option])}>
                          <div className="flex items-end justify-between gap-3 pb-2 overflow-auto" style={{ fontFamily: 'montserrat' }}>
                            <div className="flex flex-col">
                              <p className="font-semibold">{option.name}</p>
                              <span className="text-xs text-primary">
                                {option.department}
                                &nbsp;Department
                              </span>
                            </div>
                            <p className="font-bold">{option.university}</p>
                          </div>
                        </MenuItem>
                      );
                    }}
                  />
                )
            }
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', height: '100%' }}>
              <List sx={{ display: 'flex' }}>
                <ListItem>
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <ListItemText primary="Home" primaryTypographyProps={{ variant: 'button', color: pathname === '/' || pathname === '/home' ? 'primary.main' : 'gray' }} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/blog" style={{ textDecoration: 'none' }}>
                    <ListItemText primary="Blog" primaryTypographyProps={{ variant: 'button', color: pathname === '/blog' ? 'primary.main' : 'gray' }} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/aboutUs" style={{ textDecoration: 'none' }}>
                    <ListItemText sx={{ minWidth: '4.5rem' }} primary="About Us" primaryTypographyProps={{ variant: 'button', color: pathname === '/aboutUs' ? 'primary.main' : 'gray' }} />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <ListItemText primary="Contact" primaryTypographyProps={{ variant: 'button', color: pathname === '/contact' ? 'primary.main' : 'gray' }} />
                  </Link>
                </ListItem>
              </List>
            </Box>
            { !isSearchFieldRoute[pathname] && <Box flexGrow={1} maxWidth="12%" />}
            {
              user
                ? (
                  <Button
                    variant="contained"
                    sx={{ px: 3, display: { md: 'inline-flex', xs: 'none' } }}
                    onClick={() => userLogout()}
                    startIcon={<Logout />}
                  >
                    Logout
                  </Button>
                )
                : (
                  <Box sx={{ display: { md: 'flex', xs: 'none', alignSelf: 'stretch' } }}>
                    <Button
                      variant="text"
                      onClick={() => history.push('/login')}
                      sx={{ p: 1.5, mx: 3 }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{ px: 3 }}
                      onClick={() => history.push('/signUp')}
                    >
                      Signup
                    </Button>
                  </Box>
                )
            }
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="nav bar toggler"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
                onClick={(/* e */) => { /* handleMobileMenuOpen(e); */ setOpenDialog(true); }}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MobileMenuDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
      {/* renderMobileMenu */}
    </Box>
  );
}
