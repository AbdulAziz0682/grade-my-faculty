import React from 'react';

import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import { useSelector } from 'react-redux';

export default function Users() {
  const { admin: { users } } = useSelector((state) => state);
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:flex-row md:items-center">
        <Typography className="text-4xl">Users</Typography>
        <div className="flex-grow" />
        <TextField
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" className="h-full px-9">Add Users</Button>
      </div>
      <TableContainer component={Paper} className="w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Register</TableCell>
              <TableCell>Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.register}</TableCell>
                  <TableCell className="text-primary">View more</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
