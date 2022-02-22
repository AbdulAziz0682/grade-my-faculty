/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  Button,
  CircularProgress,
} from '@mui/material';

import moment from 'moment';

import { useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { setCurrentTab } from '../../redux/adminActions';
import { addToast } from '../../redux/toastsActions';

import {
  USERS, RATINGS, ADMIN_DELETE_RATING,
} from '../../graphqlQueries';

export default function ViewReport({ report }) {
  const dispatch = useDispatch();
  const [deleteRating, { loading }] = useMutation(
    ADMIN_DELETE_RATING,
    { refetchQueries: [{ query: RATINGS }, { query: USERS }] },
  );
  function handleRatingDelete(id) {
    deleteRating({ variables: { id: Number(id) } })
      .then(() => {
        dispatch(addToast({ message: 'Deleted rating successfully', severity: 'success' }));
        dispatch(setCurrentTab({ name: 'reports', data: null }));
      })
      .catch((error) => dispatch(addToast({ message: error.message, severity: 'error' })));
  }
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">{`${report._id} - ${report.summary}`}</Typography>
        <div className="flex-grow" />
        <Button variant="contained" disabled={loading} onClick={() => handleRatingDelete(report.rating._id)} color="error" className="h-full px-9 shadow-redGlow">
          {
            loading
              ? <CircularProgress />
              : `Delete Rating #${report.rating._id}`
          }
        </Button>
      </div>
      <Card className="flex flex-col w-full px-4 py-5 md:px-8" elevation={6}>
        <table className="pl-2">
          <tbody>
            <tr className="border-b"><Typography variant="h5">Report Details</Typography></tr>
            <tr>
              <td className="w-3/12"><Typography>Summary:</Typography></td>
              <td><Typography>{report.summary}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Details:</Typography></td>
              <td><Typography>{report.details}</Typography></td>
            </tr>
            <tr className="border-b"><Typography variant="h5">Reporting User Details</Typography></tr>
            <tr>
              <td className="w-3/12"><Typography>ID:</Typography></td>
              <td><Typography>{report.user._id}</Typography></td>
            </tr>
            <tr>
              <td><Typography>First name:</Typography></td>
              <td><Typography>{report.user.firstName}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Email:</Typography></td>
              <td><Typography>{report.user.email}</Typography></td>
            </tr>
            <tr className="border-b"><Typography variant="h5">Rating Details</Typography></tr>
            <tr>
              <td><Typography>ID:</Typography></td>
              <td><Typography>{report.rating._id}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Rated by:</Typography></td>
              <td><Typography>{report.rating.user.firstName}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Rating user&apos;s email:</Typography></td>
              <td><Typography>{report.rating.user.email}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Faculty:</Typography></td>
              <td><Typography>{report.rating.faculty.firstName}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Faculty email:</Typography></td>
              <td><Typography>{report.rating.faculty.email}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Course:</Typography></td>
              <td><Typography>{report.rating.course}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Semester:</Typography></td>
              <td><Typography>{report.rating.semester}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Rated on:</Typography></td>
              <td><Typography>{moment(report.rating.createdAt).format('DD-MM-YYYY, HH:MM A')}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Likes:</Typography></td>
              <td><Typography>{report.rating.likes.length}</Typography></td>
            </tr>
            <tr>
              <td><Typography>Dislikes:</Typography></td>
              <td><Typography>{report.rating.disLikes.length}</Typography></td>
            </tr>
            <tr>
              <td><Typography>User thoughts:</Typography></td>
              <td><Typography>{report.rating.thoughts}</Typography></td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

ViewReport.propTypes = {
  report: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    rating: PropTypes.object.isRequired,
    summary: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};
