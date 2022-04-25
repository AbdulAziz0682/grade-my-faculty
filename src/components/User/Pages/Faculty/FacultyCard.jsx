/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Typography,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

import { calculateAverageOverAllRating, mapAverageOverAllRating } from '../../../../utils/calculateAverageOverAllRating';

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
        { mapAverageOverAllRating(calculateAverageOverAllRating(faculty.ratings)) }
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
