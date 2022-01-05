/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

import {
  Grid,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';

// import { useSelector } from 'react-redux';

import { useQuery } from '@apollo/client';

import { useHistory, Redirect } from 'react-router-dom';

import FacultyCard from './FacultyCard';

import { FACULTIES_BY_INSTITUTE } from '../../../../graphqlQueries';

export default function Faculty() {
  const { location: { state } } = useHistory();
  if (!state || !state[0]) return <Redirect push to="/" />;
  const { loading, data } = useQuery(
    FACULTIES_BY_INSTITUTE,
    { variables: { institute: Number(state[0]._id) }, fetchPolicy: 'network-only' },
  );
  const [isViewAll, setViewAll] = useState(false);
  if (loading) return <span className="absolute inset-x-0 flex justify-center mt-16"><CircularProgress /></span>;
  return (
    <Grid container className="flex-grow">
      <Container maxWidth="xl" className="flex flex-col py-14">
        <Typography variant="h3" className="text-primary">{state[0].name}</Typography>
        <p className="w-full text-lg font-bold text-primary">Dhaka, Bangladesh</p>
        <Paper elevation={2} className="flex flex-col w-full gap-3 p-6 mt-6 rounded-2xl bg-gray-50">
          <div className="flex justify-between w-full gap-3 py-2 border-b-4 border-primary">
            <Typography className="font-bold text-primary">Top Faculty</Typography>
            {
              data?.faculties.length > 0 && data?.faculties.length > 4 && <Button variant="contained" className="rounded-2xl" hidden={isViewAll} onClick={() => setViewAll(!isViewAll)}>View all Faculty</Button>
            }
          </div>
          <div className="flex flex-wrap justify-center w-full py-2 gap-9">
            {
              data?.faculties.length === 0 && <Typography variant="h6" color="primary" align="center">No Faculty added yet</Typography>
            }
            { !isViewAll && data && (data.faculties.length > 4 && data.faculties.length > 0)
              ? (
                <>
                  <FacultyCard institute={state[0]} faculty={data?.faculties[0] || {}} />
                  <FacultyCard institute={state[0]} faculty={data?.faculties[1] || {}} />
                  <FacultyCard institute={state[0]} faculty={data?.faculties[2] || {}} />
                  <FacultyCard institute={state[0]} faculty={data?.faculties[3] || {}} />
                </>
              )
              : (
                <>
                  {data && data.faculties.map(
                    (fac) => <FacultyCard institute={state[0]} key={fac.id} faculty={fac} />,
                  )}
                </>
              )}
          </div>
        </Paper>
      </Container>
    </Grid>
  );
}
