import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Button,
  Card,
  CircularProgress,
} from '@mui/material';

import { useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';

import { ABOUT_US, UPDATE_ABOUT_US } from '../../graphqlQueries';

export default function AboutUs({ ourStory, whoWeAre, ourMission }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({ ourStory, whoWeAre, ourMission });
  const [updateAboutUs, { loading }] = useMutation(
    UPDATE_ABOUT_US,
    { refetchQueries: [{ query: ABOUT_US }] },
  );
  function handleUpdate() {
    updateAboutUs({ variables: state })
      .then(() => dispatch(addToast({ message: 'Updated About Us successfully', severity: 'success' })))
      .catch((r) => dispatch(addToast({ message: r.message, severity: 'error' })));
  }
  return (
    <Card elevation={1} className="flex flex-col gap-12 px-3 py-8 md:px-14">
      <TextField
        variant="standard"
        multiline
        label="Our Story"
        className="w-full"
        value={state.ourStory}
        onChange={(e) => setState({ ...state, ourStory: e.target.value })}
      />
      <TextField
        variant="standard"
        multiline
        label="Who we are?"
        className="w-full"
        value={state.whoWeAre}
        onChange={(e) => setState({ ...state, whoWeAre: e.target.value })}
      />
      <TextField
        variant="standard"
        multiline
        label="Our Mission"
        className="w-full"
        value={state.ourMission}
        onChange={(e) => setState({ ...state, ourMission: e.target.value })}
      />
      <Button variant="contained" disabled={loading} onClick={() => handleUpdate()}>
        {
          loading
            ? <CircularProgress />
            : 'Update'
        }
      </Button>
    </Card>
  );
}

AboutUs.defaultProps = {
  ourStory: '',
  whoWeAre: '',
  ourMission: '',
};

AboutUs.propTypes = {
  ourStory: PropTypes.string,
  whoWeAre: PropTypes.string,
  ourMission: PropTypes.string,
};
