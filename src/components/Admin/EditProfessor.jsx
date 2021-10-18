import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  TextField,
  Button,
  Rating,
  Chip,
} from '@mui/material';

import { Clear } from '@mui/icons-material';

export default function EditProfessor({ professor }) {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col items-center w-full mb-3 md:justify-between md:flex-row">
        <Typography className="mr-2 text-4xl text-gray-400 md:ml-16">Edit Professor</Typography>
        <Rating
          size="large"
          value={4}
          classes={{ iconFilled: 'text-primary' }}
        />
        <Typography variant="h3" className="mx-2 text-primary">(4.0)</Typography>
        <div className="flex-grow" />
        <Button variant="contained" color="error" className="px-9 shadow-redGlow">Delete Professor</Button>
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
        <Button variant="contained" style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">Update</Button>
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
