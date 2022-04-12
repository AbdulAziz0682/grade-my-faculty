import React from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  List,
  ListItem,
  ListItemIcon,
  // ListItemText,
} from '@mui/material';

import { Circle } from '@mui/icons-material';

import { Link, useHistory } from 'react-router-dom';

export default function EmailVerification() {
  const history = useHistory();
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container maxWidth="xl" className="flex items-center justify-center py-20">
        <Paper component="form" className="flex flex-col gap-6 px-3 pt-8 pb-16 sm:w-4/6 lg:w-4/6 md:px-16 rounded-xl">
          <Typography variant="h3" style={{ fontFamily: 'montserrat' }}>Check your email</Typography>
          <Typography variant="body1">
            We have sent a message to&nbsp;
            <b>{history.location.state?.at(0)?.email || ' '}</b>
            &nbsp;with a link to activate your account.
          </Typography>
          <Typography variant="body1" className="font-bold">
            Didn&apos;t get an email?
          </Typography>
          <Typography variant="body1">
            If you don&apos;t see an email from us within a few minutes,
            a few things could have happened:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><Circle style={{ width: '15px', height: '15px' }} /></ListItemIcon>
              <Typography>
                The email is in your spam folder. (Sometimes things get lost in there.)
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon><Circle style={{ width: '15px', height: '15px' }} /></ListItemIcon>
              <Typography>
                The email address you entered had a mistake or typo. (Happens to the best of us.)
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon><Circle style={{ width: '15px', height: '15px' }} /></ListItemIcon>
              <Typography>
                You accidently gave us an other email address. (Usually a work or personal one
                instead of the one you meant.)
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon><Circle style={{ width: '15px', height: '15px' }} /></ListItemIcon>
              <Typography>
                We can not deliver the email to this address. (Usually because of corporate
                firewalls or filtering.)
              </Typography>
            </ListItem>
          </List>
          <Link to="/signup">
            <Typography color="blue">Re-enter your email and try again</Typography>
          </Link>
        </Paper>
      </Container>
    </Grid>
  );
}
