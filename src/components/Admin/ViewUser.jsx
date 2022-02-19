/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
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
  DELETE_USER, ADMIN_USERS, ADMIN_USER_RATINGS, DELETE_RATING,
} from '../../graphqlQueries';

export default function ViewUser({ user }) {
  const dispatch = useDispatch();
  const [offset, setOffset] = React.useState(0);
  const { data, loading } = useQuery(
    ADMIN_USER_RATINGS,
    {
      fetchPolicy: 'cache-and-network',
      variables: { user: user._id, offset, limit: 10 },
    },
  );
  function nextPage() {
    if (data && offset < data?.ratings.length) {
      setOffset((off) => off + 10);
    }
  }
  function prevPage() {
    if (data && offset > 0) {
      setOffset((off) => off - 10);
    }
  }
  const [deleteUser, deleteMutation] = useMutation(
    DELETE_USER,
    { refetchQueries: [{ query: ADMIN_USERS }] },
  );
  const [deleteRating, ratingQuery] = useMutation(
    DELETE_RATING,
    { refetchQueries: [{ query: ADMIN_USER_RATINGS }, { query: ADMIN_USERS }] },
  );
  function handleDelete() {
    deleteUser({ variables: { id: Number(user._id) } })
      .then(() => {
        dispatch(addToast({ message: 'Deleted User successfully', severity: 'success' }));
        dispatch(setCurrentTab({ name: 'users', data: null }));
      })
      .catch((error) => dispatch(addToast({ message: error.message, severity: 'error' })));
  }
  function handleRatingDelete(id) {
    deleteRating({ variables: { id: Number(id) } })
      .then(() => {
        dispatch(addToast({ message: 'Deleted rating successfully', severity: 'success' }));
        dispatch(setCurrentTab({ name: 'users', data: null }));
      })
      .catch((error) => dispatch(addToast({ message: error.message, severity: 'error' })));
  }
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">{`${user._id} - ${user.firstName} ${user.lastName}`}</Typography>
        <div className="flex-grow" />
        <Button variant="contained" disabled={deleteMutation.loading} onClick={() => handleDelete()} color="error" className="h-full px-9 shadow-redGlow">
          {
            deleteMutation.loading
              ? <CircularProgress />
              : 'Delete User'
          }
        </Button>
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'editUser', data: user }))}>Edit User</Button>
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
                    { rating.faculty.institute.name }
                  </Typography>
                </div>
                <div className="flex mt-3 gap-9">
                  <Typography className="text-sm text-gray-500">{rating.course}</Typography>
                  <Typography className="text-sm font-medium text-gray-700">{moment(rating.createdAt).format('MMMM DD, YYYY')}</Typography>
                </div>
                <div className="flex justify-between gap-3 mt-9">
                  <Typography className="text-sm font-medium text-gray-700">
                    {
                      rating.faculty.firstName
                    }
                  </Typography>
                  <Button variant="contained" disabled={ratingQuery.loading} color="error" className="px-9 shadow-redGlow" onClick={() => handleRatingDelete(rating._id)}>
                    Delete
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
        <IconButton className={`rounded-none shadow-lg ${(offset + 10) >= data?.ratings.length ? 'bg-gray-400' : 'bg-primary'}`} onClick={() => nextPage()}>
          <ChevronRight className="w-10 h-10" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}

ViewUser.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
