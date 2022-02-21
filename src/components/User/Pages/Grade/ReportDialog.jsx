import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';

import {
  Close, Report,
} from '@mui/icons-material';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { useDispatch } from 'react-redux';

import { useMutation } from '@apollo/client';
import { NEW_REPORT } from '../../../../graphqlQueries';

import { addToast } from '../../../../redux/toastsActions';

export default function ReportDialog({
  open, handleClose, ratingId,
}) {
  const dispatch = useDispatch();
  const [newReport, { loading }] = useMutation(NEW_REPORT);
  // Form requirements
  const schema = yup.object({
    summary: yup.string().min(4, 'Enter at least 4 characters').required('Summary is required'),
    details: yup.string().min(30, 'Enter at least 30 characters').required('Details is required'),
  });
  const formik = useFormik({
    initialValues: {
      summary: '',
      details: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      newReport({ variables: { ...values, rating: ratingId } })
        .then(() => {
          dispatch(addToast({ message: 'Reported successfully', severity: 'success' }));
          handleClose();
        })
        .catch((e) => dispatch(addToast({ message: e.message, severity: 'error' })));
    },
  });
  // -----------------
  React.useEffect(() => formik.resetForm(), []);
  return (
    <Dialog classes={{ paper: 'w-full' }} open={open} onClose={() => handleClose()}>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <DialogTitle className="text-center">Report the rating</DialogTitle>
        <DialogContent className="flex flex-col w-full gap-3">
          <div className="flex flex-col gap-1">
            <Typography variant="h6">Summary</Typography>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              name="summary"
              value={formik.values.summary}
              onChange={formik.handleChange}
              error={formik.touched.summary && Boolean(formik.errors.summary)}
              helperText={formik.touched.summary && formik.errors.summary}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Typography variant="h6">Details</Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              error={formik.touched.details && Boolean(formik.errors.details)}
              helperText={formik.touched.details && formik.errors.details}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" startIcon={<Close />} onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<Report />}
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? <CircularProgress />
                : 'Report'
            }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ReportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  ratingId: PropTypes.number.isRequired,
};
