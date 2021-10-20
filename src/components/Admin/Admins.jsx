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
  Grid,
  Card,
  Switch,
} from '@mui/material';

import {
  ChevronLeft,
  ChevronRight,
  DeleteForever,
} from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import Search from '../../assets/Search.svg';

export default function Admins() {
  const { admin: { admins } } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      <Grid item xs={12} md={6}>
        <div className="flex flex-col w-full gap-9">
          <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
            <Typography className="ml-16 text-3xl text-gray-400">Admins</Typography>
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
            <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'addAdmin', data: null }))}>Add Admins</Button>
          </div>
          <TableContainer className="w-full max-h-full bg-white md:mt-0 mt-14">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold text-gray-400">ID</TableCell>
                  <TableCell className="text-lg font-semibold text-gray-400">Name</TableCell>
                  <TableCell className="font-semibold text-gray-400">Email</TableCell>
                  <TableCell className="font-semibold text-gray-400">Register</TableCell>
                  <TableCell className="font-semibold text-center text-gray-400">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  admins.map((admin) => (
                    <TableRow key={admin.id} className="hover:shadow-md">
                      <TableCell className="text-gray-400">{admin.id}</TableCell>
                      <TableCell className="text-lg font-semibold text-black cursor-pointer" onClick={() => dispatch(setCurrentTab({ name: 'editAdmin', data: admin }))}>{admin.name}</TableCell>
                      <TableCell className="text-gray-400">{admin.email}</TableCell>
                      <TableCell className="text-gray-400">{admin.register}</TableCell>
                      <TableCell className="text-center">
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
      </Grid>
      <Grid item xs={12} md={6}>
        <Card elevation={1} className="flex flex-col gap-12 pb-14 px-14">
          <Typography className="text-3xl text-gray-400">About Us</Typography>
          <TextField
            variant="standard"
            label="Our Story"
            className="w-full"
          />
          <TextField
            variant="standard"
            label="Who we are?"
            className="w-full"
          />
          <Switch
            defaultChecked
          />
        </Card>
      </Grid>
    </Grid>
  );
}
