import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import FacultyProfile from './FacultyProfile';

export default function AboutUs() {
  return (
    <Grid container className="bg-pageBg flex-grow">
      <Container>
        <Grid container direction="column" className="pt-16 pb-28 md:pb-60" rowGap={5}>
          <Grid item>
            <Typography variant="h2" align="center"> About Us </Typography>
          </Grid>
          <Grid item className="flex items-center justify-center">
            <Card className="w-full md:w-5/6 lg:w-7/12 p-6 md:p-8">
              <Typography variant="h4" align="center" className="mb-3">Who we are?</Typography>
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
          <Grid item className="flex flex-col gap-2 md:flex-row items-center justify-between">
            <Card className="w-full md:w-14 h-14 flex items-center justify-center">
              <ArrowBack className="h-12 w-12 text-primary" />
            </Card>
            <Card className="w-full md:w-5/6 lg:w-7/12 p-3 flex">
              <Grid container rowSpacing={2}>
                <Grid item xs={12} md={4} className="flex flex-col items-center">
                  <FacultyProfile />
                </Grid>
                <Grid item xs={12} md={4} className="flex flex-col items-center">
                  <FacultyProfile />
                </Grid>
                <Grid item xs={12} md={4} className="flex flex-col items-center">
                  <FacultyProfile />
                </Grid>
              </Grid>
            </Card>
            <Card className="w-full md:w-14 h-14 flex items-center justify-center">
              <ArrowForward className="h-12 w-12 text-primary" />
            </Card>
          </Grid>
          <Grid item className="flex items-center justify-center">
            <Card className="w-full md:w-5/6 lg:w-7/12 p-6 md:p-8">
              <Typography variant="h4" align="center" className="mb-3">Our Story</Typography>
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
          <Grid item className="flex items-center justify-center">
            <Card className="w-full md:w-5/6 lg:w-7/12 p-6 md:p-8">
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
