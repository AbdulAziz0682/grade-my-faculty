/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Typography,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

function calculateOverAllRating(ratings) {
  if (!ratings) return 'N/A';
  let total = 0;
  ratings.forEach((r) => {
    total += r.overAllRating;
  });
  if (total === 0) return 'N/A';
  const average = total / ratings.length;
  if (average >= 4.5) return 'A+';
  if (average >= 4.0 && average < 4.5) return 'A';
  if (average >= 3.5 && average < 4.0) return 'B+';
  if (average >= 3.0 && average < 3.5) return 'B';
  if (average >= 2.5 && average < 3.0) return 'C';
  if (average >= 2 && average < 2.5) return 'D';
  if (average >= 1.5 && average < 2) return 'E';
  return 'F';
}

export default function FacultyCard({ faculty }) {
  const history = useHistory();
  return (
    <Card elevation={3} className="flex flex-col w-full gap-3 p-6 cursor-pointer sm:w-5/12 hover:shadow-lg" onClick={() => history.push('/grade', [faculty])}>
      <Typography className="text-lg font-semibold">{faculty.firstName}</Typography>
      <Typography className="">
        {faculty.department}
        &nbsp;Department
      </Typography>
      <Typography className="text-lg font-bold text-primary">
        Grade&nbsp;(
        { calculateOverAllRating(faculty.ratings) }
        )
      </Typography>
      <Typography>
        {faculty.ratings.length}
        &nbsp;Reviews
      </Typography>
    </Card>
  );
}

FacultyCard.propTypes = {
  faculty: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    institute: PropTypes.object.isRequired,
    department: PropTypes.string.isRequired,
    ratings: PropTypes.array.isRequired,
  }).isRequired,
};
