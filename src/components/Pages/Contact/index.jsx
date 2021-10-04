import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';

export default function Contact() {
  return (
    <Grid container sx={{ minHeight: '75vh' }} className="h-full bg-pageBg py-6">
      <Container className="flex items-center justify-center self-stretch">
        <Paper component="form" className="md:w-4/6 p-10">
          <div className="flex flex-col w-full h-full">
            <Typography variant="h3">Have Questions? Or, Suggestions?</Typography>
            <div className="flex flex-col gap-3 flex-grow w-full my-9">
              <div className="flex flex-col md:flex-row gap-3">
                <TextField
                  required
                  placeholder="Full Name *"
                  className="bg-gray-50 md:w-3/6"
                />
                <TextField
                  required
                  placeholder="Email *"
                  className="bg-gray-50 md:w-3/6"
                />
              </div>
              <TextField
                required
                placeholder="Subject *"
                className="bg-gray-50"
              />
              <TextField
                required
                placeholder="Message *"
                minRows={5}
                multiline
                className="bg-gray-50 flex-grow"
              />
            </div>
            <div>
              <Button variant="contained" color="primary" sx={{ py: 2, width: '8rem', borderRadius: '6px' }}>Send</Button>
            </div>
          </div>
        </Paper>
      </Container>
    </Grid>
  );
}
