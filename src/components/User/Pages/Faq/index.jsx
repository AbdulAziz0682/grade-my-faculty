import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useHistory } from 'react-router-dom';

import FaqCard from './FaqCard';

import teachers from '../../../../assets/teachers.svg';
import students from '../../../../assets/students.svg';
import conversations from '../../../../assets/conversations.svg';
import legals from '../../../../assets/legals.svg';

export default function Faq() {
  const history = useHistory();
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container>
        <Grid container direction="column" className="pt-16 pb-60">
          <Grid item className="w-full">
            <Typography variant="h1" align="center"> FAQ&apos;s </Typography>
          </Grid>
          <Grid item className="flex flex-wrap justify-center w-full gap-16 mt-8">
            <div aria-hidden onClick={() => history.push('/studentsFaq')}><FaqCard image={students} title="Students" /></div>
            <div aria-hidden onClick={() => history.push('/teachersFaq')}><FaqCard image={teachers} title="Teachers" /></div>
            <div aria-hidden onClick={() => history.push('/studentsFaq')}><FaqCard image={conversations} title="General" /></div>
            <div aria-hidden onClick={() => history.push('/studentsFaq')}><FaqCard image={legals} title="Legals" /></div>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
