/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Paper,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';

import {
  BookmarkOutlined,
} from '@mui/icons-material';

import { Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useMutation } from '@apollo/client';

import { SAVE_FACULTY } from '../../../graphqlQueries';

import { addToast } from '../../../redux/toastsActions';
import { setUser } from '../../../redux/accountActions';

// helper functions
function calculateWillTakeAgainPercent(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  let totalTakingAgain = 0;
  ratings.forEach((r) => {
    if (r.wouldTakeAgain) {
      totalTakingAgain += 1;
    }
  });
  return Number((totalTakingAgain / ratings.length) * 100).toFixed(0);
}

function calculateLevelOfDifficulty(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  let total = 0;
  ratings.forEach((r) => {
    if (r.levelOfDifficulty) total += r.levelOfDifficulty;
  });
  return Number(total / ratings.length).toFixed(1);
}

function calculateAverageRating(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  let total = 0;
  ratings.forEach((r) => {
    if (r.overAllRating) total += r.overAllRating;
  });
  return Number(total / ratings.length).toFixed(1);
}

function SavedFacultyCard({ faculty }) {
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const [saveFaculty] = useMutation(SAVE_FACULTY);
  function handleSave(fac) {
    saveFaculty({ variables: { user: Number(user._id), faculty: Number(fac) } })
      .then((r) => dispatch(setUser({ ...user, savedFaculties: r.data.saveFaculty })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
  }
  if (!user) return <Redirect push to="/login" />;
  return (
    <Paper className="w-full py-4 pl-6 border-2 pr-9" elevation={0}>
      <div className="flex flex-col w-full gap-3 md:flex-row">
        <Stack spacing={1}>
          <Typography variant="h5" align="center">Quality</Typography>
          <div className="flex justify-center md:justify-end">
            <div className="flex items-center justify-center w-24 h-16 px-4 py-1.5 text-3xl font-extrabold rounded-lg bg-pageBg">
              {calculateAverageRating(faculty.ratings)}
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <Typography color="gray" className="flex-grow text-xs text-center">
              Total Ratings:
              &nbsp;
              {faculty.ratings.length}
            </Typography>
          </div>
        </Stack>
        <Stack spacing={1} className="md:w-full">
          <div className="flex justify-between w-full gap-2">
            <Typography variant="h3">{faculty.firstName}</Typography>
            <IconButton onClick={() => handleSave(faculty._id)}>
              <BookmarkOutlined color={`${user.savedFaculties.includes(Number(faculty._id)) && 'primary'}`} />
            </IconButton>
          </div>
          <Typography className="font-medium" color="gray">{faculty.department}</Typography>
          <Typography className="font-medium" color="gray">{faculty.institute.name}</Typography>
          <div className="flex w-full divide-x-2">
            <Typography variant="h6" className="pr-3">
              {calculateWillTakeAgainPercent(faculty.ratings)}
              % will take again
            </Typography>
            <Typography variant="h6" className="pl-3">
              {calculateLevelOfDifficulty(faculty.ratings)}
              &nbsp;level of difficulty
            </Typography>
          </div>
        </Stack>
      </div>
    </Paper>
  );
}

SavedFacultyCard.propTypes = {
  faculty: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    institute: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    ratings: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.number.isRequired,
      wouldTakeAgain: PropTypes.bool.isRequired,
      levelOfDifficulty: PropTypes.number.isRequired,
      overAllRating: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};

export default SavedFacultyCard;
