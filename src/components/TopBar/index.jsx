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

import { Link, useHistory } from 'react-router-dom';

export default function TopBar() {
  const { location: { pathname } } = useHistory();
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
      <MenuItem>
        <Typography variant="button" sx={{ color: 'gray' }}>Home</Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="button" sx={{ color: 'gray' }}>Blog</Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="button" sx={{ color: 'primary.main' }}>About Us</Typography>
      </MenuItem>
      <MenuItem>
        <Typography variant="button" sx={{ color: 'gray' }}>Contact</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl" sx={{ py: 1.7, maxHeight: 91 }}>
          <Toolbar>
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
              }}
            >
              Grade my faculty
            </Typography>
            <Box sx={{ flexGrow: 1, minWidth: 15 }} />
            <Box id="Nav bar collapse" sx={{ height: '100%' }}>
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
                <Button
                  variant="text"
                  onClick={() => {}}
                  sx={{ p: 1.5, mx: 3 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{ p: 1.5 }}
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
