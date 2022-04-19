import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Icon,
} from '@mui/material';

import { Close } from '@mui/icons-material';

import { useHistory, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import primaryFacebook from '../../../assets/primaryFacebook.svg';
import primaryInstagram from '../../../assets/primaryInstagram.svg';
import primaryTwitter from '../../../assets/primaryTwitter.svg';
import { logout } from '../../../redux/accountActions';

export default function MobileMenuDialog({ open, handleClose }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  function userLogout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    dispatch(logout());
  }
  return (
    <Dialog open={open} fullWidth handleClose={handleClose} classes={{ container: 'items-start mt-14', paper: 'w-full' }}>
      <IconButton className="self-end p-3" onClick={() => handleClose()}><Close /></IconButton>
      <DialogTitle classes={{ root: 'text-xl text-center' }}>
        Welcome to
        <br />
        Grade My Faculty
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItemButton onClick={() => { history.push('/'); handleClose(); }}>
            <ListItemText classes={{ primary: 'font-bold text-lg' }} sx={{ color: pathname === '/' || pathname === '/' ? 'primary.main' : 'gray' }}>Home</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => { history.push('/blog'); handleClose(); }}>
            <ListItemText classes={{ primary: 'font-bold text-lg' }} sx={{ color: pathname === '/blog' || pathname === '/blog' ? 'primary.main' : 'gray' }}>Blog</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => { history.push('/aboutUs'); handleClose(); }}>
            <ListItemText classes={{ primary: 'font-bold text-lg' }} sx={{ color: pathname === '/aboutUs' || pathname === '/aboutUs' ? 'primary.main' : 'gray' }}>About Us</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => { history.push('/contact'); handleClose(); }}>
            <ListItemText classes={{ primary: 'font-bold text-lg' }} sx={{ color: pathname === '/contact' || pathname === '/contact' ? 'primary.main' : 'gray' }}>Contact</ListItemText>
          </ListItemButton>
          {
            user
              ? (
                <>
                  <ListItemButton onClick={() => { history.push('/profile'); handleClose(); }}>
                    <ListItemText classes={{ primary: 'font-bold text-lg' }} sx={{ color: pathname === '/profile' || pathname === '/profile' ? 'primary.main' : 'gray' }}>Profile</ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={() => { userLogout(); handleClose(); }}>
                    <ListItemText classes={{ primary: 'font-bold text-lg' }} sx={{ color: 'gray' }}>Logout</ListItemText>
                  </ListItemButton>
                </>
              )
              : (
                <>
                  <ListItemButton onClick={() => { history.push('/login'); handleClose(); }}>
                    <ListItemText classes={{ primary: 'font-bold text-lg' }} sx={{ color: pathname === '/login' || pathname === '/login' ? 'primary.main' : 'gray' }}>Login</ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={() => { history.push('/signUp'); handleClose(); }}>
                    <ListItemText classes={{ primary: 'font-bold text-lg' }} sx={{ color: pathname === '/signUp' || pathname === '/signUp' ? 'primary.main' : 'gray' }}>Sign Up</ListItemText>
                  </ListItemButton>
                </>
              )
          }
        </List>
      </DialogContent>
      <DialogActions className="flex items-center justify-center">
        <span className="flex items-center justify-center gap-9">
          <a href="https://www.facebook.com/grademyfaculty/">
            <Icon>
              <img className="w-6" src={primaryFacebook} alt="facebook" />
            </Icon>
          </a>
          <a href="https://www.instagram.com/grademyfaculty/">
            <Icon>
              <img className="w-6" src={primaryInstagram} alt="instagram" />
            </Icon>
          </a>
          <a href=" ">
            <Icon>
              <img className="w-6" src={primaryTwitter} alt="twittter" />
            </Icon>
          </a>
        </span>
      </DialogActions>
    </Dialog>
  );
}

MobileMenuDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
