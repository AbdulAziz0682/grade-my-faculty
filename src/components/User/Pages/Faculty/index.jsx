import React, { useState } from 'react';

import {
  Grid,
  Container,
  Typography,
  Paper,
  Button,
} from '@mui/material';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import FacultyCard from './FacultyCard';

export default function Faculty() {
  let { faculty } = useSelector((state) => state);
  const { location: { state } } = useHistory();
  faculty = faculty.filter(
    (fac) => fac.university.toLowerCase().startsWith(state[0].toLowerCase()),
  );
  const [isViewAll, setViewAll] = useState(false);
  return (
    <Grid container className="flex-grow">
      <Container className="flex flex-col py-14">
        <Typography variant="h3" className="text-primary">{state[0]}</Typography>
        <p className="w-full text-lg font-bold text-primary">Dhaka, Bangladesh</p>
        <Paper elevation={2} className="flex flex-col w-full gap-3 p-6 mt-6 rounded-2xl bg-gray-50">
          <div className="flex justify-between w-full gap-3 py-2 border-b-4 border-primary">
            <Typography className="font-bold text-primary">Top Faculty</Typography>
            <Button variant="contained" className="rounded-2xl" hidden={isViewAll} onClick={() => setViewAll(!isViewAll)}>View all Faculty</Button>
          </div>
          <div className="flex flex-wrap justify-center w-full py-2 gap-9">
            { !isViewAll
              ? (
                <>
                  <FacultyCard faculty={faculty[0]} />
                  <FacultyCard faculty={faculty[1]} />
                  <FacultyCard faculty={faculty[2]} />
                  <FacultyCard faculty={faculty[3]} />
                </>
              )
              : (
                <>
                  {faculty.map((fac) => <FacultyCard key={fac.id} faculty={fac} />)}
                </>
              )}
          </div>
          <div className="w-full py-2 border-t-2 border-primary">
            <Typography className="uppercase text-primary">
              <span className="font-bold">4.1</span>
              &nbsp; Average faculty ratings
            </Typography>
          </div>
        </Paper>
      </Container>
    </Grid>
  );
}
