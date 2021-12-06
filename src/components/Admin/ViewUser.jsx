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

import { useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';
import { addToast } from '../../redux/toastsActions';

import {
  DELETE_USER, USERS, RATINGS, DELETE_RATING,
} from '../../graphqlQueries';

export default function ViewUser({ user }) {
  const dispatch = useDispatch();
  const [deleteUser, { loading }] = useMutation(
    DELETE_USER,
    { refetchQueries: [{ query: USERS }] },
  );
  const [deleteRating, ratingQuery] = useMutation(
    DELETE_RATING,
    { refetchQueries: [{ query: RATINGS }, { query: USERS }] },
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
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">{`${user._id} - ${user.firstName} ${user.lastName}`}</Typography>
        <div className="flex-grow" />
        <Button variant="contained" disabled={loading} onClick={() => handleDelete()} color="error" className="h-full px-9 shadow-redGlow">
          {
            loading
              ? <CircularProgress />
              : 'Delete User'
          }
        </Button>
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'editUser', data: user }))}>Edit User</Button>
      </div>
      <Card className="flex flex-col w-full gap-6 px-4 py-5 md:py-10 md:px-8" elevation={6}>
        {
          user.ratings.length === 0 && <Typography variant="h6" color="primary" align="center">No ratings yet</Typography>
        }
        {
          user.ratings.map(
            (rating) => (
              <div className="flex flex-col w-full p-5 bg-gray-200 rounded-lg">
                <div className="flex justify-between gap-3">
                  <Typography className="text-lg font-semibold">{rating.thoughts}</Typography>
                  <Typography className="text-sm text-gray-500">
                    {
                      (() => { // IIFE
                        const fac = user.faculties.find((f) => f._id === rating.faculty);
                        if (!fac) return '';
                        const inst = user.institutes.find((i) => i._id === fac.institute);
                        if (!inst) return '';
                        return inst.name;
                      })()
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
                      user.faculties.find((f) => f._id === rating.faculty)?.firstName || ''
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

ViewUser.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    ratings: PropTypes.array.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    faculties: PropTypes.array.isRequired,
    institutes: PropTypes.array.isRequired,
  }).isRequired,
};
