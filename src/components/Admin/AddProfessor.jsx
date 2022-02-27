/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Typography,
  Card,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';

import { Clear } from '@mui/icons-material';

import { useMutation, useQuery } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import {
  NEW_FACULTY,
  ADMIN_INSTITUTES,
  COUNT_ALL,
  ADMIN_FACULTIES,
} from '../../graphqlQueries';
import { setCurrentTab } from '../../redux/adminActions';

export default function AddProfessor() {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(ADMIN_INSTITUTES, { fetchPolicy: 'cache-and-network' });
  const [newFaculty, { loading: newFacultyLoading }] = useMutation(
    NEW_FACULTY, { refetchQueries: [{ query: ADMIN_FACULTIES }, { query: COUNT_ALL }] },
  );
  // Form requirements
  const schema = yup.object({
    firstName: yup.string().required('First name is required').min(2, 'Enter at least 2 characters'),
    lastName: yup.string(),
    email: yup.string().email('Enter a valid email'),
    department: yup.string().required('Department is required').min(6, 'Enter at least 6 characters'),
    institute: yup.number().min(0, 'Enter a valid institute').required('Institute is required'),
    courses: yup.array().min(1, 'Enter at least 1 course').required('Courses are required'),
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      department: '',
      institute: -1,
      courses: [],
    },
    validationSchema: schema,
    onSubmit: (values) => newFaculty({
      variables: {
        ...values,
        // if last name is not supplied, better not provide it
        lastName: values.lastName ? values.lastName : undefined,
        email: values.email ? values.email : undefined,
      },
    })
      .then(() => dispatch(addToast({ message: 'Faculty added successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  // Chip select requirements
  function handleDelete(course) {
    const prevCourses = formik.values.courses;
    const newCourses = prevCourses.filter((c) => c !== course.toUpperCase());
    formik.setFieldValue('courses', newCourses);
  }
  // --------------------------------------
  React.useEffect(() => {
    // When institute is changed, the courses of previous one should be removed
    formik.setFieldValue('courses', []);
  }, [formik.values.institute]);
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-wrap items-center justify-between w-full gap-2">
        <Typography className="ml-16 text-4xl text-gray-500">Add Professor</Typography>
        <Button type="submit" variant="contained" onClick={() => dispatch(setCurrentTab({ name: 'addManyProfessors' }))} style={{ maxHeight: '38px' }} className="self-start w-auto py-3 px-9 shadow-primaryGlow">
          Add Many Professors
        </Button>
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
        <Button type="submit" variant="contained" disabled={newFacultyLoading} style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">
          {
            newFacultyLoading
              ? <CircularProgress />
              : 'Add'
          }
        </Button>
      </Card>
    </div>
  );
}
