import React from 'react';

import {
  Typography,
  LinearProgress,
} from '@mui/material';

export default function SplashScreen() {
  return (
    <div className="absolute inset-0 flex px-4">
      <Typography align="center" color="primary" className="m-auto text-5xl">
        Grade My Faculty
        <LinearProgress className="w-full" />
      </Typography>
    </div>
  );
}
