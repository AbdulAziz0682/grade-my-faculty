import React from 'react';

import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  // Paper,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
} from '@mui/material';

import { ChevronLeft, ChevronRight, Search } from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

export default function Users() {
  const { admin: { users } } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">Users</Typography>
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
        <Button variant="contained" className="h-full px-9" onClick={() => dispatch(setCurrentTab({ name: 'addUser', data: null }))}>Add Users</Button>
      </div>
      <TableContainer className="w-full max-h-full bg-white">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold text-gray-400">ID</TableCell>
              <TableCell className="font-semibold text-gray-400">Name</TableCell>
              <TableCell className="font-semibold text-gray-400">Email</TableCell>
              <TableCell className="font-semibold text-gray-400">Register</TableCell>
              <TableCell className="font-semibold text-gray-400">Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map((u) => (
                <TableRow key={u.id} className="hover:shadow-md">
                  <TableCell className="text-gray-400">{u.id}</TableCell>
                  <TableCell className="font-semibold text-black">{u.name}</TableCell>
                  <TableCell className="text-gray-400">{u.email}</TableCell>
                  <TableCell className="text-gray-400">{u.register}</TableCell>
                  <TableCell className="cursor-pointer text-primary" onClick={() => dispatch(setCurrentTab({ name: 'viewUser', data: u }))}>View more</TableCell>
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
