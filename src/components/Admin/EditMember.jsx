/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';

import { useMutation } from '@apollo/client';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import { UPDATE_MEMBER, MEMBERS, COUNT_ALL } from '../../graphqlQueries';

async function getBase64Image(img) {
  if (!img) return '';
  // const res = {};
  const fd = new FormData();
  fd.append('image', img);
  const result = await (await fetch(`${process.env.REACT_APP_BACKEND_URL}/utilities/image-to-uri`, {
    method: 'POST',
    body: fd,
  })).json();
  return result;
}

export default function EditMember({ member }) {
  const dispatch = useDispatch();
  const [updateMember, { loading }] = useMutation(
    UPDATE_MEMBER, { refetchQueries: [{ query: MEMBERS }, { query: COUNT_ALL }] },
  );
  // Form requirements
  const imgRef = React.useRef();
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const schema = yup.object({
    image: yup.mixed().required('Image is required').test('fileSize', 'File should not be larger than 800kb', (value) => {
      if (!value) return true;
      return value.size <= 819200;
    }),
    name: yup.string().required('First name is required').min(2, 'Enter at least 2 characters'),
    role: yup.string().required('Last name is required').min(2, 'Enter at least 2 characters'),
    facebookLink: yup.string().matches(urlRegex, 'Not a valid link').required('Facebook link is required'),
    instagramLink: yup.string().matches(urlRegex, 'Not a valid link').required('Instagram link is required'),
    linkedinLink: yup.string().matches(urlRegex, 'Not a valid link').required('Linkedin link is required'),
  });
  const formik = useFormik({
    initialValues: {
      ...member,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const result = await getBase64Image(imgRef.current.files[0]);
      updateMember(
        { variables: { ...values, id: Number(member._id), image: result.imageURI } },
      )
        .then(() => dispatch(addToast({ message: 'Member updated successfully', severity: 'success' })))
        .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
    },
  });
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full gap-2 md:gap-9 md:flex-row md:items-center">
        <Typography className="ml-16 text-4xl text-gray-500">Edit Member</Typography>
      </div>
      <Card className="flex flex-col w-full gap-12 p-14" elevation={6} component="form" onSubmit={formik.handleSubmit}>
        <div className={`${formik.errors.image ? 'border-red-500' : ''} flex flex-col w-full border rounded-lg`}>
          <img
            className="self-center w-full max-w-xs"
            id="profile"
            src={(imgRef && (
              imgRef.current && (
                imgRef.current.files[0] && (
                  URL.createObjectURL(imgRef.current.files[0])
                )
              )
            )) || member.image}
            alt="preview"
          />
          <input
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={({ target }) => formik.setFieldValue('image', target.files[0])}
          />
          {formik.errors.image && <small className="text-red-500">{formik.errors.image}</small>}
        </div>
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
          label="Role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        />
        <TextField
          variant="standard"
          fullWidth
          required
          label="Facebook link"
          name="facebookLink"
          value={formik.values.facebookLink}
          onChange={formik.handleChange}
          error={formik.touched.facebookLink && Boolean(formik.errors.facebookLink)}
          helperText={formik.touched.facebookLink && formik.errors.facebookLink}
        />
        <TextField
          variant="standard"
          fullWidth
          required
          label="Instagram link"
          name="instagramLink"
          value={formik.values.instagramLink}
          onChange={formik.handleChange}
          error={formik.touched.instagramLink && Boolean(formik.errors.instagramLink)}
          helperText={formik.touched.instagramLink && formik.errors.instagramLink}
        />
        <TextField
          variant="standard"
          fullWidth
          required
          label="LinkedIn link"
          name="linkedinLink"
          value={formik.values.linkedinLink}
          onChange={formik.handleChange}
          error={formik.touched.linkedinLink && Boolean(formik.errors.linkedinLink)}
          helperText={formik.touched.linkedinLink && formik.errors.linkedinLink}
        />
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

EditMember.propTypes = {
  member: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    facebookLink: PropTypes.string.isRequired,
    instagramLink: PropTypes.string.isRequired,
    linkedinLink: PropTypes.string.isRequired,
  }).isRequired,
};
