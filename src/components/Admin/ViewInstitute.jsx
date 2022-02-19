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

import {
  ADMIN_INSTITUTE_FACULTIES, DELETE_INSTITUTE, INSTITUTES,
} from '../../graphqlQueries';

import Search from '../../assets/Search.svg';

export default function viewInstitute({ institute }) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');
  const [offset, setOffset] = React.useState(0);
  const { loading, data } = useQuery(
    ADMIN_INSTITUTE_FACULTIES,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        institute: Number(institute._id),
        firstName: searchValue,
        offset,
        limit: 10,
      },
    },
  );
  const [deleteInstitue, deleteMutation] = useMutation(
    DELETE_INSTITUTE,
    { refetchQueries: [{ query: INSTITUTES }, { query: ADMIN_INSTITUTE_FACULTIES }] },
  );
  function handleDelete() {
    deleteInstitue({ variables: { id: Number(institute._id) } })
      .then(() => dispatch(addToast({ message: 'Institute deleted successfully', severity: 'success' })))
      .catch((e) => dispatch(addToast({ message: e.message, severity: 'error' })));
    dispatch(setCurrentTab({ name: 'institutes', data: null }));
  }
  function nextPage() {
    if (data && offset < data.allFaculties) {
      setOffset((off) => off + 10);
    }
  }
  function prevPage() {
    if (data && offset > 0) {
      setOffset((off) => off - 10);
    }
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
                        data?.faculties.map((faculty) => (
                          <TableRow key={faculty.id} className="hover:shadow-md">
                            <TableCell className="m-3 leading-9 text-gray-400">{faculty._id}</TableCell>
                            <TableCell className="text-lg font-semibold text-black">{faculty.firstName}</TableCell>
                            <TableCell className="leading-9 text-gray-400">{faculty.email}</TableCell>
                            <TableCell className="leading-9 text-gray-400">
                              {
                                institute.name
                              }
                            </TableCell>
                            <TableCell
                              className="cursor-pointer text-primary"
                              onClick={() => dispatch(setCurrentTab(
                                {
                                  name: 'viewProfessor',
                                  data: faculty,
                                },
                              ))}
                            >
                              View more
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
          </div>
        </div>
      </Card>
      <div className="flex justify-end w-full gap-12 mt-16">
        <IconButton className={`rounded-none shadow-lg ${(offset - 10) < 0 ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => prevPage()}>
          <ChevronLeft className="w-10 h-10" htmlColor="white" />
        </IconButton>
        <IconButton className={`rounded-none shadow-lg ${(offset + 10) >= data?.allFaculties ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => nextPage()}>
          <ChevronRight className="w-10 h-10" htmlColor="white" />
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
