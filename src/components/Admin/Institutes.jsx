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

export default function Institutes() {
  const { admin: { institutes } } = useSelector((state) => state);
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:flex-row md:items-center">
        <Typography className="text-4xl">Institutes</Typography>
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
        <Button variant="contained" className="h-full px-9">Add Institutes</Button>
      </div>
      <TableContainer component={Paper} className="w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Register</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              institutes.map((inst) => (
                <TableRow key={inst.id}>
                  <TableCell>{inst.id}</TableCell>
                  <TableCell>{inst.name}</TableCell>
                  <TableCell>{inst.email}</TableCell>
                  <TableCell>{inst.register}</TableCell>
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
