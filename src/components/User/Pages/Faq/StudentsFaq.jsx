import React from 'react';

import {
  Grid,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function StudentsFaq() {
  return (
    <Grid container className="flex-grow bg-pageBg">
      <Container>
        <Grid container direction="column" className="pt-16 pb-60">
          <Grid item className="w-full">
            <Typography variant="h1" align="center"> Student&apos;s FAQ </Typography>
          </Grid>
          <Grid item className="w-full">
            <Accordion>
              <AccordionSummary className="px-3 md:px-9" expandIcon={<ExpandMoreIcon htmlColor="white" sx={{ bgcolor: 'primary.main', width: '2.5rem', height: '2.5rem' }} />}>
                <Typography variant="h4">First faq related to student will be here</Typography>
              </AccordionSummary>
              <AccordionDetails className="px-3 bg-gray-200 md:px-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.
                <br />
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary className="px-3 md:px-9" expandIcon={<ExpandMoreIcon htmlColor="white" sx={{ bgcolor: 'primary.main', width: '2.5rem', height: '2.5rem' }} />}>
                <Typography variant="h4">Second faq related to student will be here</Typography>
              </AccordionSummary>
              <AccordionDetails className="px-3 bg-gray-200 md:px-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.
                <br />
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary className="px-3 md:px-9" expandIcon={<ExpandMoreIcon htmlColor="white" sx={{ bgcolor: 'primary.main', width: '2.5rem', height: '2.5rem' }} />}>
                <Typography variant="h4">Third faq related to student will be here</Typography>
              </AccordionSummary>
              <AccordionDetails className="px-3 bg-gray-200 md:px-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit
                in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.
                <br />
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
