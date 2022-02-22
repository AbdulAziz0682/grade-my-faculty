/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Typography,
  CircularProgress,
} from '@mui/material';

import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { USER_SAVED_FACULTIES } from '../../../graphqlQueries';

import SavedFacultyCard from './SaveFacultyCard';

export default function SavedProfessors() {
  const user = useSelector((state) => state.account.user);
  if (!user) return <Redirect push to="/login" />;
  const { loading, data } = useQuery(USER_SAVED_FACULTIES, { variables: { faculties: user.savedFaculties || [] }, fetchPolicy: 'network-only' });
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center mt-16"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3 mt-3">
      {
        data.faculties.length === 0 && <Typography variant="h6" color="primary" align="center">No saved faculties yet</Typography>
      }
      {
        data.faculties.map((faculty) => (
          <SavedFacultyCard faculty={faculty} key={faculty._id} />
        ))
      }
    </div>
  );
}
