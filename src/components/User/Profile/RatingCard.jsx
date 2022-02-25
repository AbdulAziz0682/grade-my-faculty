/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { useQuery, useMutation } from '@apollo/client';

import { addToast } from '../../../redux/toastsActions';

import { USER_RATINGS, RATINGS, DELETE_RATING } from '../../../graphqlQueries';

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

function RatingCard({ rating, refetch }) {
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const { data } = useQuery(
    RATINGS,
    {
      fetchPolicy: 'network-only',
      variables: {
        course: rating.course,
        semester: rating.semester,
        faculty: rating.faculty._id,
      },
    },
  );
  const [deleteRating, deleteMutation] = useMutation(
    DELETE_RATING,
    {
      refetchQueries: [
        {
          query: USER_RATINGS,
          variables: { user: user?._id },
          fetchPolicy: 'network-only',
        },
        {
          query: RATINGS,
        },
      ],
    },
  );
  function handleDeleteRating(id) {
    if (!window.confirm('Are you sure you want to delete the rating?')) return;
    deleteRating({ variables: { id: Number(id) } })
      .then(() => {
        dispatch(addToast({ message: 'Rating deleted successfully', severity: 'success' }));
        refetch();
      })
      .catch((e) => dispatch(addToast({ message: e.message, severity: 'error' })));
  }
  return (
    <Paper className="w-full py-4 pl-6 border-2 pr-9" elevation={0}>
      <div className="flex flex-col w-full md:flex-row md:justify-between">
        <Stack spacing={1}>
          <Typography variant="h3">{rating.faculty.firstName}</Typography>
          <Typography className="font-medium" color="gray">{rating.faculty.department}</Typography>
          <Typography className="font-medium" color="gray">
            {rating.faculty.institute.name}
          </Typography>
          <Typography className="font-medium" color="gray">
            {rating.course}
            ,&nbsp;
            {rating.semester}
          </Typography>
          <div className="flex w-full divide-x-2">
            <Typography variant="h6" className="pr-3">
              {calculateWillTakeAgainPercent(data?.ratings)}
              % will take again
            </Typography>
            <Typography variant="h6" className="pl-3">
              {calculateLevelOfDifficulty(data?.ratings)}
              &nbsp;level of difficulty
            </Typography>
          </div>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h5" align="center">Quality</Typography>
          <div className="flex justify-center gap-5">
            <div className="flex items-center justify-center w-20 h-16 px-4 py-1.5 text-2xl font-extrabold rounded-lg bg-pageBg">
              {
                rating.overAllRating
              }
            </div>
            <Divider orientation="vertical" className="mt-1" sx={{ minHeight: '3.5rem', maxHeight: '3.5rem' }} />
            <div className="flex items-center justify-center w-20 h-16 px-4 py-1.5 text-2xl font-extrabold rounded-lg bg-pageBg">
              {calculateAverageRating(data?.ratings)}
            </div>
          </div>
          <div className="flex justify-center gap-10 md:gap-5 md:justify-between">
            <Typography color="gray" className="w-24 text-xs text-center">Your rating</Typography>
            <Typography color="gray" className="w-24 text-xs text-center">
              Total rating:
              &nbsp;
              {data?.ratings.length}
            </Typography>
          </div>
          <Button className="self-center" size="small" variant="contained" color="error" disabled={deleteMutation.loading} onClick={() => handleDeleteRating(Number(rating._id))}>
            {
              deleteMutation.loading
                ? <CircularProgress />
                : 'Delete'
            }
          </Button>
        </Stack>
      </div>
    </Paper>
  );
}

RatingCard.propTypes = {
  rating: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    // Over all rating represents rate value (1 to 5) given by user on a particular rating
    overAllRating: PropTypes.number.isRequired,
    course: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired,
    faculty: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      institute: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  // Fuction for refetching ratings after user deletes one
  refetch: PropTypes.func.isRequired,
};

export default RatingCard;
