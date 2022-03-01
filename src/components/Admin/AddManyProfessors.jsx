/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Typography,
  Card,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material';

import { useMutation, useQuery } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { addToast } from '../../redux/toastsActions';
import { setCurrentTab } from '../../redux/adminActions';

import {
  ADMIN_INSTITUTES,
  ADMIN_FACULTIES,
  NEW_FACULTIES,
  COUNT_ALL,
} from '../../graphqlQueries';

export default function AddManyProfessors() {
  const dispatch = useDispatch();
  const [error, setError] = React.useState(null);
  const { data, loading } = useQuery(ADMIN_INSTITUTES, { fetchPolicy: 'cache-and-network' });
  const [updateMember, { loading: loadingMutation }] = useMutation(
    NEW_FACULTIES, { refetchQueries: [{ query: ADMIN_FACULTIES }, { query: COUNT_ALL }] },
  );
  const [institute, setInstitute] = React.useState(-1);
  const inputRef = React.useRef();
  function handleUpload() {
    if (!inputRef?.current?.files[0]) return;
    updateMember({ variables: { jsonFile: inputRef.current.files[0], institute } })
      .then(() => {
        dispatch(addToast({ message: 'Faculties added successfully', severity: 'success' }));
        dispatch(setCurrentTab({ name: 'professors', data: null }));
      })
      .catch((r) => setError(r));
  }
  if (loading) return <div className="absolute inset-x-0 flex items-center justify-center"><CircularProgress /></div>;
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex flex-col w-full">
        <Typography className="ml-16 text-4xl text-gray-500">Add Many Professors</Typography>
        <Typography className="ml-16 text-gray-500">
          The data entered here should be in JSON file format (eg Faculties.json).
        </Typography>
        <Typography className="ml-16 text-gray-500">
          Note that trailing commas are not allowed in json file formats. You can validate your
          json file structure on different websites.
          The one acceptable json file is that has the content structure as follows:
          <pre>
            {
              `
              [
                {
                  "firstName": "Sahadet Hossain 9",
                  "lastName": "last name",
                  "department": "Mathematics",
                  "courses": [
                    "MAT116",
                    "MAT120",
                    "MAT125"
                  ]
                },
                {
                  "firstName": "Sahadet Hossain 10",
                  "lastName": "Khoso",
                  "email": "email@email.com",
                  "department": "Mathematics",
                  "courses": [
                    "MAT116",
                    "MAT120",
                    "MAT125"
                  ]
                }
              ]
              `
            }
          </pre>
        </Typography>
      </div>
      <Card className="flex flex-col w-full gap-3 p-14" elevation={6} component="form">
        <Typography variant="h6" className="font-bold">Select Institute:</Typography>
        <Select
          variant="standard"
          label="Institute"
          placeholder="Select Institute"
          className="w-full"
          name="institute"
          disabled={loading}
          value={institute}
          onChange={(e) => setInstitute(Number(e.target.value))}
        >
          <MenuItem key={-1} disabled vlaue="N/A">N/A</MenuItem>
          {
            data.institutes.map((inst) => (
              <MenuItem key={inst._id} value={inst._id}>{inst.name}</MenuItem>
            ))
          }
        </Select>
        <Typography variant="h6" className="font-bold">Upload JSON file:</Typography>
        <input type="file" ref={inputRef} className="w-full rounded-lg border-1" />
        {
          error && <Typography color="error" variant="subtitle1">{error?.message}</Typography>
        }
        <Button variant="contained" disabled={loadingMutation || institute === -1} onClick={() => handleUpload()} style={{ maxHeight: '38px' }} className="self-start w-3/12 py-3 px-9 shadow-primaryGlow">
          {
            loadingMutation
              ? <CircularProgress />
              : 'Add'
          }
        </Button>
      </Card>
    </div>
  );
}
