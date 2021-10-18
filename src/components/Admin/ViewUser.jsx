import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Button,
  Card,
  IconButton,
} from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';

export default function ViewUser({ user }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">{`${user.id} - ${user.name}`}</Typography>
        <div className="flex-grow" />
        <Button variant="contained" color="error" className="h-full px-9 shadow-redGlow">Delete User</Button>
        <Button variant="contained" className="h-full px-9 shadow-primaryGlow" onClick={() => dispatch(setCurrentTab({ name: 'editUser', data: user }))}>Edit User</Button>
      </div>
      <Card className="flex flex-col w-full gap-6 px-4 py-5 md:py-10 md:px-8" elevation={6}>
        {
          [1, 2, 3].map(
            () => (
              <div className="flex flex-col w-full p-5 bg-gray-200 rounded-lg">
                <div className="flex justify-between gap-3">
                  <Typography className="text-lg font-semibold">Very good professor explains concepts propersly in detailed manner.</Typography>
                  <Typography className="text-sm text-gray-500">North South</Typography>
                </div>
                <div className="flex mt-3 gap-9">
                  <Typography className="text-sm text-gray-500">CSE101</Typography>
                  <Typography className="text-sm font-medium text-gray-700">December 23, 2018</Typography>
                </div>
                <div className="flex justify-between gap-3 mt-9">
                  <Typography className="text-sm font-medium text-gray-700">Abdul Kalam</Typography>
                  <Button variant="contained" color="error" className="px-9 shadow-redGlow">Delete</Button>
                </div>
              </div>
            ),
          )
        }
      </Card>
      <div className="flex justify-end w-full gap-12 mt-16">
        <IconButton className="bg-gray-400 rounded-none shadow-lg">
          <ChevronLeft className="w-12 h-12" htmlColor="white" />
        </IconButton>
        <IconButton className="rounded-none shadow-lg bg-primary">
          <ChevronRight className="w-12 h-12" htmlColor="white" />
        </IconButton>
      </div>
    </div>
  );
}

ViewUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
};
