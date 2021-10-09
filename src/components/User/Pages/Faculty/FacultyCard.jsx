import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Typography,
} from '@mui/material';

export default function FacultyCard({ faculty }) {
  return (
    <Card elevation={3} className="flex flex-col w-full sm:w-5/12 p-6 gap-3">
      <Typography className="text-lg font-semibold">{faculty.name}</Typography>
      <Typography className="">
        {faculty.department}
        &nbsp;Department
      </Typography>
      <Typography className="text-primary font-bold text-lg">
        Grade&nbsp;(
        {faculty.levelOfDifficulty}
        )
      </Typography>
      <Typography>
        {faculty.reviews}
        &nbsp;Reviews
      </Typography>
      <span className="text-primary" aria-hidden onClick={() => {}}>View More</span>
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
