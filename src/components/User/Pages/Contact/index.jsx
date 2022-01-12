import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

import axios from 'axios';

import { useDispatch } from 'react-redux';
import { addToast } from '../../../../redux/toastsActions';

export default function Contact() {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = React.useState(false);
  function handleSend(data) {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/contact`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setLoading(false);
        dispatch(addToast({ message: 'Message sent successfully', severity: 'success' }));
      })
      .catch((e) => {
        setLoading(false);
        dispatch(addToast({ message: e?.response?.data?.error || e.message || 'Error occurred', severity: 'error' }));
      });
  }
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center self-stretch justify-center pt-14 pb-28">
        <Paper component="form" className="p-10 md:w-4/6 rounded-xl">
          <div className="flex flex-col w-full h-full">
            <Typography variant="h3">Have Questions? Or, Suggestions?</Typography>
            <div className="flex flex-col flex-grow w-full gap-3 my-9">
              <div className="flex flex-col gap-3 md:flex-row">
                <TextField
                  required
                  placeholder="Full Name"
                  className="bg-gray-50 md:w-3/6"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
                <TextField
                  required
                  type="email"
                  placeholder="Email"
                  className="bg-gray-50 md:w-3/6"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <TextField
                required
                placeholder="Subject"
                className="bg-gray-50"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <TextField
                required
                placeholder="Message *"
                minRows={5}
                multiline
                className="flex-grow bg-gray-50"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <div>
              <Button variant="contained" disabled={loading} color="primary" sx={{ py: 2, width: '8rem', borderRadius: '6px' }} onClick={() => handleSend(form)}>
                {
                  loading
                    ? <CircularProgress />
                    : 'Send'
                }
              </Button>
            </div>
          </div>
        </Paper>
      </Container>
    </Grid>
  );
}
