import React from 'react';

import {
  Grid,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

// import { useSelector } from 'react-redux';

import like from '../../../../assets/like.svg';
import unlike from '../../../../assets/unlike.svg';
import media2 from '../../../../assets/media2.png';

export default function Grade() {
  const history = useHistory();
  const faculty = history.location.state[0];
  return (
    <Grid container className="flex-grow w-full">
      <Container maxWidth="xl" className="flex flex-col justify-between md:flex-row md:gap-9">
        <div className="flex flex-col w-full lg:w-9/12 py-14">
          <Typography variant="h3">{faculty.university}</Typography>
          <Typography variant="body1" className="font-bold">Dhaka, Bangladesh</Typography>
          <Paper elevation={2} className="flex flex-col gap-2 p-4 mt-6 rounded-2xl lg:px-16 lg:pt-8 lg:pb-20 bg-gray-50">
            <Typography className="text-3xl font-bold text-primary">{faculty.name}</Typography>
            <Typography className="font-bold">{faculty.university}</Typography>
            <Typography>
              {faculty.department}
              &nbsp;Department
            </Typography>
            <Typography>
              Courses:
              { faculty.courses.map(
                (course) => (
                  <span>
                    &nbsp;
                    {course}
                    ,
                  </span>
                ),
              )}
              &nbsp;
              and so on.
            </Typography>
            <div className="flex flex-col">
              <div className="flex items-end gap-3">
                <Typography className="w-3/12 text-4xl font-extrabold text-center">
                  {faculty.performance}
                  %
                </Typography>
                <Typography className="w-3/12 text-4xl font-extrabold text-center">
                  {faculty.levelOfDifficulty}
                </Typography>
                <Typography className="w-6/12 font-extrabold text-center text-7xl">
                  {faculty.grade}
                </Typography>
              </div>
              <div className="flex gap-3">
                <Typography className="w-3/12 mt-2 text-xs text-center">Would take again</Typography>
                <Typography className="w-3/12 mt-2 text-xs text-center">Level of difficulty</Typography>
                <Typography className="w-6/12 mt-2 text-xs text-center">
                  Based on&nbsp;
                  {faculty.reviews}
                  &nbsp;students
                  <br />
                  evaluations
                </Typography>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <div className="w-1/2">
                <Typography className="mb-12 text-3xl font-semibold">Attributes</Typography>
                <div className="flex flex-wrap justify-between gap-3 w-72">
                  {
                    faculty.attributes.map((attr) => (
                      <Chip variant="filled" label={attr} sx={{ minWidth: '95px' }} />
                    ))
                  }
                </div>
              </div>
              <div className="flex justify-center w-1/2">
                <Button variant="contained" className="py-6 rounded-full h-9" onClick={() => history.push('/grading', [faculty])}>Grade this faculty</Button>
              </div>
            </div>
          </Paper>
          <Paper elevation={2} className="flex flex-col gap-6 p-4 px-4 mt-24 rounded-2xl lg:px-16 lg:pt-8 lg:pb-5 bg-gray-50">
            <Typography className="py-2 text-4xl font-bold border-b-2 border-black">Evaluations</Typography>
            {
              [1, 2, 3].map(
                () => (
                  <Grid container>
                    <Grid item xs={12} sm={3} className="flex flex-row p-3 bg-primary md:flex-col">
                      <Typography className="self-center w-full text-3xl font-semibold text-center text-white">A</Typography>
                      <span className="flex-grow" />
                      <Typography className="self-center text-3xl font-semibold text-center text-white w-min">
                        3.5
                      </Typography>
                      <Typography className="w-full text-center text-white md:text-xs">Level of Difficulty</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9} className="flex flex-col gap-4 pb-3 bg-white pt-9 px-9">
                      <div className="flex justify-between w-full gap-2 px-8">
                        <Typography className="font-medium text-gray-500">Date of grading</Typography>
                        <Typography className="font-medium text-gray-500">Course Code</Typography>
                      </div>
                      <Typography className="text-lg">
                        Lorem ipsum dolor sit amet, äonsectetur adipiscing elit,
                        sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam
                      </Typography>
                      <div className="flex flex-wrap w-full gap-4 mt-12">
                        <Chip variant="filled" label="Top Tag" sx={{ minWidth: '9rem', fontSize: '11px', color: 'gray' }} />
                        <Chip variant="filled" label="Top Tag" sx={{ minWidth: '9rem', fontSize: '11px', color: 'gray' }} />
                        <Chip variant="filled" label="Top Tag" sx={{ minWidth: '9rem', fontSize: '11px', color: 'gray' }} />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <img src={like} alt="like" className="w-4" />
                        <img src={unlike} alt="unlike" className="w-4" />
                        <span className="flex-grow" />
                        <Typography variant="caption" color="error">Report this Rating</Typography>
                      </div>
                    </Grid>
                  </Grid>
                ),
              )
            }
            <div className="flex justify-end pt-6 mt-8 border-t-2 border-black">
              <Button variant="contained" className="px-6 rounded-lg">Load More</Button>
            </div>
          </Paper>
        </div>
        <div className="flex flex-col h-auto gap-10 lg:w-2/12 py-14">
          <Typography variant="h4">Our Blog</Typography>
          {
            [1, 2, 3].map(
              () => (
                <div className="flex flex-col w-full gap-4">
                  <img src={media2} alt="blog" className="w-auto" />
                  <Typography className="text-sm text-gray-500">Course Item</Typography>
                  <Typography variant="h3">Content writer</Typography>
                  <Typography className="text-sm text-gray-500">Slate helps you see how many more days.</Typography>
                  <Typography>
                    <span className="text-gray-600">Full Time</span>
                    <span className="text-gray-600">1 July 2019</span>
                  </Typography>
                  <Typography className="text-sm text-primary">View more</Typography>
                </div>
              ),
            )
          }
        </div>
      </Container>
    </Grid>
  );
}
