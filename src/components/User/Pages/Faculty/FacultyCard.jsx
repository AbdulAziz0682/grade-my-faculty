import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Typography,
  Button,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

export default function FacultyCard({ faculty }) {
  const history = useHistory();
  return (
    <Card elevation={3} className="flex flex-col w-full gap-3 p-6 sm:w-5/12">
      <Typography className="text-lg font-semibold">{faculty.name}</Typography>
      <Typography className="">
        {faculty.department}
        &nbsp;Department
      </Typography>
      <Typography className="text-lg font-bold text-primary">
        Grade&nbsp;(
        {faculty.levelOfDifficulty}
        )
      </Typography>
      <Typography>
        {faculty.reviews}
        &nbsp;Reviews
      </Typography>
      <Button variant="text" color="primary" className="self-start pl-0" onClick={() => history.push('/grade', [faculty])}>View More</Button>
    </Card>
  );
}

FacultyCard.propTypes = {
  faculty: PropTypes.shape({
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    levelOfDifficulty: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
  }).isRequired,
};
