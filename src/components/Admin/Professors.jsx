/* eslint-disable no-underscore-dangle */
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
  CircularProgress,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { useQuery } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import Search from '../../assets/Search.svg';

import { FACULTIES } from '../../graphqlQueries';

export default function Professors() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, data } = useQuery(FACULTIES);
  return (
    <div className="flex flex-col w-full gap-9">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Professors</Typography>
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
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'addProfessor', data: null }))}>Add professors</Button>
      </div>
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
          {
            !loading && data && (
              <TableBody>
                {
                  data?.faculties.filter(
                    (faculty) => faculty.firstName.toLowerCase().includes(searchValue),
                  ).map((faculty) => (
                    <TableRow key={faculty.id} className="hover:shadow-md">
                      <TableCell className="m-3 leading-9 text-gray-400">{faculty._id}</TableCell>
                      <TableCell className="text-lg font-semibold text-black">{faculty.firstName}</TableCell>
                      <TableCell className="leading-9 text-gray-400">{faculty.email}</TableCell>
                      <TableCell className="leading-9 text-gray-400">
                        {
                          data.institutes.find(
                            (i) => i._id === faculty.institute,
                          ).name
                        }
                      </TableCell>
                      <TableCell className="cursor-pointer text-primary" onClick={() => dispatch(setCurrentTab({ name: 'viewProfessor', data: { ...faculty, institute: Number(faculty.institute) } }))}>View more</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            )
          }
          {
            loading && <div className="absolute inset-x-0 flex items-center justify-center"><CircularProgress /></div>
          }
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
