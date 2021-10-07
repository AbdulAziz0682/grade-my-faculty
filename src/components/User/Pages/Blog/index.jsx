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
    <div className="bg-pageBg flex-grow w-full">
      <Container>
        <Grid container direction="column" className="pt-16 pb-8">
          <Grid item className="w-full">
            <Typography variant="h2" align="center"> Our Blogs </Typography>
          </Grid>
        </Grid>
      </Container>
      <div className="w-full bg-primary">
        <Container className="flex flex-wrap p-16 justify-between">
          <Card className="w-72 my-1 flex-col">
            <img className="w-auto" src={media} alt="media" />
            <Typography className="font-semibold mt-8 mx-8">
              Steve Jobs helped launch her career. Now, her startup bring millions
            </Typography>
            <Typography className="text-primary my-4 mx-8">Brandon Games</Typography>
          </Card>
          <Card className="w-72 my-1 flex-col">
            <img className="w-auto" src={media} alt="media" />
            <Typography className="font-semibold mt-8 mx-8">
              Steve Jobs helped launch her career. Now, her startup bring millions
            </Typography>
            <Typography className="text-primary my-4 mx-8">Brandon Games</Typography>
          </Card>
          <Card className="w-72 my-1 flex-col">
            <img className="w-auto" src={media} alt="media" />
            <Typography className="font-semibold mt-8 mx-8">
              Steve Jobs helped launch her career. Now, her startup bring millions
            </Typography>
            <Typography className="text-primary my-4 mx-8">Brandon Games</Typography>
          </Card>
        </Container>
      </div>
      <div className="w-full">
        <Container className="flex flex-col pt-8 pb-16 gap-14">
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
          <div className="flex justify-center">
            <img className="w-auto" src={banner} alt="banner" />
            <span className="flex flex-col gap-3 w-1/6 px-9">
              <Typography className="text-white font-bold text-lg">Large Title</Typography>
              <Typography className="text-gray-600 text-xs">
                SF Symbols were introduced during WWDC 2019 and are a big present for us developers.
              </Typography>
            </span>
            <Button variant="contained" className="bg-blue-500 hover:bg-blue-800 text-white h-6 p-4 mt-9 rounded-lg">Download</Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
