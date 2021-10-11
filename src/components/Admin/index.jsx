import React, { useState } from 'react';

import {
  Box,
  Drawer,
  Button,
  useMediaQuery,
} from '@mui/material';

import Sidebar from './Sidebar';

export default function Admin() {
  const [open, setOpen] = useState(false);
  const isMediumOrLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
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
      <div id="cont" className="flex-grow">
        <Button className="ml-36" variant="contained" onClick={() => setOpen(!open)}>Open</Button>
      </div>
    </Box>
  );
}
