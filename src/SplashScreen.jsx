import React from 'react';

import {
  Typography,
  LinearProgress,
} from '@mui/material';

export default function SplashScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
      <Typography variant="h3" align="center" color="primary">
        Grade My Faculty
        <LinearProgress className="w-full" />
      </Typography>
    </div>
  );
}
