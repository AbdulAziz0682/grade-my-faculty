import React, { useState } from 'react';

import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
} from '@mui/material';

import {
  ChevronLeft,
  ChevronRight,
  DeleteForever,
  Visibility,
} from '@mui/icons-material';

import AddEmailDialog from './AddEmailDialog';
import EditEmailDialog from './EditEmailDialog';

import Search from '../../assets/Search.svg';

export default function AllowedEmails() {
  const [openNewEmailDialog, setOpenNewEmailDialog] = useState(false);
  const [updateEmail, setUpdateEmail] = useState({ domain: 'domain.com', status: 'allowed' });
  const [openUpdateEmailDialog, setOpenUpdateEmailDialog] = useState(false);
  function doUpdateEmail(email) {
    setOpenUpdateEmailDialog(true);
    setUpdateEmail(email);
  }
  return (
    <div className="flex flex-col w-full gap-9">
      <AddEmailDialog open={openNewEmailDialog} handleClose={() => setOpenNewEmailDialog(false)} />
      <EditEmailDialog
        open={openUpdateEmailDialog}
        handleClose={() => setOpenUpdateEmailDialog(false)}
        email={updateEmail}
      />
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Allowed Emails</Typography>
        <div className="flex-grow" />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Search} alt="search icon" className="h-9" />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" className="h-full px-9" onClick={() => setOpenNewEmailDialog(true)}>Add New Email</Button>
      </div>
      <TableContainer className="w-full max-h-full bg-white">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold text-gray-400">ID</TableCell>
              <TableCell className="text-lg font-semibold text-gray-400">Email domain</TableCell>
              <TableCell className="font-semibold text-gray-400">Status</TableCell>
              <TableCell className="font-semibold text-center text-gray-400">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              [1, 2, 3, 4].map((u) => (
                <TableRow key={u} className="hover:shadow-md" onClick={() => doUpdateEmail({ domain: 'domain.com', status: 'allowed' })}>
                  <TableCell className="text-gray-400">{u}</TableCell>
                  <TableCell className="text-lg font-semibold text-black">This is email domain</TableCell>
                  <TableCell className="text-gray-600">
                    <select className="w-full p-2 bg-gray-200">
                      {
                        [1, 2, 3].map((i) => <option ke={i}>{i}</option>)
                      }
                    </select>
                  </TableCell>
                  <TableCell className="text-center">
                    <IconButton><Visibility /></IconButton>
                    <IconButton><DeleteForever /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end w-full gap-12 mt-16">
        <IconButton className="bg-gray-400 rounded-none shadow-lg">
          <ChevronLeft className="w-10 h-10" htmlColor="white" />
        </IconButton>
        <IconButton className="rounded-none shadow-lg bg-primary">
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
