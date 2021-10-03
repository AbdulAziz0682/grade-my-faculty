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
    <div className="flex-grow bg-pageBg">
      <Container>
        <Grid container direction="column" className="py-16">
          <Grid item>
            <Typography variant="h1" align="center"> FAQ&apos;s </Typography>
          </Grid>
          <Grid item className="flex flex-wrap gap-16 mt-8 justify-center">
            <FaqCard image={students} title="Students" />
            <FaqCard image={teachers} title="Teachers" />
            <FaqCard image={conversations} title="Conversations" />
            <FaqCard image={legals} title="Legals" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
