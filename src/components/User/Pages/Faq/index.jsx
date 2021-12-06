import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@apollo/client';

import { useHistory } from 'react-router-dom';

import FaqCard from './FaqCard';

import { FAQS } from '../../../../graphqlQueries';

import teachers from '../../../../assets/teachers.svg';
import students from '../../../../assets/students.svg';
import conversations from '../../../../assets/conversations.svg';
import legals from '../../../../assets/legals.svg';

export default function Faq() {
  const history = useHistory();
  const { loading, data } = useQuery(FAQS);
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center mt-16"><CircularProgress /></div>;
  const studentsFaq = data.faqs.filter((f) => f.category === 'Student');
  const teachersFaq = data.faqs.filter((f) => f.category === 'Teacher');
  const generalFaq = data.faqs.filter((f) => f.category === 'General');
  const legalFaq = data.faqs.filter((f) => f.category === 'Legals');
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl">
        <Grid container direction="column" className="pt-16 pb-60">
          <Grid item className="w-full">
            <Typography variant="h1" align="center"> FAQ&apos;s </Typography>
          </Grid>
          <Grid item className="flex flex-wrap justify-center w-full gap-16 mt-8">
            <div aria-hidden onClick={() => history.push('/studentsFaq', [studentsFaq])}><FaqCard image={students} title="Students" /></div>
            <div aria-hidden onClick={() => history.push('/teachersFaq', [teachersFaq])}><FaqCard image={teachers} title="Teachers" /></div>
            <div aria-hidden onClick={() => history.push('/generalFaq', [generalFaq])}><FaqCard image={conversations} title="General" /></div>
            <div aria-hidden onClick={() => history.push('/legalFaq', [legalFaq])}><FaqCard image={legals} title="Legals" /></div>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
