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
    { refetchQueries: [{ query: USER_RATINGS }] },
  );
  function handleDeleteRating(id) {
    deleteRating({ id: Number(id) })
      .then(() => dispatch(addToast({ message: 'Rating deleted successfully', severity: 'success' })))
      .catch((e) => dispatch(addToast({ message: e.message, severity: 'error' })));
  }
  if (!user) return <Redirect push to="/login" />;
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center mt-16"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3 mt-3">
      {
        data.faculties.filter(
          (fac) => data.ratings.find((r) => r.faculty === fac._id),
        ).length === 0 && <Typography variant="h6" color="primary" align="center">No ratings yet</Typography>
      }
      {
        data.faculties.filter(
          (fac) => data.ratings.find((r) => r.faculty === fac._id),
        ).map((faculty) => (
          <Paper className="w-full py-4 pl-6 border-2 pr-9" elevation={0}>
            <div className="flex flex-col w-full md:flex-row md:justify-between">
              <Stack spacing={1}>
                <Typography variant="h3">{faculty.firstName}</Typography>
                <Typography className="font-medium" color="gray">{faculty.department}</Typography>
                <Typography className="font-medium" color="gray">
                  {
                    data.institutes.find((i) => i._id === faculty.institute)?.name
                  }
                </Typography>
                <div className="flex w-full divide-x-2">
                  <Typography variant="h6" className="pr-3">
                    {
                      (() => { // IIFE
                        let total = 0;
                        const reviews = data.ratings.filter((r) => r.faculty === faculty._id);
                        reviews.forEach((rev) => {
                          if (rev.wouldTakeAgain) total += 1;
                        });
                        return Number((total / reviews.length) * 100).toFixed(0);
                      })()
                    }
                    % will take again
                  </Typography>
                  <Typography variant="h6" className="pl-3">
                    {
                      (() => { // IIFE
                        let total = 0;
                        const reviews = data.ratings.filter((r) => r.faculty === faculty._id);
                        reviews.forEach((rev) => {
                          if (rev.levelOfDifficulty) total += rev.levelOfDifficulty;
                        });
                        return Number(total / reviews.length).toFixed(1);
                      })()
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
                      data.ratings.find((r) => r.faculty === faculty._id)?.overAllRating
                    }
                  </div>
                  <Divider orientation="vertical" className="mt-1" sx={{ minHeight: '3.5rem', maxHeight: '3.5rem' }} />
                  <div className="flex items-center justify-center w-20 h-16 px-4 py-1.5 text-2xl font-extrabold rounded-lg bg-pageBg">
                    {
                      (() => { // IIFE
                        let total = 0;
                        const reviews = data.ratings.filter((r) => r.faculty === faculty._id);
                        reviews.forEach((rev) => {
                          if (rev.overAllRating) total += rev.overAllRating;
                        });
                        return Number(total / reviews.length).toFixed(1);
                      })()
                    }
                  </div>
                </div>
                <div className="flex justify-center gap-10 md:gap-5 md:justify-between">
                  <Typography color="gray" className="w-24 text-xs text-center">Your rating</Typography>
                  <Typography color="gray" className="w-24 text-xs text-center">
                    Total rating:
                    &nbsp;
                    {data.ratings.filter((r) => r.faculty === faculty._id).length || 0}
                  </Typography>
                </div>
                <Button className="self-center" size="small" variant="contained" color="error" disabled={deleteMutation.loading} onClick={() => handleDeleteRating(data.ratings.find((r) => r.faculty === faculty._id)?._id)}>
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
