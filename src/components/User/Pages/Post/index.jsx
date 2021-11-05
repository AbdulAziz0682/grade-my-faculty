import React from 'react';

import {
  Grid,
  Typography,
  Container,
  Paper,
  Icon,
  Button,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

import media3 from '../../../../assets/media3.png';
import beardGuy from '../../../../assets/beardGuy.svg';
import facebook from '../../../../assets/primaryFacebook.svg';
import instagram from '../../../../assets/primaryInstagram.svg';
import twitter from '../../../../assets/primaryTwitter.svg';
import startupIdea from '../../../../assets/startupIdea.png';
import postAsset from '../../../../assets/postAsset.png';
import banner2 from '../../../../assets/banner2.png';

export default function Post() {
  const history = useHistory();
  return (
    <Grid container className="flex-grow bg-gray-50">
      <Container maxWidth="xl" className="flex flex-col justify-between md:flex-row md:gap-6" style={{ minHeight: '170vh' }}>
        <div className="flex-grow w-full md:w-9/12">
          <div className="flex flex-col w-full h-auto gap-6 lg:w-11/12 py-14">
            <Typography variant="h3">
              Career with a BBA Degree is growing rapidly in all around the world,
              Let’s check the deep dive information about this.
            </Typography>
            <div className="flex justify-between w-full gap-3">
              <div className="flex items-center gap-3">
                <img src={beardGuy} alt="faculty profile" className="w-12 h-12" />
                <div className="flex flex-col">
                  <Typography className="font-semibold">Abdul Kalam</Typography>
                  <Typography className="text-sm">12-07-2020</Typography>
                </div>
              </div>
              <div
                style={{
                  display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <Icon>
                  <img src={facebook} alt="facebook" />
                </Icon>
                <Icon>
                  <img src={instagram} alt="instagram" />
                </Icon>
                <Icon>
                  <img src={twitter} alt="twittter" />
                </Icon>
              </div>
            </div>
            <img src={startupIdea} alt="startup idea" />
            <Typography className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est
              laborum.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est
              laborum.
            </Typography>
            <div className="flex flex-col w-full p-14">
              <img src={postAsset} alt="post asset" />
            </div>
            <Typography className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est
              laborum.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est
              laborum.
            </Typography>
          </div>
        </div>
        <div className="flex-col items-end w-full h-auto gap-10 pb-2 lg:flex md:w-3/12 pt-14">
          {
            [1, 2, 3].map(
              () => (
                <Paper elevation={3} className="flex flex-col w-full gap-5 pb-3 my-6 transform lg:my-0">
                  <img src={media3} alt="blog" className="w-full" />
                  <div className="flex flex-col w-full gap-5 px-6">
                    <Typography className="text-sm text-gray-500 uppercase">20 July 2019</Typography>
                    <Typography variant="h4">Life tips from top ten adventure travelers</Typography>
                    <Typography className="font-semibold text-gray-500">Slate helps you see how many more days you....</Typography>
                    <Button variant="text" color="primary" className="self-start pl-0" onClick={() => history.push('/post')}>Read more</Button>
                  </div>
                </Paper>
              ),
            )
          }
          <div className="flex flex-col justify-center px-6">
            <img className="self-center w-32" src={banner2} alt="banner" />
            <span className="flex flex-col gap-3 mt-12 w-44 px-9">
              <Typography className="text-xs font-semibold">
                SF Symbols were introduced during WWDC 2019 and are a
                big present for us developers.
              </Typography>
            </span>
            <Button variant="contained" className="self-center w-32 h-6 p-4 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800">Download</Button>
          </div>
        </div>
      </Container>
    </Grid>
  );
}
