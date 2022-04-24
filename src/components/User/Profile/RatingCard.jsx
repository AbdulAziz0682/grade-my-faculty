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

import { useHistory } from 'react-router-dom';

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
  if (total === 0) return 'N/A';
  const average = total / ratings.length;
  if (average >= 5 * (11 / 12)) return 'A+'; // 4.583333
  if (average >= 5 * (10 / 12) && average < 5 * (11 / 12)) return 'A'; // 4.16666, 4.583333
  if (average >= 5 * (9 / 12) && average < 5 * (10 / 12)) return 'A-'; // 3.75, 4.16666
  if (average >= 5 * (8 / 12) && average < 5 * (9 / 12)) return 'B+'; // 3.3333, 3.75
  if (average >= 5 * (7 / 12) && average < 5 * (8 / 12)) return 'B'; // 2.91666, 3.3333
  if (average >= 5 * (6 / 12) && average < 5 * (7 / 12)) return 'B-'; // 2.5, 2.91666
  if (average >= 5 * (5 / 12) && average < 5 * (6 / 12)) return 'C+'; // 2.083333, 2.5
  if (average >= 5 * (4 / 12) && average < 5 * (5 / 12)) return 'C'; // 1.6666, 2.08333
  if (average >= 5 * (3 / 12) && average < 5 * (4 / 12)) return 'C-'; // 1.25, 1.6666
  if (average >= 5 * (2 / 12) && average < 5 * (3 / 12)) return 'D'; // 0.83333, 1.25
  if (average >= 5 * (1 / 12) && average < 5 * (2 / 12)) return 'E'; // 0.41666, 0.83333
  return 'F';
}

function RatingCard({ rating, refetch }) {
  const history = useHistory();
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
                calculateAverageRating([{ overAllRating: 5 * ((rating.overAllRating - 1) / 12) }])
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
          <div className="flex flex-wrap justify-center gap-3">
            <Button className="self-center" size="small" variant="contained" color="primary" onClick={() => history.push('/edit-rating', [rating])}>
              Edit
            </Button>
            <Button className="self-center" size="small" variant="contained" color="error" disabled={deleteMutation.loading} onClick={() => handleDeleteRating(Number(rating._id))}>
              {
                deleteMutation.loading
                  ? <CircularProgress />
                  : 'Delete'
              }
            </Button>
          </div>
        </Stack>
      </div>
    </Paper>
  );
}

RatingCard.propTypes = {
  rating: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    // Over all rating represents rate value (A to F) given by user on a particular rating
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    overAllRating: PropTypes.number.isRequired,
    course: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired,
    faculty: PropTypes.shape({
      _id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      courses: PropTypes.arrayOf(PropTypes.string).isRequired,
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
