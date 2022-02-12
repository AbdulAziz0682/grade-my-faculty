import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@apollo/client';

import FacultyProfile from './FacultyProfile';
import { ABOUT_US } from '../../../../graphqlQueries';

export default function AboutUs() {
  const list = [
    {
      name: 'Utsho',
      facebookLink: 'https://www.facebook.com/utsho1214',
      instagramLink: 'https://www.instagram.com/tef.utsho/',
      linkedinLink: 'https://www.linkedin.com/in/tasnim-ferdaous/',
    },
    {
      name: 'Sakib',
      facebookLink: 'https://www.facebook.com/sakibbzz/',
      instagramLink: 'https://www.instagram.com/sakibbzz/',
      linkedinLink: 'https://www.linkedin.com/in/sadmansakibrabbani/',
    },
  ];
  const { loading, data } = useQuery(ABOUT_US);
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center mt-16"><CircularProgress /></div>;
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl">
        <Grid container direction="column" className="pt-16 pb-28 md:pb-60" rowGap={5}>
          <Grid item>
            <Typography variant="h2" align="center"> About Us </Typography>
          </Grid>
          <Grid item className="flex items-center justify-center">
            <Card className="w-full p-6 md:w-5/6 lg:w-7/12 md:p-8">
              <Typography variant="h4" align="center" className="mb-3">Who we are?</Typography>
              <Typography variant="body1">
                { !loading && data.aboutUs.whoWeAre }
              </Typography>
            </Card>
          </Grid>
          <Grid item className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <Card className="w-full p-3 mx-auto flexm md:w-5/6 lg:w-7/12">
              <Grid container rowSpacing={2}>
                {
                  list.map((item) => (
                    <Grid item xs={6} className="flex flex-col items-center">
                      <FacultyProfile faculty={item} />
                    </Grid>
                  ))
                }
              </Grid>
            </Card>
          </Grid>
          <Grid item className="flex items-center justify-center">
            <Card className="w-full p-6 md:w-5/6 lg:w-7/12 md:p-8">
              <Typography variant="h4" align="center" className="mb-3">Our Story</Typography>
              <Typography variant="body1">
                { !loading && data.aboutUs.ourStory }
              </Typography>
            </Card>
          </Grid>
          <Grid item className="flex items-center justify-center">
            <Card className="w-full p-6 md:w-5/6 lg:w-7/12 md:p-8">
              <Typography variant="h4" align="center" className="mb-3">Our Mission</Typography>
              <Typography variant="body1">
                GMF was founded on the belief that peer reviews should be
                publicly available for students.
                <br />
                We believe having access to peer reviews is essential for
                every students academic success to help navigate through their academic journey.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
