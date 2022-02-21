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
  const [isViewAll, setViewAll] = useState(false);
  const { loading, data } = useQuery(
    FACULTIES_BY_INSTITUTE,
    { variables: { institute: state[0]._id, limit: isViewAll ? undefined : 4 }, fetchPolicy: 'network-only' },
  );
  return (
    <Grid container className="flex-grow">
      <Container maxWidth="xl" className="flex flex-col py-14">
        <Typography variant="h3" className="text-primary">{state[0].name}</Typography>
        <Paper elevation={2} className="flex flex-col w-full gap-3 p-6 mt-6 rounded-2xl bg-gray-50">
          <div className="flex justify-between w-full gap-3 py-2 border-b-4 border-primary">
            <Typography className="font-bold text-primary">Faculty Members</Typography>
            {
              // if limit 4 returns less than 4 records it means there are not more than 4
              // in such case hidding the button is more suitable
              data?.faculties.length >= 4 && (
                <Button variant="contained" className="rounded-2xl" hidden={isViewAll} onClick={() => setViewAll(!isViewAll)}>View all Faculty</Button>
              )
            }
          </div>
          <div className="flex flex-wrap justify-center w-full py-2 gap-9">
            {
              loading && (
                <span className="inset-x-0 flex justify-center"><CircularProgress /></span>
              )
            }
            {
              data?.faculties.length === 0 && <Typography variant="h6" color="primary" align="center">No Faculty added yet</Typography>
            }
            {
              data && data.faculties.map(
                (fac) => <FacultyCard key={fac.id} faculty={fac} />,
              )
            }
          </div>
        </Paper>
      </Container>
    </Grid>
  );
}
