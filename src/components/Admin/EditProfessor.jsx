/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  TextField,
  Button,
  Rating,
  Chip,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';

import { Clear } from '@mui/icons-material';

import { useMutation, useQuery } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import {
  UPDATE_FACULTY,
  ADMIN_FACULTIES,
  ADMIN_INSTITUTES,
  ADMIN_FACULTY_RATINGS,
} from '../../graphqlQueries';

function calculateRatings(ratings) {
  let total = 0;
  ratings.forEach((r) => {
    total += r.overAllRating;
  });
  return Number(total / ratings.length).toFixed(1);
}

export default function EditProfessor({ professor }) {
  // Chip select requirements
  // const [courses, setCourses] = React.useState(professor.courses);
  // --------------------------------------
  // const [currentInstId, setCurrentInstId] = React.useState(Number(professor.institute._id));
  const dispatch = useDispatch();
  const { data, loading } = useQuery(ADMIN_INSTITUTES, { fetchPolicy: 'cache-and-network' });
  const ratingsQuery = useQuery(
    ADMIN_FACULTY_RATINGS,
    { variables: { faculty: Number(professor._id) } },
  );
  const [updateFaculty, { loading: updateLoading }] = useMutation(
    UPDATE_FACULTY,
    { refetchQueries: [{ query: ADMIN_FACULTIES }] },
  );
  // Form requirements
  const schema = yup.object({
    firstName: yup.string().min(2, 'Enter at least 2 characters'),
    lastName: yup.string().min(2, 'Enter at least 2 characters'),
    email: yup.string().email('Enter a valid email').min(2, 'Enter a valid email'),
    department: yup.string().min(6, 'Enter at least 6 characters'),
    institute: yup.number().min(0, 'Enter a valid institute'),
    courses: yup.array().min(1, 'Enter at least 1 course'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: professor.firstName,
      lastName: professor.lastName,
      email: professor.email,
      department: professor.department,
      institute: professor.institute._id,
      courses: professor.courses,
    },
    validationSchema: schema,
    onSubmit: (values) => updateFaculty({ variables: { ...values, id: professor._id } })
      .then(() => dispatch(addToast({ message: 'Faculty updated successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  function handleDelete(course) {
    const prevCourses = formik.values.courses;
    const newCourses = prevCourses.filter((c) => c !== course.toUpperCase());
    formik.setFieldValue('courses', newCourses);
  }
  React.useEffect(() => {
    // When institute is changed, the courses of previous one should be removed
    // If institute is set as the already assigned
    if (formik.values.institute === professor?.institute._id) {
      formik.setFieldValue('courses', professor.courses);
    } else formik.setFieldValue('courses', []);
  }, [formik.values.institute]);
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col items-center justify-start w-full mb-3 md:flex-row">
        <Typography className="mr-2 text-4xl text-gray-400 md:ml-16">{professor.firstName}</Typography>
        <Rating
          size="large"
          value={ratingsQuery.loading ? 0 : calculateRatings(ratingsQuery.data.ratings)}
          classes={{ iconFilled: 'text-primary' }}
        />
        <Typography variant="h3" className="mx-2 text-primary">
          {
            ratingsQuery.loading ? 0 : calculateRatings(ratingsQuery.data.ratings)
          }
        </Typography>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6} component="form" onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          fullWidth
          required
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          variant="standard"
          fullWidth
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
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
        <div className="flex flex-wrap w-full gap-3">
          <Select
            variant="standard"
            label="Institute"
            placeholder="Institute"
            className="w-full"
            name="institute"
            disabled={loading}
            value={formik.values.institute}
            onChange={(e) => formik.setFieldValue('institute', Number(e.target.value))}
            error={formik.touched.institute && Boolean(formik.errors.institute)}
          >
            <MenuItem key={-1} disabled vlaue="N/A">N/A</MenuItem>
            {
              data.institutes.map((inst) => (
                <MenuItem key={inst._id} value={inst._id}>{inst.name}</MenuItem>
              ))
            }
          </Select>
          {
            formik.touched.institute
            && formik.errors.institute && (
              <small className="text-red-500">{formik.errors.institute}</small>
            )
          }
        </div>
        <TextField
          variant="standard"
          fullWidth
          required
          label="Department"
          name="department"
          value={formik.values.department}
          onChange={formik.handleChange}
          error={formik.touched.department && Boolean(formik.errors.department)}
          helperText={formik.touched.department && formik.errors.department}
        />
        <div className="flex flex-wrap w-full gap-3 p-3">
          <Typography className="w-full -ml-2 text-sm">Courses</Typography>
          {
            formik.values.courses.map(
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
          <Select
            variant="standard"
            label="Courses"
            placeholder="Courses"
            className="w-full"
            disabled={loading}
            error={formik.touched.courses && Boolean(formik.errors.courses)}
            value={formik.values.courses[-1]}
            onChange={(e) => {
              const found = formik.values.courses.find((c) => c === e.target.value);
              if (found) return;
              formik.setFieldValue('courses', [...formik.values.courses, e.target.value]);
            }}
          >
            {
              data.institutes.find(
                (i) => Number(i._id) === formik.values.institute,
              )?.courses.map((course) => (
                <MenuItem key={course} value={course}>{course}</MenuItem>
              ))
            }
          </Select>
          {
            formik.touched.courses
            && formik.errors.courses && (
              <small className="text-red-500">{formik.errors.courses}</small>
            )
          }
        </div>
        <Button type="submit" variant="contained" disabled={updateLoading} style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">
          {
            updateLoading
              ? <CircularProgress />
              : 'Update'
          }
        </Button>
      </Card>
    </div>
  );
}

EditProfessor.propTypes = {
  professor: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    institute: PropTypes.object.isRequired,
    department: PropTypes.string.isRequired,
    courses: PropTypes.array.isRequired,
  }).isRequired,
};
