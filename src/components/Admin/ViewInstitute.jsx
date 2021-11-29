/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Button,
  Card,
  IconButton,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import Search from '../../assets/Search.svg';

export default function viewInstitute({ institute }) {
  const dispatch = useDispatch();
  const profs = useSelector(
    (state) => state.admin.professors.filter(
      (prof) => prof.university.toLowerCase() === institute.name.toLowerCase(),
    ),
  );
  const [list, setList] = React.useState(profs);
  const [searchValue, setSearchValue] = React.useState('');
  React.useEffect(() => {
    setList(profs.filter((p) => p.firstName.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue]);
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">{`${institute._id} - ${institute.name}`}</Typography>
        <div className="flex-grow" />
        <Button variant="contained" color="error" className="h-full px-9 shadow-redGlow">Delete Institute</Button>
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'editInstitute', data: institute }))}>Edit Institute</Button>
      </div>
      <Card className="flex flex-col w-full gap-6 px-4 py-5 md:py-10 md:px-8" elevation={6}>
        <div className="flex flex-col">
          <div className="flex items-center justify-items-end">
            <Typography className="text-3xl text-gray-400">Professors</Typography>
            <div className="flex-grow" />
            <TextField
              variant="outlined"
              size="small"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={Search} alt="search icon" className="h-9" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TableContainer className="w-full max-h-full bg-white mt-14 md:mt-0">
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
                    list.map((prof) => (
                      <TableRow key={prof.id} className="hover:shadow-md">
                        <TableCell className="leading-9 text-gray-400">{prof.id}</TableCell>
                        <TableCell className="text-lg font-semibold text-black">{prof.firstName}</TableCell>
                        <TableCell className="leading-9 text-gray-400">{prof.email}</TableCell>
                        <TableCell className="leading-9 text-gray-400">{prof.university}</TableCell>
                        <TableCell className="cursor-pointer text-primary" onClick={() => dispatch(setCurrentTab({ name: 'viewProfessor', data: prof }))}>View</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Card>
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

viewInstitute.propTypes = {
  institute: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    courses: PropTypes.array.isRequired,
    faculties: PropTypes.array.isRequired,
  }).isRequired,
};
