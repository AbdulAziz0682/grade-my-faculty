import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import { NEW_FAQ, FAQS } from '../../graphqlQueries';

export default function AddFaqDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [newFaq, { loading }] = useMutation(NEW_FAQ, { refetchQueries: [{ query: FAQS }] });
  // Form requirements
  const schema = yup.object({
    title: yup.string().required('Title is required').min(2, 'Enter at least 2 characters'),
    answer: yup.string().required('Answer is required').min(2, 'Enter at least 2 characters'),
    category: yup.mixed().oneOf(['Student', 'Teacher'], 'Please select one of Student or Teacher').required('Category is required'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      answer: '',
      category: 'Student',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      newFaq({ variables: values })
        .then(() => dispatch(addToast({ message: 'Faq added successfully', severity: 'success' })))
        .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
      handleClose();
    },
  });
  return (
    <Dialog open={open} onClose={handleClose} classes={{ paper: 'flex-grow max-w-full md:mx-16 px-4 md:px-8 py-14' }}>
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <DialogTitle className="text-3xl font-medium text-gray-500">Add Faq</DialogTitle>
        <DialogContent className="flex flex-col items-start gap-9">
          <span className="flex flex-col justify-between w-full gap-9 md:flex-row">
            <TextField
              variant="standard"
              className="md:w-3/6"
              required
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <Select
              variant="standard"
              className="md:w-2/6"
              required
              label="Name"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </span>
          <TextField
            variant="standard"
            fullWidth
            required
            label="Answer of Faq"
            name="answer"
            value={formik.values.answer}
            onChange={formik.handleChange}
            error={formik.touched.answer && Boolean(formik.errors.answer)}
            helperText={formik.touched.answer && formik.errors.answer}
          />
        </DialogContent>
        <DialogActions className="flex justify-between w-full gap-9">
          <Button type="submit" disabled={loading} variant="contained" style={{ maxHeight: '38px' }} className="md:w-1/3 lg:w-1/6 shadow-primaryGlow">
            {
              loading
                ? <CircularProgress />
                : 'Add'
            }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddFaqDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
