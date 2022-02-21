import React from 'react';

import {
  Grid,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useQuery } from '@apollo/client';

import { FAQS } from '../../../../graphqlQueries';

export default function GeneralFaq() {
  const { loading, data } = useQuery(FAQS, { fetchPolicy: 'cache-and-network', variables: { category: 'general' } });
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center mt-16"><CircularProgress /></div>;
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl">
        <Grid container direction="column" className="pt-16 pb-60">
          <Grid item className="w-full">
            <Typography variant="h1" align="center"> General FAQ </Typography>
          </Grid>
          <Grid item className="w-full">
            {
              data.faqs.length === 0 && <Typography variant="h6" align="center" color="primary">No faqs added yet</Typography>
            }
            {
              data.faqs.length !== 0 && data.faqs.map((faq) => (
                <Accordion style={{ marginBottom: 0, marginTop: 0 }}>
                  <AccordionSummary className="px-3 md:px-9" expandIcon={<ExpandMoreIcon htmlColor="white" sx={{ bgcolor: 'primary.main', width: '2.5rem', height: '2.5rem' }} />}>
                    <Typography variant="h4">{faq.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="px-3 bg-gray-200 md:px-9">
                    <Typography variant="body1">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
