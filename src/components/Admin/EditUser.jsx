import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  TextField,
  Button,
} from '@mui/material';

export default function EditUser({ user }) {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">Edit User</Typography>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6}>
        <TextField
          variant="standard"
          label="First name"
          value={user.firstName}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Last name"
          value={user.lastName}
          className="w-full"
        />
        <TextField
          variant="standard"
          label="Email"
          value={user.email}
          className="w-full"
        />
        <TextField
          variant="standard"
          type="password"
          label="Password"
          value={user.password}
          className="w-full"
        />
        <TextField
          variant="standard"
          type="password"
          label="Confirm Password"
          value={user.password}
          className="w-full"
        />
        <Button variant="contained" style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">Update</Button>
      </Card>
    </div>
  );
}

EditUser.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
};
