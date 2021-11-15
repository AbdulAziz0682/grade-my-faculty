import React from 'react';

import {
  Paper,
  Stack,
  Typography,
} from '@mui/material';

export default function SavedProfessors() {
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
              <Stack>
                <Typography variant="h3">{prof.name}</Typography>
                <Typography variant="body1" color="gray">{prof.department}</Typography>
                <Typography variant="body1" color="gray">{prof.institute}</Typography>
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
              <Stack spacing={2}>
                <Typography variant="h5" align="center">Quality</Typography>
                <div className="flex justify-center md:justify-end">
                  <div className="flex divide-x-2">
                    <div className="pr-9">
                      <div className="flex items-center justify-center w-full h-full px-4 py-1.5 text-lg font-extrabold transform scale-150 rounded-lg bg-pageBg">
                        {prof.yourRating}
                      </div>
                    </div>
                    <div className="pl-9">
                      <div className="flex items-center justify-center w-full h-full px-4 py-1.5 text-lg font-extrabold transform scale-150 rounded-lg bg-pageBg">
                        {prof.averageRating}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Typography color="gray" className="flex-grow pr-4 text-xs text-right md:text-right">Your rating</Typography>
                  <Typography color="gray" className="flex-grow text-xs text-left pl-9 md:text-right">
                    Total rating:
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
