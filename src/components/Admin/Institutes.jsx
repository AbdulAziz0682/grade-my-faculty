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

import moment from 'moment';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { useQuery } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import Search from '../../assets/Search.svg';

import { ADMIN_INSTITUTES } from '../../graphqlQueries';

export default function Institutes() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');
  const [offset, setOffset] = React.useState(0);
  const { loading, data } = useQuery(
    ADMIN_INSTITUTES,
    { fetchPolicy: 'cache-and-network', variables: { offset, limit: 10, name: searchValue } },
  );
  function nextPage() {
    if (data && offset < data.allInstitutes) {
      setOffset((off) => off + 10);
    }
  }
  function prevPage() {
    if (data && offset > 0) {
      setOffset((off) => off - 10);
    }
  }
  return (
    <div className="flex flex-col w-full gap-9">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Institutes</Typography>
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
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'addInstitute', data: null }))}>Add Institutes</Button>
      </div>
      <TableContainer className="w-full max-h-full bg-white mt-14 md:mt-0">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold leading-9 text-gray-400">ID</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Name</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Email</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Register</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Reviews</TableCell>
            </TableRow>
          </TableHead>
          {
            !loading && (
              <TableBody>
                {
                  data?.institutes.map((institute) => (
                    <TableRow key={institute.id} className="hover:shadow-md">
                      <TableCell className="m-3 leading-9 text-gray-400">{institute._id}</TableCell>
                      <TableCell className="text-lg font-semibold text-black">{institute.name}</TableCell>
                      <TableCell className="leading-9 text-gray-400">{institute.email}</TableCell>
                      <TableCell className="leading-9 text-gray-400">{moment().from(institute.createdAt)}</TableCell>
                      <TableCell className="cursor-pointer text-primary" onClick={() => dispatch(setCurrentTab({ name: 'viewInstitute', data: institute }))}>View more</TableCell>
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
        <IconButton className={`rounded-none shadow-lg ${(offset - 10) < 0 ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => prevPage()}>
          <ChevronLeft className="w-10 h-10" htmlColor="white" />
        </IconButton>
        <IconButton className={`rounded-none shadow-lg ${(offset + 10) >= data?.allInstitutes ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => nextPage()}>
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
