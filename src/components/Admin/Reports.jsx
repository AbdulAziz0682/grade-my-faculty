/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
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

import {
  ChevronLeft, ChevronRight, Visibility, DeleteForever,
} from '@mui/icons-material';

import { useMutation, useQuery } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

import Search from '../../assets/Search.svg';

import {
  REPORTS, DELETE_REPORT,
} from '../../graphqlQueries';
import { addToast } from '../../redux/toastsActions';

export default function Reports() {
  const dispatch = useDispatch();
  const [offset, setOffset] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, data } = useQuery(REPORTS, { fetchPolicy: 'cache-and-network', variables: { offset, limit: 10, summary: searchValue } });
  const [deleteReport] = useMutation(
    DELETE_REPORT,
    { refetchQueries: [{ query: REPORTS }] },
  );
  function nextPage() {
    if (data && offset < data.allReports) {
      setOffset((off) => off + 10);
    }
  }
  function prevPage() {
    if (data && offset > 0) {
      setOffset((off) => off - 10);
    }
  }
  function hanldeReportDelete(id) {
    deleteReport({ variables: { id: Number(id) } })
      .then(() => dispatch(addToast({ message: 'Report deleted successfully', severity: 'success' })))
      .catch((e) => dispatch(addToast({ message: e.message, severity: 'error' })));
  }
  return (
    <div className="flex flex-col w-full gap-9">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center" style={{ maxHeight: '38px' }}>
        <Typography className="ml-16 text-3xl text-gray-400">Reports</Typography>
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
                <img src={Search} alt="search icon" className="h-8" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer className="w-full max-h-full bg-white mt-14 md:mt-0">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold leading-9 text-gray-400">ID</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Summary</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">User</TableCell>
              <TableCell className="font-semibold leading-9 text-gray-400">Rating ID</TableCell>
              <TableCell className="font-semibold leading-9 text-center text-gray-400">Actions</TableCell>
            </TableRow>
          </TableHead>
          {
            !loading && data && (
              <TableBody>
                {
                  data?.reports.map((r) => (
                    <TableRow key={r._id} className="hover:shadow-md">
                      <TableCell className="m-3 leading-9 text-gray-400">{r._id}</TableCell>
                      <TableCell className="text-lg font-semibold text-black">{r.summary}</TableCell>
                      <TableCell className="leading-9 text-gray-400">
                        {r.user.firstName}
                      </TableCell>
                      <TableCell className="leading-9 text-gray-400">{r.rating._id}</TableCell>
                      <TableCell className="text-center">
                        <IconButton
                          className="cursor-pointer"
                          onClick={() => {
                            dispatch(setCurrentTab(
                              {
                                name: 'viewReport',
                                data: r,
                              },
                            ));
                          }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => hanldeReportDelete(r._id)}>
                          <DeleteForever />
                        </IconButton>
                      </TableCell>
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
        <IconButton className={`rounded-none shadow-lg ${(offset + 10) >= data?.allReports ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => nextPage()}>
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
