import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';

import { ArrowBack, ArrowForward } from '@mui/icons-material';

import { useQuery } from '@apollo/client';

import FacultyProfile from './FacultyProfile';
import { ABOUT_US } from '../../../../graphqlQueries';

export default function AboutUs() {
  const { loading, data } = useQuery(ABOUT_US);
  const list1 = [
    { name: 'Abdul Kalam' },
    { name: 'Abdul Salam' },
    { name: 'Shaikh Saadi' },
  ];
  const list2 = [
    { name: 'Muhammad Saleem' },
    { name: 'Abdul Aleem' },
    { name: 'Abdul Kalam' },
  ];
  const [list, setList] = React.useState(list1);
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
            <Card className="flex items-center justify-center w-full cursor-pointer md:w-14 h-14 hover:bg-gray-100">
              <ArrowBack onClick={() => setList(list1)} className="w-12 h-12 text-primary" />
            </Card>
            <Card className="flex w-full p-3 md:w-5/6 lg:w-7/12">
              <Grid container rowSpacing={2}>
                {
                  list.map((item) => (
                    <Grid item xs={12} md={4} className="flex flex-col items-center">
                      <FacultyProfile faculty={item} />
                    </Grid>
                  ))
                }
              </Grid>
            </Card>
            <Card className="flex items-center justify-center w-full cursor-pointer md:w-14 h-14 hover:bg-gray-100">
              <ArrowForward onClick={() => setList(list2)} className="w-12 h-12 text-primary" />
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla
                pariatur.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
