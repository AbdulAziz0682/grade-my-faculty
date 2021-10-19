import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Grid,
  TextField,
  Button,
  Typography,
} from '@mui/material';

export default function EditAdmin({ admin }) {
  return (
    <div className="flex flex-col w-full">
      <Grid container rowSpacing={5} columnSpacing={15}>
        <Grid item xs={12}>
          <Typography className="text-4xl font-medium text-gray-500 pb-9">Update Admin Details</Typography>
          <Card className="flex flex-col w-full gap-12 p-14" elevation={6}>
            <TextField
              variant="standard"
              label="Name"
              value={admin.name}
              className="w-full"
            />
            <TextField
              variant="standard"
              label="Email"
              value={admin.email}
              className="w-full"
            />
            <TextField
              variant="standard"
              type="password"
              label="Password"
              value={admin.password}
              className="w-full"
            />
            <TextField
              variant="standard"
              type="password"
              label="Confirm Password"
              value={admin.password}
              className="w-full"
            />
            <Button variant="contained" style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">Update</Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

EditAdmin.propTypes = {
  admin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};
