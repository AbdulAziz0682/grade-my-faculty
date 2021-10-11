import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import {
  ArrowLeft,
  ArrowRight,
  Assignment,
  Dashboard,
  Festival,
  People,
  Settings,
} from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import man from '../../assets/man.png';
import professor from '../../assets/professor.svg';

export default function Sidebar({ setOpen, open }) {
  const { currentTab } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full p-3 mt-12">
        <img className="w-16" src={man} alt="man" />
        <span className={`flex items-center ${open ? 'justify-between' : 'justify-center'} w-full mt-6`}>
          <Typography variant="h4" className={`${open ? 'block' : 'hidden'}`}>Aron Young</Typography>
          <IconButton className="p-1 rounded-none bg-primary hover:bg-blue-800" onClick={() => setOpen(!open)}>
            {
              open
                ? (
                  <ArrowLeft htmlColor="white" className="w-5 h-5" />
                )
                : (
                  <ArrowRight htmlColor="white" className="w-5 h-5" />
                )
            }
          </IconButton>
        </span>
      </div>
      <Divider />
      <List>
        <ListItemButton className={`${currentTab === 'dashboard' && 'bg-activeTab'}`} onClick={() => dispatch(setCurrentTab('dashboard'))}>
          <ListItemIcon className={`${!open && 'flex justify-center'}`}><Dashboard className="w-8 h-8" /></ListItemIcon>
          <ListItemText className={`${!open && 'hidden'}`} primary="Dasboard" />
        </ListItemButton>
        <ListItemButton className={`${currentTab === 'users' && 'bg-activeTab'}`} onClick={() => dispatch(setCurrentTab('users'))}>
          <ListItemIcon className={`${!open && 'flex justify-center'}`}><People className="w-8 h-8" /></ListItemIcon>
          <ListItemText className={`${!open && 'hidden'}`} primary="Users" />
        </ListItemButton>
        <ListItemButton className={`${currentTab === 'professors' && 'bg-activeTab'}`} onClick={() => dispatch(setCurrentTab('professors'))}>
          <ListItemIcon className={`${!open && 'flex justify-center'}`}><img sr={professor} alt="professors" className="w-8 h-8" /></ListItemIcon>
          <ListItemText className={`${!open && 'hidden'}`} primary="Professors" />
        </ListItemButton>
        <ListItemButton className={`${currentTab === 'institute' && 'bg-activeTab'}`} onClick={() => dispatch(setCurrentTab('institute'))}>
          <ListItemIcon className={`${!open && 'flex justify-center'}`}><Festival className="w-8 h-8" /></ListItemIcon>
          <ListItemText className={`${!open && 'hidden'}`} primary="Institute" />
        </ListItemButton>
        <ListItemButton className={`${currentTab === 'blog' && 'bg-activeTab'}`} onClick={() => dispatch(setCurrentTab('blog'))}>
          <ListItemIcon className={`${!open && 'flex justify-center'}`}><Assignment className="w-8 h-8" /></ListItemIcon>
          <ListItemText className={`${!open && 'hidden'}`} primary="Blog" />
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton className={`${currentTab === 'adminSettings' && 'bg-activeTab'}`} onClick={() => dispatch(setCurrentTab('adminSettings'))}>
          <ListItemIcon className={`${!open && 'flex justify-center'}`}><Settings className="w-8 h-8" /></ListItemIcon>
          <ListItemText className={`${!open && 'hidden'}`} primary="Admin Settings" />
        </ListItemButton>
      </List>
    </div>
  );
}

Sidebar.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
