/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  TextField,
  Button,
  CircularProgress,
  Chip,
} from '@mui/material';

import { Clear, Add } from '@mui/icons-material';

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import { ADMIN_INSTITUTES, UPDATE_INSTITUTE } from '../../graphqlQueries';

export default function EditInstitute({ institute }) {
  // Chip select requirements
  const [courses, setCourses] = React.useState(institute.courses);
  const [currentText, setCurrentText] = React.useState('');
  function handleDelete(course) {
    setCourses(courses.filter((c) => c !== course.toUpperCase()));
  }
  // --------------------------------------
  const dispatch = useDispatch();
  const [updateInstitute, { loading }] = useMutation(
    UPDATE_INSTITUTE,
    { refetchQueries: [{ query: ADMIN_INSTITUTES }] },
  );
  // Form requirements
  const schema = yup.object({
    name: yup.string().min(2, 'Enter at least 2 characters'),
    email: yup.string().email('Enter a valid email').min(2, 'Enter a valid email'),
  });
  const formik = useFormik({
    initialValues: {
      name: institute.name,
      email: institute.email,
    },
    validationSchema: schema,
    onSubmit: (values) => updateInstitute(
      { variables: { ...values, courses, id: Number(institute._id) } },
    )
      .then(() => dispatch(addToast({ message: 'Institute updated successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col items-center w-full mb-3 md:justify-between md:flex-row">
        <Typography className="ml-16 text-3xl text-gray-400">Edit Institute</Typography>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6} component="form" onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          fullWidth
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          variant="standard"
          fullWidth
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <div className="flex flex-wrap w-full gap-3 p-3">
          <Typography className="w-full -ml-2 text-sm">Courses</Typography>
          {
            courses.map(
              (course) => (
                <Chip
                  key={course}
                  label={course}
                  deleteIcon={<Clear />}
                  onDelete={() => handleDelete(course)}
                />
              ),
            )
          }
          <TextField
            fullWidth
            variant="standard"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value.toUpperCase())}
            InputProps={{
              endAdornment: (
                <Button
                  variant="outlined"
                  className="mb-0.5"
                  onClick={() => {
                    if (currentText === '') return;
                    setCourses([...courses, currentText.trim()]);
                    setCurrentText('');
                  }}
                >
                  <Add />
                </Button>
              ),
            }}
          />
        </div>
        <Button type="submit" variant="contained" disabled={loading} style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">
          {
            loading
              ? <CircularProgress />
              : 'Update'
          }
        </Button>
      </Card>
    </div>
  );
}

EditInstitute.propTypes = {
  institute: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    courses: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
