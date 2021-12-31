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
  UPDATE_FACULTY, FACULTIES, INSTITUTES, RATINGS,
} from '../../graphqlQueries';

export default function EditProfessor({ professor }) {
  // Chip select requirements
  const [courses, setCourses] = React.useState([]);
  function handleDelete(course) {
    setCourses(courses.filter((c) => c !== course.toUpperCase()));
  }
  // --------------------------------------
  const [currentInstId, setCurrentInstId] = React.useState(Number(professor.institute));
  const dispatch = useDispatch();
  const institutesQuery = useQuery(INSTITUTES);
  const ratingsQuery = useQuery(RATINGS, { variables: { faculty: Number(professor._id) } });
  const [updateFaculty, { loading }] = useMutation(
    UPDATE_FACULTY,
    { refetchQueries: [{ query: FACULTIES }] },
  );
  // Form requirements
  const schema = yup.object({
    firstName: yup.string().required('First name is required').min(2, 'Enter at least 2 characters'),
    lastName: yup.string().required('Last name is required').min(2, 'Enter at least 2 characters'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    department: yup.string().required('Department is required').min(6, 'Enter at least 6 characters'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: professor.firstName,
      lastName: professor.lastName,
      email: professor.email,
      department: professor.department,
    },
    validationSchema: schema,
    onSubmit: (values) => updateFaculty(
      {
        variables: {
          ...values,
          courses,
          institute: currentInstId,
          id: Number(professor._id),
        },
      },
    )
      .then(() => dispatch(addToast({ message: 'Faculty updated successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  function calculateRatings(ratings) {
    let total = 0;
    ratings.forEach((r) => {
      total += r.overAllRating;
    });
    return Number(total / ratings.length).toFixed(1);
  }
  React.useEffect(() => {
    if (currentInstId === Number(professor.institute)) {
      setCourses(professor.courses);
      return;
    }
    // When institute is changed, the courses of previous one should be removed
    setCourses(() => []);
  }, [currentInstId]);
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
          (
          {
          ratingsQuery.loading ? 0 : calculateRatings(ratingsQuery.data.ratings)
          }
          )
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
          required
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
          required
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Select
          variant="standard"
          label="Institute"
          placeholder="Institute"
          className="w-full"
          disabled={institutesQuery.loading}
          value={
            !institutesQuery.loading
              ? institutesQuery.data.institutes.find((i) => Number(i._id) === currentInstId)._id
              : 0
          }
          onChange={(e) => setCurrentInstId(Number(e.target.value))}
        >
          {
            !institutesQuery.loading
            && institutesQuery.data.institutes.map((inst) => (
              <MenuItem key={inst._id} value={inst._id}>{inst.name}</MenuItem>
            ))
          }
        </Select>
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
            !institutesQuery.loading
            && courses.map(
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
            disabled={institutesQuery.loading}
            onChange={(e) => {
              const found = courses.find((c) => c === e.target.value);
              if (found) return;
              setCourses([...courses, e.target.value]);
            }}
          >
            {
              !institutesQuery.loading
              && institutesQuery.data.institutes.find(
                (i) => Number(i._id) === currentInstId,
              ).courses.map((course) => (
                <MenuItem key={course} value={course}>{course}</MenuItem>
              ))
            }
          </Select>
        </div>
        <Button type="submit" variant="contained" disabled={loading || courses.length === 0} style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">
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

EditProfessor.propTypes = {
  professor: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    institute: PropTypes.number.isRequired,
    department: PropTypes.string.isRequired,
    courses: PropTypes.array.isRequired,
  }).isRequired,
};
