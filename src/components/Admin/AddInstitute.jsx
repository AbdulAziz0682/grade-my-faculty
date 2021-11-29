import React from 'react';

import {
  Typography,
  Card,
  TextField,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';

import { Clear, Add } from '@mui/icons-material';

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import { NEW_INSTITUTE, INSTITUTES } from '../../graphqlQueries';

export default function AddInstitute() {
  // Chip select requirements
  const [courses, setCourses] = React.useState([]);
  const [currentText, setCurrentText] = React.useState('');
  function handleDelete(course) {
    setCourses(courses.filter((c) => c !== course.toUpperCase()));
  }
  // --------------------------------------
  const dispatch = useDispatch();
  const [newInstitute, { loading }] = useMutation(
    NEW_INSTITUTE,
    { refetchQueries: [{ query: INSTITUTES }] },
  );
  // Form requirements
  const schema = yup.object({
    name: yup.string().required('Name is required').min(2, 'Enter at least 2 characters'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: schema,
    onSubmit: (values) => newInstitute({ variables: { ...values, courses } })
      .then(() => dispatch(addToast({ message: 'Institute added successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">Add Institute</Typography>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6} component="form" onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          fullWidth
          required
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
          required
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
                    setCourses([...courses, currentText]);
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
              : 'Add'
          }
        </Button>
      </Card>
    </div>
  );
}
