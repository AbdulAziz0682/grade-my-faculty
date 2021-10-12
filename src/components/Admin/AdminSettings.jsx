import React from 'react';

import {
  Card,
  Grid,
  TextField,
  Button,
  Typography,
  Switch,
} from '@mui/material';

export default function AdminSettings() {
  return (
    <div className="flex flex-col w-full">
      <Grid container rowSpacing={5} columnSpacing={15}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" className="text-gray-400 pb-9">Add Admin</Typography>
          <Card className="flex flex-col w-full gap-12 p-14" elevation={6}>
            <TextField
              variant="standard"
              label="Name"
              className="w-full"
            />
            <TextField
              variant="standard"
              label="Email"
              className="w-full"
            />
            <TextField
              variant="standard"
              type="password"
              label="Password"
              className="w-full"
            />
            <TextField
              variant="standard"
              type="password"
              label="Confirm Password"
              className="w-full"
            />
            <Button variant="contained" className="self-start w-3/12 py-3 px-9">Add</Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" className="text-gray-400 pb-9">Update Password</Typography>
          <Card className="flex flex-col w-full gap-12 p-14" elevation={6}>
            <TextField
              variant="standard"
              label="Old Password"
              className="w-full"
            />
            <TextField
              variant="standard"
              type="password"
              label="New Password"
              className="w-full"
            />
            <TextField
              variant="standard"
              type="password"
              label="Confirm Password"
              className="w-full"
            />
            <Button variant="contained" className="self-start w-3/12 py-3 px-9">Update</Button>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={6} className="flex flex-col gap-12 pt-6 pb-14 px-14">
            <Typography variant="h4" className="text-gray-400">About Us</Typography>
            <TextField
              variant="standard"
              label="Our Story"
              className="w-full"
            />
            <TextField
              variant="standard"
              label="Who we are?"
              className="w-full"
            />
            <Switch
              defaultChecked
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
