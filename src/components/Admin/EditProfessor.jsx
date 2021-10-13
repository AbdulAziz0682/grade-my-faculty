import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  TextField,
  Button,
} from '@mui/material';

export default function EditProfessor({ professor }) {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">Edit Professor</Typography>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6}>
        <TextField
          variant="standard"
          label="First name"
          value={professor.firstName}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Last name"
          value={professor.lastName}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Email"
          value={professor.email}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Institute"
          value={professor.university}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Department"
          value={professor.department}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Courses"
          value={professor.courses}
          className="w-full"
        />
        <TextField
          variant="standard"
          type="password"
          label="Password"
          value={professor.password}
          className="w-full"
        />
        <TextField
          variant="standard"
          type="password"
          label="Confirm Password"
          value={professor.password}
          className="w-full"
        />
        <Button variant="contained" className="self-start w-3/12 py-3 px-9">Update</Button>
      </Card>
    </div>
  );
}

EditProfessor.propTypes = {
  professor: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    courses: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
};
