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

export default function Blogs() {
  const { admin: { blogs } } = useSelector((state) => state);
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:flex-row md:items-center">
        <Typography className="text-4xl">Blogs</Typography>
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
        <Button variant="contained" className="h-full px-9">Add Blogs</Button>
      </div>
      <TableContainer component={Paper} className="w-full">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Register</TableCell>
              <TableCell>Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.id}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.register}</TableCell>
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
