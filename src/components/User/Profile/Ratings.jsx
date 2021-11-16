import React from 'react';

import {
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

export default function Ratings() {
  const savedProfs = [
    {
      name: 'John Brush',
      department: 'Mathematics',
      institute: 'North South University',
      levelOfDifficulty: 2.6,
      percent: 100,
      yourRating: 4.8,
      totalRatings: 4,
      averageRating: 3.4,
    },
    {
      name: 'John Smith',
      department: 'Mathematics',
      institute: 'North South University',
      levelOfDifficulty: 2.6,
      percent: 100,
      yourRating: 4.8,
      totalRatings: 4,
      averageRating: 3.4,
    },
    {
      name: 'John Doe',
      department: 'Mathematics',
      institute: 'North South University',
      levelOfDifficulty: 2.6,
      percent: 100,
      yourRating: 4.8,
      totalRatings: 4,
      averageRating: 3.4,
    },
  ];
  return (
    <div className="flex flex-col w-full gap-3 mt-3">
      {
        savedProfs.map((prof) => (
          <Paper className="w-full py-4 pl-6 border-2 pr-9" elevation={0}>
            <div className="flex flex-col w-full md:flex-row md:justify-between">
              <Stack spacing={1}>
                <Typography variant="h3">{prof.name}</Typography>
                <Typography className="font-medium" color="gray">{prof.department}</Typography>
                <Typography className="font-medium" color="gray">{prof.institute}</Typography>
                <div className="flex w-full divide-x-2">
                  <Typography variant="h6" className="pr-3">
                    {prof.percent}
                    % will take again
                  </Typography>
                  <Typography variant="h6" className="pl-3">
                    {prof.levelOfDifficulty}
                    &nbsp;level of difficulty
                  </Typography>
                </div>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h5" align="center">Quality</Typography>
                <div className="flex justify-center gap-5">
                  <div className="flex items-center justify-center w-20 h-16 px-4 py-1.5 text-2xl font-extrabold rounded-lg bg-pageBg">
                    {prof.yourRating}
                  </div>
                  <Divider orientation="vertical" className="mt-1" sx={{ minHeight: '3.5rem', maxHeight: '3.5rem' }} />
                  <div className="flex items-center justify-center w-20 h-16 px-4 py-1.5 text-2xl font-extrabold rounded-lg bg-pageBg">
                    {prof.averageRating}
                  </div>
                </div>
                <div className="flex justify-center gap-10 md:gap-5 md:justify-between">
                  <Typography color="gray" className="w-24 text-xs text-center">Your rating</Typography>
                  <Typography color="gray" className="w-24 text-xs text-center">
                    Total rating:
                    &nbsp;
                    {prof.totalRatings}
                  </Typography>
                </div>
              </Stack>
            </div>
          </Paper>
        ))
      }
    </div>
  );
}
