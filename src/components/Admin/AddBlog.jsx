/* eslint-disable no-underscore-dangle */
import React from 'react';

import JoditEditor from 'jodit-react';

import {
  Card,
  Grid,
  Button,
  Typography,
  TextField,
  Chip,
  CircularProgress,
} from '@mui/material';

import { Clear, Add } from '@mui/icons-material';

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import { BLOGS, NEW_BLOG } from '../../graphqlQueries';

export default function AddBlog() {
  const admin = useSelector((state) => state.account.admin);
  // Chip select requirements
  const [tags, setTags] = React.useState([]);
  const [currentText, setCurrentText] = React.useState('');
  function handleDelete(course) {
    setTags(tags.filter((c) => c !== course.toUpperCase()));
  }
  // --------------------------
  // Editor requirements
  const config = {
    readonly: false,
  };
  // console.log(editor?.current.component.OPTIONS);
  // ----------------------------------------
  const dispatch = useDispatch();
  const [newBlog, { loading }] = useMutation(
    NEW_BLOG,
    { refetchQueries: [{ query: BLOGS }] },
  );
  // Form requirements
  const schema = yup.object({
    title: yup.string().required('Title is required').min(2, 'Enter at least 2 characters'),
    content: yup.string().required('Content is required').min(50, 'Enter at least 50 characters'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: schema,
    onSubmit: (values) => newBlog({ variables: { ...values, tags, writtenBy: Number(admin._id) } })
      .then(() => dispatch(addToast({ message: 'Blog added successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' }))),
  });
  // -------------------------

  return (
    <div className="flex flex-col w-full h-auto">
      <Grid container justifyContent="center" rowSpacing={5} columnSpacing={15}>
        <Grid item xs={12} md={11}>
          <Typography className="text-3xl text-gray-400 pb-9">Add Post</Typography>
          <Card className="flex flex-col w-full gap-3 p-14" component="form" onSubmit={formik.handleSubmit} elevation={6}>
            <TextField
              variant="standard"
              fullWidth
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <div className={`w-full block ${formik.errors.content && 'border border-red-600'}`}>
              <JoditEditor
                value={formik.values.content}
                config={config}
                onBlur={(newContent) => formik.setFieldValue('content', newContent)}
              />
              {formik.errors.content && <p className="text-xs text-red-500">{formik.errors.content}</p>}
            </div>
            <div className="flex flex-wrap w-full gap-3 p-3">
              <Typography className="w-full -ml-2 text-sm">Tags</Typography>
              {
                tags.map(
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
                        setTags([...tags, currentText.trim()]);
                        setCurrentText('');
                      }}
                    >
                      <Add />
                    </Button>
                  ),
                }}
              />
            </div>
            <Button type="submit" disabled={loading} variant="contained" style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">
              {
                loading
                  ? <CircularProgress />
                  : 'Add'
              }
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
