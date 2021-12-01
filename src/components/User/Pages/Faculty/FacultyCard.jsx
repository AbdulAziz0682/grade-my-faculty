/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Typography,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { RATINGS } from '../../../../graphqlQueries';

export default function FacultyCard({ faculty, institute }) {
  const history = useHistory();
  const { loading, data } = useQuery(
    RATINGS,
    { variables: { faculty: Number(faculty._id) }, fetchPolicy: 'network-only' },
  );
  return (
    <Card elevation={3} className="flex flex-col w-full gap-3 p-6 cursor-pointer sm:w-5/12 hover:shadow-lg" onClick={() => history.push('/grade', [{ ...faculty, institute, ratings: [] || data.ratings }])}>
      <Typography className="text-lg font-semibold">{faculty.firstName}</Typography>
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
        {!loading && data.ratings.length}
        &nbsp;Reviews
      </Typography>
    </Card>
  );
}

FacultyCard.propTypes = {
  faculty: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    levelOfDifficulty: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
  }).isRequired,
  institute: PropTypes.object.isRequired,
};
