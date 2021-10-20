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
  Visibility,
} from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import Search from '../../assets/Search.svg';

export default function Admins() {
  const { admin: { admins } } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <Grid container rowSpacing={8} columnSpacing={8}>
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
            <Button variant="contained" className="w-full h-full px-3 md:w-40 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'addAdmin', data: null }))}>Add Admins</Button>
          </div>
          <TableContainer className="w-full max-h-full bg-white mt-14 md:mt-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold text-gray-400">ID</TableCell>
                  <TableCell className="text-lg font-semibold text-gray-400">Admin Email</TableCell>
                  <TableCell className="font-semibold text-gray-400">Status</TableCell>
                  <TableCell className="font-semibold text-center text-gray-400">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  admins.map((admin) => (
                    <TableRow key={admin} className="hover:shadow-md">
                      <TableCell className="text-gray-400">{admin.id}</TableCell>
                      <TableCell className="text-lg font-semibold text-black">{admin.email}</TableCell>
                      <TableCell className="text-gray-600">
                        <select className="w-24 min-w-full p-2 bg-gray-200">
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </TableCell>
                      <TableCell className="text-center">
                        <IconButton><Visibility onClick={() => dispatch(setCurrentTab({ name: 'editAdmin', data: admin }))} /></IconButton>
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
      <Grid item xs={12} md={6} className="flex flex-col gap-9">
        <Typography className="text-3xl text-gray-400" style={{ minHeight: '38px' }}>About Us</Typography>
        <Card elevation={1} className="flex flex-col gap-12 px-3 pb-14 md:px-14">
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
