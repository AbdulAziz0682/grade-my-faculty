/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Divider,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';

import { addToast } from '../../../redux/toastsActions';

import { USER_RATINGS, DELETE_RATING } from '../../../graphqlQueries';

export default function Ratings() {
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const { loading, data } = useQuery(USER_RATINGS, { variables: { id: Number(user?._id) }, fetchPolicy: 'network-only' });
  const [deleteRating, deleteMutation] = useMutation(
    DELETE_RATING,
    {
      refetchQueries: [{ query: USER_RATINGS, variables: { id: Number(user?._id) } }],
    },
  );
  function handleDeleteRating(id) {
    deleteRating({ variables: { id: Number(id) } })
      .then(() => {
        dispatch(addToast({ message: 'Rating deleted successfully', severity: 'success' }));
      })
      .catch((e) => dispatch(addToast({ message: e.message, severity: 'error' })));
  }
  if (!user) return <Redirect push to="/login" />;
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center mt-16"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3 mt-3">
      {
        data.ratings.filter(
          (rt) => Number(rt.user) === Number(user._id),
        ).length === 0 && <Typography variant="h6" color="primary" align="center">No ratings yet</Typography>
      }
      {
        data.ratings.map((r) => {
          const faculty = data.faculties.find((f) => Number(f._id) === Number(r.faculty));
          return {
            ...r,
            faculty: {
              ...faculty,
              willTakeAgain: (() => { // IIFE
                let total = 0;
                const reviews = data.totalRatings.filter(
                  (rt) => Number(rt.faculty) === Number(faculty._id),
                );
                reviews.forEach((rev) => {
                  if (rev.wouldTakeAgain) total += 1;
                });
                return Number((total / reviews.length) * 100).toFixed(0);
              })(),
              levelOfDifficulty: (() => { // IIFE
                let total = 0;
                const reviews = data.totalRatings.filter(
                  (rt) => Number(rt.faculty) === Number(faculty._id),
                );
                reviews.forEach((rev) => {
                  if (rev.levelOfDifficulty) total += rev.levelOfDifficulty;
                });
                return Number(total / reviews.length).toFixed(1);
              })(),
              averageRating: (() => { // IIFE
                let total = 0;
                const reviews = data.totalRatings.filter(
                  (rt) => Number(rt.faculty) === Number(faculty._id),
                );
                reviews.forEach((rev) => {
                  if (rev.overAllRating) total += rev.overAllRating;
                });
                return Number(total / reviews.length).toFixed(1);
              })(),
            },
          };
        }).map((rating) => (
          <Paper className="w-full py-4 pl-6 border-2 pr-9" elevation={0}>
            <div className="flex flex-col w-full md:flex-row md:justify-between">
              <Stack spacing={1}>
                <Typography variant="h3">{rating.faculty.firstName}</Typography>
                <Typography className="font-medium" color="gray">{rating.faculty.department}</Typography>
                <Typography className="font-medium" color="gray">
                  {
                    data.institutes.find((i) => i._id === rating.faculty.institute)?.name
                  }
                </Typography>
                <Typography className="font-medium" color="gray">
                  {rating.course}
                  ,&nbsp;
                  {rating.semester}
                </Typography>
                <div className="flex w-full divide-x-2">
                  <Typography variant="h6" className="pr-3">
                    {
                      rating.faculty.willTakeAgain
                    }
                    % will take again
                  </Typography>
                  <Typography variant="h6" className="pl-3">
                    {
                      rating.faculty.levelOfDifficulty
                    }
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
                    {
                      rating.faculty.averageRating
                    }
                  </div>
                </div>
                <div className="flex justify-center gap-10 md:gap-5 md:justify-between">
                  <Typography color="gray" className="w-24 text-xs text-center">Your rating</Typography>
                  <Typography color="gray" className="w-24 text-xs text-center">
                    Total rating:
                    &nbsp;
                    {data.totalRatings.filter((r) => r.faculty === rating.faculty._id).length || 0}
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
        ))
      }
    </div>
  );
}
