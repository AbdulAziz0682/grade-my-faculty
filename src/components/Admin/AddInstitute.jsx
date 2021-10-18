import React from 'react';

import {
  Typography,
  Card,
  TextField,
  Button,
} from '@mui/material';

export default function AddInstitute() {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">Add Institute</Typography>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6}>
        <TextField
          variant="standard"
          label="Institute name"
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Email"
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Courses"
          className="w-full"
        />
        <Button variant="contained" style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9">Add</Button>
      </Card>
    </div>
  );
}
