/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

import {
  Card,
  Grid,
  Button,
  Typography,
  TextField,
  Chip,
} from '@mui/material';

import { Clear } from '@mui/icons-material';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function EditBlog({ blog }) {
  const editorState = EditorState.createEmpty();
  return (
    <div className="flex flex-col w-full h-auto">
      <Grid container justifyContent="center" rowSpacing={5} columnSpacing={15}>
        <Grid item xs={12} md={11}>
          <div className="flex flex-col items-center w-full mb-3 md:justify-between md:flex-row">
            <Typography variant="h2" className="text-gray-400 pb-9">Edit Post</Typography>
            <div className="flex-grow" />
            <Button variant="contained" color="error" className="px-9 shadow-redGlow">Delete Post</Button>
          </div>
          <Card className="flex flex-col w-full gap-3 p-14" elevation={6}>
            <TextField
              label="Post title"
              fullWidth
              variant="standard"
              value={blog.title}
            />
            <Editor
              editorState={editorState}
            />
            <div className="flex flex-wrap w-full gap-3 p-3">
              <Typography className="w-full -ml-2 text-sm">Tags</Typography>
              {
                blog.tags.map(
                  (tag) => <Chip label={tag} deleteIcon={<Clear />} onDelete={() => {}} />,
                )
              }
              <TextField
                fullWidth
                variant="standard"
              />
            </div>
            <Button variant="contained" style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">Update</Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

EditBlog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
  }).isRequired,
};
