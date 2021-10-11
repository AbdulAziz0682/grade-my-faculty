import React, { useState } from 'react';

import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import { Logout, Menu } from '@mui/icons-material';

import { useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import Users from './Users';
import Institutes from './Institutes';
import Blogs from './Blogs';

export default function Admin() {
  const [open, setOpen] = useState(false);
  const isMediumOrLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const { admin } = useSelector((state) => state);
  return (
    <Box display="flex" width="100%">
      {
        isMediumOrLargerScreen
          ? (
            <div
              id="sidebar"
              className={`h-screen ${open ? 'md:w-4/12 lg:w-3/12 xl:w-2/12' : 'w-24'} border-r`}
            >
              <Sidebar isMediumOrLargerScreen setOpen={setOpen} open={open} />
            </div>
          )
          : (
            <Drawer
              id="lgDrawer"
              variant="temporary"
              open={open}
              classes={{ paper: 'w-4/6' }}
            >
              <Sidebar setOpen={setOpen} open={open} />
            </Drawer>
          )
      }
      <div id="cont" className="flex flex-col flex-grow bg-gray-50">
        <div className={`flex items-center px-6 bg-white h-14 ${isMediumOrLargerScreen ? 'justify-end' : 'justify-between'}`}>
          { !isMediumOrLargerScreen
            && (
              <IconButton onClick={() => setOpen(!open)}>
                <Menu />
              </IconButton>
            )}
          <IconButton><Logout /></IconButton>
        </div>
        <div className="flex flex-col p-6">
          {
            admin.currentTab === 'users' && <Users />
          }
          {
            admin.currentTab === 'institutes' && <Institutes />
          }
          {
            admin.currentTab === 'blogs' && <Blogs />
          }
        </div>
      </div>
    </Box>
  );
}
