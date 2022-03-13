/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@mui/material/Icon';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { useQuery } from '@apollo/client';

import TeamMember from './TeamMember';
import { ABOUT_US_AND_MEMBERS } from '../../../../graphqlQueries';

import arrowLeft from '../../../../assets/arrow-left.svg';
import arrowRight from '../../../../assets/arrow-right.svg';

export default function AboutUs() {
  const { loading, data } = useQuery(ABOUT_US_AND_MEMBERS, { fetchPolicy: 'cache-and-network' });
  const [activeIndex, setActiveIndex] = useState(0);
  function handlePrevious(list) {
    let prevIndex = activeIndex - 1;
    if (prevIndex < 0) {
      prevIndex = list.length - 1;
    }
    setActiveIndex(() => prevIndex);
  }
  function handleNext(list) {
    let nextIndex = activeIndex + 1;
    if (nextIndex >= list.length) {
      nextIndex = 0;
    }
    setActiveIndex(() => nextIndex);
  }
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
          <Grid item className="flex flex-wrap items-center justify-between w-full gap-2">
            <Card className="flex w-full h-auto cursor-pointer md:w-auto" onClick={() => handlePrevious(data.members)}>
              <Icon className="flex w-12 h-12 p-2 mx-auto">
                <img src={arrowLeft} alt="arrow left" className="w-full" />
              </Icon>
            </Card>
            <Card className="relative flex w-full p-3 mx-auto md:w-5/6 lg:w-7/12">
              <AliceCarousel
                autoPlay
                mouseTracking
                activeIndex={activeIndex}
                disableButtonsControls
                disableDotsControls
                infinite
                onSlideChange={(e) => setActiveIndex(e.item)}
                animationDuration={4000}
                responsive={{
                  0: { items: 1 },
                  600: { items: 2 },
                  900: { items: 3 },
                }}
                items={
                  data.members.map((item) => (
                    <div className="flex flex-col items-center mx-auto">
                      <TeamMember key={item._id} member={item} />
                    </div>
                  ))
                }
              />
            </Card>
            <Card className="flex w-full h-auto cursor-pointer md:w-auto" onClick={() => handleNext(data.members)}>
              <Icon className="flex w-12 h-12 p-2 mx-auto">
                <img src={arrowRight} alt="arrow left" className="w-full" />
              </Icon>
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
                {data.aboutUs.ourMission}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
