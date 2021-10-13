import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import ArrowForward from '@mui/icons-material/ArrowForward';

import { Link, useLocation, useHistory } from 'react-router-dom';

export default function TopBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="button" sx={{ color: pathname === '/' || pathname === '/' ? 'primary.main' : 'gray' }}>Home</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/blog" style={{ textDecoration: 'none' }}>
          <Typography variant="button" sx={{ color: pathname === '/blog' || pathname === '/blog' ? 'primary.main' : 'gray' }}>Blog</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/aboutUs" style={{ textDecoration: 'none' }}>
          <Typography variant="button" sx={{ color: pathname === '/aboutUs' || pathname === '/aboutUs' ? 'primary.main' : 'gray' }}>About Us</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/contact" style={{ textDecoration: 'none' }}>
          <Typography variant="button" sx={{ color: pathname === '/contact' || pathname === '/contact' ? 'primary.main' : 'gray' }}>Contact</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography variant="button" sx={{ color: pathname === '/login' || pathname === '/login' ? 'primary.main' : 'gray' }}>Login</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/signUp" style={{ textDecoration: 'none' }}>
          <Typography variant="button" sx={{ color: pathname === '/signUp' || pathname === '/signUp' ? 'primary.main' : 'gray' }}>Sign Up</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className={`${pathname === '/admin' && 'hidden'} order-first`}>
      <AppBar position="fixed" color="default" className="bg-white">
        <Container maxWidth="xl" sx={{ py: 1.7, maxHeight: 91 }}>
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="white"
              aria-label="Nav bar brand"
              sx={{
                backgroundColor: 'primary.main',
                px: 2,
                textTransform: 'capitalize',
                fontWeight: 800,
              }}
            >
              Grade my faculty
            </Typography>
            <Box sx={{ flexGrow: 1, minWidth: 15 }} />
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
            <Box flexGrow={1} maxWidth="12%" />
            <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
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
                sx={{ p: 1.5 }}
                onClick={() => history.push('/signUp')}
              >
                Signup
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="nav bar toggler"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
