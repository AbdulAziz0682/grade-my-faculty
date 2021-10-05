import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import FaqCard from './FaqCard';

import teachers from '../../../assets/teachers.svg';
import students from '../../../assets/students.svg';
import conversations from '../../../assets/conversations.svg';
import legals from '../../../assets/legals.svg';

export default function AboutUs() {
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container>
        <Grid container direction="column" className="pt-16 pb-60">
          <Grid item className="w-full">
            <Typography variant="h1" align="center"> FAQ&apos;s </Typography>
          </Grid>
          <Grid item className="flex flex-wrap w-full gap-16 mt-8 justify-center">
            <FaqCard image={students} title="Students" />
            <FaqCard image={teachers} title="Teachers" />
            <FaqCard image={conversations} title="General" />
            <FaqCard image={legals} title="Legals" />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
