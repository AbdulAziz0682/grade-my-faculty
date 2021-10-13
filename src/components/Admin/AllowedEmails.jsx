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
  Search,
  DeleteForever,
  Visibility,
} from '@mui/icons-material';

import AddEmailDialog from './AddEmailDialog';
import EditEmailDialog from './EditEmailDialog';

export default function AllowedEmails() {
  const [openNewEmailDialog, setOpenNewEmailDialog] = useState(false);
  const [updateEmail, setUpdateEmail] = useState({ domain: 'domain.com', status: 'allowed' });
  const [openUpdateEmailDialog, setOpenUpdateEmailDialog] = useState(false);
  function doUpdateEmail(email) {
    setOpenUpdateEmailDialog(true);
    setUpdateEmail(email);
  }
  return (
    <div className="flex flex-col w-full gap-3">
      <AddEmailDialog open={openNewEmailDialog} handleClose={() => setOpenNewEmailDialog(false)} />
      <EditEmailDialog
        open={openUpdateEmailDialog}
        handleClose={() => setOpenUpdateEmailDialog(false)}
        email={updateEmail}
      />
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">Allowed Emails</Typography>
        <div className="flex-grow" />
        <TextField
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="w-9 h-9" />
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
              <TableCell className="font-semibold text-gray-400">Email domain</TableCell>
              <TableCell className="font-semibold text-gray-400">Status</TableCell>
              <TableCell className="font-semibold text-center text-gray-400">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              [1, 2, 3, 4].map((u) => (
                <TableRow key={u} className="hover:shadow-md" onClick={() => doUpdateEmail({ domain: 'domain.com', status: 'allowed' })}>
                  <TableCell className="text-gray-400">{u}</TableCell>
                  <TableCell className="font-semibold text-black">This is ad title</TableCell>
                  <TableCell className="text-gray-600">
                    <select className="w-full bg-gray-200">
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
          <ChevronLeft className="w-12 h-12" htmlColor="white" />
        </IconButton>
        <IconButton className="rounded-none shadow-lg bg-primary">
          <ChevronRight className="w-12 h-12" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
