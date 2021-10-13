import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  TextField,
  Button,
} from '@mui/material';

export default function EditInstitute({ institute }) {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col items-center w-full mb-3 md:justify-between md:flex-row">
        <Typography variant="h2" className="text-4xl text-gray-400 md:ml-16">Edit Institute</Typography>
        <div className="flex-grow" />
        <Button variant="contained" color="error" className="px-9">Delete Institute</Button>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6}>
        <TextField
          variant="standard"
          label="Institute name"
          value={institute.name}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Email"
          value={institute.email}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Courses"
          value={institute.email}
          className="w-full"
        />
        <Button variant="contained" className="self-start w-3/12 py-3 px-9">Update</Button>
      </Card>
    </div>
  );
}

EditInstitute.propTypes = {
  institute: PropTypes.shape({
    name: PropTypes.string.isRequired,
    courses: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
