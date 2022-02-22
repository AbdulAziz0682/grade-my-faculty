/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Typography,
  CircularProgress,
} from '@mui/material';

import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { USER_RATINGS } from '../../../graphqlQueries';

import RatingCard from './RatingCard';

export default function Ratings() {
  const user = useSelector((state) => state.account.user);
  const { loading, data } = useQuery(USER_RATINGS, { variables: { id: user?._id || -1 }, fetchPolicy: 'cache-and-network' });
  if (!user) return <Redirect push to="/login" />;
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center mt-16"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3 mt-3">
      {
        data?.ratings.length === 0 && <Typography variant="h6" color="primary" align="center">No ratings yet</Typography>
      }
      { /* The following component calculates difficulty levels and
           average ratings on semester, course and faculty */
        data?.ratings.map((rating) => (
          <RatingCard key={rating._id} rating={rating} />
        ))
      }
    </div>
  );
}
