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

import {
  LocalizationProvider,
  CalendarPicker,
} from '@mui/lab';

import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import Calendar from 'react-calendar';

import professorGray from '../../assets/professorGray2.svg';
import professorWhite from '../../assets/profWhite.svg';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [professorIcon, setProfessorIcon] = useState(professorGray);
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
        <Grid item xs={12} md={7} lg={8} className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-center gap-3 md:justify-between">
            <div className="flex flex-col items-center w-40 px-6 py-4 text-gray-400 bg-white border hover:filter hover:drop-shadow-xl hover:bg-primary hover:text-white">
              <People className="w-12 h-12" />
              <Typography className="text-3xl font-medium text-inherit">128</Typography>
              <Typography className="text-sm text-inherit">Total Users</Typography>
            </div>
            <div className="flex flex-col items-center w-40 px-6 py-4 text-gray-400 bg-white border hover:filter hover:drop-shadow-xl hover:bg-primary hover:text-white">
              <AssignmentTurnedIn className="w-12 h-12" />
              <Typography className="text-3xl font-medium text-inherit">32</Typography>
              <Typography className="text-sm text-inherit">Total Online</Typography>
            </div>
            <div
              onMouseEnter={() => setProfessorIcon(professorWhite)}
              onMouseLeave={() => setProfessorIcon(professorGray)}
              className="flex flex-col items-center w-40 px-6 py-4 text-gray-400 bg-white border hover:filter hover:drop-shadow-xl hover:bg-primary hover:text-white"
            >
              <img src={professorIcon} alt="professor" className="w-12 h-12" />
              <Typography className="text-3xl font-medium text-inherit">2</Typography>
              <Typography className="text-sm text-inherit">Total Professors</Typography>
            </div>
            <div className="flex flex-col items-center w-40 px-6 py-4 text-gray-400 bg-white border hover:filter hover:drop-shadow-xl hover:bg-primary hover:text-white">
              <Star className="w-12 h-12" />
              <Typography className="text-3xl font-medium text-inherit">4</Typography>
              <Typography className="text-sm text-inherit">Total Reviews</Typography>
            </div>
          </div>
          <div className="w-full bg-white">
            <Typography variant="h3">Review Chart</Typography>
            <div className="w-full h-60 md:h-96">
              <Chart data={data} axes={axes} tooltip />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={5} lg={4} className="flex items-start justify-center">
          <div
            style={{
              maxHeight: '350px',
              maxWidth: '380px',
              minWidth: '380px',
              minHeight: '350px',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CalendarPicker
                date={date}
                onChange={(newDate) => setDate(newDate)}
                className="bg-white"
              />
            </LocalizationProvider>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
