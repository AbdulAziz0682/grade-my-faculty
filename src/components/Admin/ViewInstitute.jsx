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
  CircularProgress,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { useQuery, useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';
import { addToast } from '../../redux/toastsActions';

import { FACULTIES_BY_INSTITUTE, DELETE_INSTITUTE, INSTITUTES } from '../../graphqlQueries';

import Search from '../../assets/Search.svg';

export default function viewInstitute({ institute }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, data } = useQuery(
    FACULTIES_BY_INSTITUTE,
    { variables: { institute: Number(institute._id) } },
  );
  const [deleteInstitue, deleteMutation] = useMutation(
    DELETE_INSTITUTE,
    { refetchQueries: [{ query: INSTITUTES }, { query: FACULTIES_BY_INSTITUTE }] },
  );
  function handleDelete() {
    deleteInstitue({ variables: { id: Number(institute._id) } })
      .then(() => dispatch(addToast({ message: 'Institute deleted successfully', severity: 'success' })))
      .catch((e) => dispatch(addToast({ message: e.message, severity: 'error' })));
    dispatch(setCurrentTab({ name: 'institutes', data: null }));
  }
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">{`${institute._id} - ${institute.name}`}</Typography>
        <div className="flex-grow" />
        <Button variant="contained" onClick={() => handleDelete()} disabled={deleteMutation.loading} color="error" className="h-full px-9 shadow-redGlow">
          {
            deleteMutation.loading
              ? <CircularProgress />
              : 'Delete Institute'
          }
        </Button>
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
                                institute.name
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
