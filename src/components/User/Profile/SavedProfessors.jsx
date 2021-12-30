/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Paper,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';

import { BookmarkOutlined } from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';

import { USER_RATINGS, SAVE_FACULTY } from '../../../graphqlQueries';
import { addToast } from '../../../redux/toastsActions';
import { setUser } from '../../../redux/accountActions';

export default function SavedProfessors() {
  const user = useSelector((state) => state.account.user);
  if (!user) return <Redirect push to="/login" />;
  const dispatch = useDispatch();
  const { loading, data } = useQuery(USER_RATINGS, { variables: { id: Number(user?._id) }, fetchPolicy: 'network-only' });
  const [saveFaculty] = useMutation(SAVE_FACULTY);
  function handleSave(fac) {
    saveFaculty({ variables: { user: Number(user._id), faculty: Number(fac) } })
      .then((r) => dispatch(setUser({ ...user, savedFaculties: r.data.saveFaculty })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
  }
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center mt-16"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3 mt-3">
      {
        user.savedFaculties.length === 0 && <Typography variant="h6" color="primary" align="center">No saved faculties yet</Typography>
      }
      {
        data.faculties.filter(
          (fac) => user.savedFaculties.includes(Number(fac._id)),
        ).map((faculty) => (
          <Paper className="w-full py-4 pl-6 border-2 pr-9" elevation={0}>
            <div className="flex flex-col w-full gap-3 md:flex-row">
              <Stack spacing={1}>
                <Typography variant="h5" align="center">Quality</Typography>
                <div className="flex justify-center md:justify-end">
                  <div className="flex items-center justify-center w-24 h-16 px-4 py-1.5 text-3xl font-extrabold rounded-lg bg-pageBg">
                    {
                      (() => { // IIFE
                        let total = 0;
                        const reviews = data.ratings.filter((r) => r.faculty === faculty._id);
                        if (reviews.length === 0) return 0;
                        reviews.forEach((rev) => {
                          if (rev.overAllRating) total += rev.overAllRating;
                        });
                        return Number(total / reviews.length).toFixed(1);
                      })()
                    }
                  </div>
                </div>
                <div className="flex items-center justify-center w-full">
                  <Typography color="gray" className="flex-grow text-xs text-center">
                    Total Ratings:
                    &nbsp;
                    {data.ratings.filter((r) => r.faculty === faculty._id).length || 0}
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
                <Typography className="font-medium" color="gray">{data.institutes.find((i) => i._id === faculty.institute).name}</Typography>
                <div className="flex w-full divide-x-2">
                  <Typography variant="h6" className="pr-3">
                    {
                      (() => { // IIFE
                        let total = 0;
                        const reviews = data.ratings.filter((r) => r.faculty === faculty._id);
                        if (reviews.length === 0) return 0;
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
                        if (reviews.length === 0) return 0;
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
            </div>
          </Paper>
        ))
      }
    </div>
  );
}
