import React from 'react';

import {
  Typography,
  Card,
  TextField,
  Button,
  Chip,
} from '@mui/material';

import { Clear } from '@mui/icons-material';

export default function AddProfessor() {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">Add Professor</Typography>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6}>
        <TextField
          variant="standard"
          label="First name"
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Last name"
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Email"
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Institute"
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Department"
          className="w-full"
        />
        <div className="flex flex-wrap w-full gap-3 p-3">
          <Typography className="w-full -ml-2 text-sm">Courses</Typography>
          {
            ['CSE101', 'CSE102'].map(
              (tag) => <Chip label={tag} deleteIcon={<Clear />} onDelete={() => {}} />,
            )
          }
          <TextField
            fullWidth
            variant="standard"
          />
        </div>
        <Button variant="contained" style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9">Add</Button>
      </Card>
    </div>
  );
}
