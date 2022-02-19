/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Button,
  Card,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import moment from 'moment';

import { useMutation, useQuery } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';
import { addToast } from '../../redux/toastsActions';

import {
  DELETE_FACULTY,
  ADMIN_FACULTIES,
  ADMIN_FACULTY_RATINGS,
  RATINGS,
  DELETE_RATING,
} from '../../graphqlQueries';

export default function ViewProfessor({ professor }) {
  const dispatch = useDispatch();
  const [offset, setOffset] = React.useState(0);
  const { loading, data } = useQuery(
    ADMIN_FACULTY_RATINGS,
    {
      fetchPolicy: 'cache-and-network',
      variables: { faculty: professor._id, offset: 0, limit: 10 },
    },
  );
  const [deleteFaculty, deleteFacultyMutation] = useMutation(
    DELETE_FACULTY,
    { refetchQueries: [{ query: ADMIN_FACULTIES }] },
  );
  const [deleteRating, deleteRatingMutation] = useMutation(
    DELETE_RATING,
    { refetchQueries: [{ query: RATINGS }, { query: ADMIN_FACULTY_RATINGS }] },
  );
  function handleDelete() {
    deleteFaculty({ variables: { id: Number(professor._id) } })
      .then(() => {
        dispatch(addToast({ message: 'Deleted faculty successfully', severity: 'success' }));
        dispatch(setCurrentTab({ name: 'professors', data: null }));
      })
      .catch((error) => dispatch(addToast({ message: error.message, severity: 'error' })));
  }
  function handleRatingDelete(id) {
    deleteRating({ variables: { id: Number(id) } })
      .then(() => {
        dispatch(addToast({ message: 'Deleted rating successfully', severity: 'success' }));
        dispatch(setCurrentTab({ name: 'professors', data: null }));
      })
      .catch((error) => dispatch(addToast({ message: error.message, severity: 'error' })));
  }
  function nextPage() {
    if (data && offset < data.allRatings) {
      setOffset((off) => off + 10);
    }
  }
  function prevPage() {
    if (data && offset > 0) {
      setOffset((off) => off - 10);
    }
  }
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">{`${professor._id} - ${professor.firstName}`}</Typography>
        <div className="flex-grow" />
        <Button variant="contained" disabled={deleteFacultyMutation.loading} onClick={() => handleDelete()} color="error" className="h-full px-9 shadow-redGlow">
          {
            loading
              ? <CircularProgress />
              : 'Delete Professor'
          }
        </Button>
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'editProfessor', data: professor }))}>Edit Professor</Button>
      </div>
      <Card className="flex flex-col w-full gap-6 px-4 py-5 md:py-10 md:px-8" elevation={6}>
        {
          data?.ratings.length === 0 && <Typography variant="h6" color="primary" align="center">No ratings yet</Typography>
        }
        {
          data?.ratings.map(
            (rating) => (
              <div className="flex flex-col w-full p-5 bg-gray-200 rounded-lg">
                <div className="flex justify-between gap-3">
                  <Typography className="text-lg font-semibold">{rating.thoughts}</Typography>
                  <Typography className="text-sm text-gray-500">
                    {
                      professor.institute.name
                    }
                  </Typography>
                </div>
                <div className="flex mt-3 gap-9">
                  <Typography className="text-sm text-gray-500">{rating.course}</Typography>
                  <Typography className="text-sm font-medium text-gray-700">{moment(rating.createdAt).format('MMMM DD, YYYY')}</Typography>
                </div>
                <div className="flex justify-between gap-3 mt-9">
                  <Typography className="text-sm font-medium text-gray-700">
                    {
                      professor.firstName
                    }
                  </Typography>
                  <Button variant="contained" disabled={deleteRatingMutation.loading} color="error" className="px-9 shadow-redGlow" onClick={() => handleRatingDelete(rating._id)}>
                    {
                      deleteRatingMutation.loading
                        ? <CircularProgress />
                        : 'Delete'
                    }
                  </Button>
                </div>
              </div>
            ),
          )
        }
      </Card>
      <div className="flex justify-end w-full gap-12 mt-16">
        <IconButton className={`rounded-none shadow-lg ${(offset - 10) < 0 ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => prevPage()}>
          <ChevronLeft className="w-10 h-10" htmlColor="white" />
        </IconButton>
        <IconButton className={`rounded-none shadow-lg ${(offset + 10) >= data?.allRatings ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => nextPage()}>
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}

ViewProfessor.propTypes = {
  professor: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    courses: PropTypes.array.isRequired,
    department: PropTypes.string.isRequired,
    institute: PropTypes.object.isRequired,
  }).isRequired,
};
