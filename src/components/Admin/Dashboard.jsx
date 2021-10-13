import React, { useState } from 'react';

import { Chart } from 'react-charts';

import {
  Grid,
  Typography,
} from '@mui/material';

import {
  AssignmentTurnedIn,
  People,
  Star,
} from '@mui/icons-material';

import Calendar from 'react-calendar';

import professor from '../../assets/prof.svg';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const data = [
    {
      label: 'Series 1',
      data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]],
    },
  ];

  const axes = [
    { primary: true, type: 'linear', position: 'bottom' },
    { type: 'linear', position: 'left' },
  ];

  return (
    <div className="w-full px-4 pt-16">
      <Grid container rowSpacing={9} columnSpacing={4}>
        <Grid item xs={12} md={8} lg={9} className="flex flex-col gap-6">
          <div className="flex justify-between gap-3">
            <div className="flex flex-col items-center w-40 px-6 py-4 text-gray-500 bg-white border hover:bg-primary hover:text-white hover:shadow-lg">
              <People className="w-12 h-12" />
              <Typography className="text-3xl font-medium text-inherit">128</Typography>
              <Typography className="text-sm text-inherit">Total Users</Typography>
            </div>
            <div className="flex flex-col items-center w-40 px-6 py-4 text-gray-500 bg-white border hover:bg-primary hover:text-white hover:shadow-lg">
              <AssignmentTurnedIn className="w-12 h-12" />
              <Typography className="text-3xl font-medium text-inherit">32</Typography>
              <Typography className="text-sm text-inherit">Total Online</Typography>
            </div>
            <div className="flex flex-col items-center w-40 px-6 py-4 text-gray-500 bg-white border hover:bg-primary hover:text-white hover:shadow-lg">
              <img src={professor} alt="professor" className="w-12 h-12" />
              <Typography className="text-3xl font-medium text-inherit">2</Typography>
              <Typography className="text-sm text-inherit">Total Professors</Typography>
            </div>
            <div className="flex flex-col items-center w-40 px-6 py-4 text-gray-500 bg-white border hover:bg-primary hover:text-white hover:shadow-lg">
              <Star className="w-12 h-12" />
              <Typography className="text-3xl font-medium text-inherit">4</Typography>
              <Typography className="text-sm text-inherit">Total Reviews</Typography>
            </div>
          </div>
          <div className="w-full bg-white">
            <div style={{ width: '100%', height: '400px' }}>
              <Chart data={data} axes={axes} tooltip />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3} className="flex items-start justify-center">
          <Calendar
            value={date}
            onChange={setDate}
            tileClassName="hover:bg-primary hover:text-white rounded-full w-14 h-14"
            className="p-2 bg-white border w-96"
          />
        </Grid>
      </Grid>
    </div>
  );
}
