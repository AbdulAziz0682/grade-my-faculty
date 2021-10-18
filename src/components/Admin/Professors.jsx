import React from 'react';

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

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import Search from '../../assets/Search.svg';

export default function Professors() {
  const { admin: { professors } } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-full gap-9">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Professors</Typography>
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
        <Button variant="contained" className="h-full px-9" onClick={() => dispatch(setCurrentTab({ name: 'addProfessor', data: null }))}>Add professors</Button>
      </div>
      <TableContainer className="w-full max-h-full bg-white">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold leading-9 text-gray-400">ID</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Name</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Email</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">University</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              professors.map((prof) => (
                <TableRow key={prof.id} className="hover:shadow-md">
                  <TableCell className="leading-9 text-gray-400">{prof.id}</TableCell>
                  <TableCell className="text-lg font-semibold text-black">{prof.name}</TableCell>
                  <TableCell className="leading-9 text-gray-400">{prof.email}</TableCell>
                  <TableCell className="leading-9 text-gray-400">{prof.university}</TableCell>
                  <TableCell className="cursor-pointer text-primary" onClick={() => dispatch(setCurrentTab({ name: 'viewProfessor', data: prof }))}>View</TableCell>
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
