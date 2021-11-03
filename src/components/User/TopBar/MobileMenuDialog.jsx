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
} from '@mui/material';

import { Close } from '@mui/icons-material';

import { useHistory, useLocation } from 'react-router-dom';

import primaryFacebook from '../../../assets/primaryFacebook.svg';
import primaryInstagram from '../../../assets/primaryInstagram.svg';
import primaryTwitter from '../../../assets/primaryTwitter.svg';

export default function MobileMenuDialog({ open, handleClose }) {
  const { pathname } = useLocation();
  const history = useHistory();
  return (
    <Dialog open={open} fullWidth handleClose={handleClose} classes={{ container: 'items-start mt-14', paper: 'w-full' }}>
      <DialogTitle classes={{ root: 'text-xl flex justify-between items-center' }}>
        Welcome to Grade my Faculty
        <IconButton onClick={() => handleClose()}><Close /></IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItemButton onClick={() => { history.push('/'); handleClose(); }}>
            <ListItemText sx={{ color: pathname === '/' || pathname === '/' ? 'primary.main' : 'gray' }}>Home</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => { history.push('/blog'); handleClose(); }}>
            <ListItemText sx={{ color: pathname === '/blog' || pathname === '/blog' ? 'primary.main' : 'gray' }}>Blog</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => { history.push('/aboutUs'); handleClose(); }}>
            <ListItemText sx={{ color: pathname === '/aboutUs' || pathname === '/aboutUs' ? 'primary.main' : 'gray' }}>About Us</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => { history.push('/contact'); handleClose(); }}>
            <ListItemText sx={{ color: pathname === '/contact' || pathname === '/contact' ? 'primary.main' : 'gray' }}>Contact</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => { history.push('/login'); handleClose(); }}>
            <ListItemText sx={{ color: pathname === '/login' || pathname === '/login' ? 'primary.main' : 'gray' }}>Login</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => { history.push('/signUp'); handleClose(); }}>
            <ListItemText sx={{ color: pathname === '/signUp' || pathname === '/signUp' ? 'primary.main' : 'gray' }}>Sign Up</ListItemText>
          </ListItemButton>
        </List>
      </DialogContent>
      <DialogActions className="flex items-center justify-center">
        <span className="flex items-center justify-center gap-9">
          <img src={primaryFacebook} alt="facebook" className="w-6" />
          <img src={primaryInstagram} alt="instagram" className="w-6" />
          <img src={primaryTwitter} alt="twitter" className="w-6" />
        </span>
      </DialogActions>
    </Dialog>
  );
}

MobileMenuDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
