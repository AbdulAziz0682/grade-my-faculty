import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Card } from '@mui/material';

import { ArrowForward } from '@mui/icons-material';

import media from '../../../../assets/media.svg';
import banner from '../../../../assets/banner.png';

export default function AboutUs() {
  return (
    <div className="flex-grow w-full bg-pageBg">
      <Container maxWidth="xl">
        <Grid container direction="column" className="pt-16 pb-8">
          <Grid item className="w-full">
            <Typography variant="h2" align="center"> Our Blogs </Typography>
          </Grid>
        </Grid>
      </Container>
      <div className="w-full bg-primary">
        <Container maxWidth="xl" className="flex flex-wrap justify-between p-16">
          <Card className="flex-col my-1 w-72">
            <img className="w-auto" src={media} alt="media" />
            <Typography className="mx-8 mt-8 font-semibold">
              Steve Jobs helped launch her career. Now, her startup bring millions
            </Typography>
            <Typography className="mx-8 my-4 text-primary">Brandon Games</Typography>
          </Card>
          <Card className="flex-col my-1 w-72">
            <img className="w-auto" src={media} alt="media" />
            <Typography className="mx-8 mt-8 font-semibold">
              Steve Jobs helped launch her career. Now, her startup bring millions
            </Typography>
            <Typography className="mx-8 my-4 text-primary">Brandon Games</Typography>
          </Card>
          <Card className="flex-col my-1 w-72">
            <img className="w-auto" src={media} alt="media" />
            <Typography className="mx-8 mt-8 font-semibold">
              Steve Jobs helped launch her career. Now, her startup bring millions
            </Typography>
            <Typography className="mx-8 my-4 text-primary">Brandon Games</Typography>
          </Card>
        </Container>
      </div>
      <div className="w-full">
        <Container maxWidth="xl" className="flex flex-col pt-8 pb-16 gap-14">
          <div className="flex items-center justify-center">
            <Button
              variant="contained"
              color="primary"
              className="p-4"
              endIcon={<ArrowForward />}
            >
              Load More
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:justify-center">
            <img className="w-auto" src={banner} alt="banner" />
            <span className="flex flex-col gap-3 md:w-1/6 px-9">
              <Typography className="text-lg font-bold text-white">Large Title</Typography>
              <Typography className="text-xs text-gray-600">
                SF Symbols were introduced during WWDC 2019 and are a big present for us developers.
              </Typography>
            </span>
            <Button variant="contained" className="h-6 p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-800 mt-9">Download</Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
