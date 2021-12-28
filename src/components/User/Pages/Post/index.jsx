/* eslint-disable no-underscore-dangle */
import React from 'react';

import {
  Grid,
  Typography,
  Container,
  Paper,
  Icon,
  Button,
} from '@mui/material';

import moment from 'moment';

import { useHistory, Redirect } from 'react-router-dom';

import media3 from '../../../../assets/media3.png';
import beardGuy from '../../../../assets/beardGuy.svg';
import facebook from '../../../../assets/primaryFacebook.svg';
import instagram from '../../../../assets/primaryInstagram.svg';
import twitter from '../../../../assets/primaryTwitter.svg';
// import startupIdea from '../../../../assets/startupIdea.png';
// import postAsset from '../../../../assets/postAsset.png';
// import banner2 from '../../../../assets/banner2.png';

export default function Post() {
  const history = useHistory();
  const blog = history.location.state[0];
  const blogs = history.location.state[1];
  const ads = history.location.state[2];
  function getImgSrc(content) {
    const src = (/<img src="([^"]*([^"]*(?:[^\\"]|\\\\|\\")*)+)"/g).exec(content);
    return src ? src[0].slice(10, -1) : media3;
  }
  function getFirstPara(content) {
    const para = String(content);
    return para.replaceAll('<img', '<imx');
  }
  if (!blog || !blogs || blogs.length === 0) return <Redirect push to="/blog" />;
  return (
    <Grid container className="flex-grow bg-gray-50">
      <Container maxWidth="xl" className="flex flex-col justify-between md:flex-row md:gap-6" style={{ minHeight: '170vh' }}>
        <div className="flex-grow w-full md:w-9/12">
          <div className="flex flex-col w-full h-auto gap-6 py-14">
            <Typography variant="h3">
              { blog.title }
            </Typography>
            {
              ads && <div dangerouslySetInnerHTML={{ __html: ads[0].code }} className="flex items-center justify-center w-full" />
            }
            <div className="flex justify-between w-full gap-3">
              <div className="flex items-center gap-3">
                <img src={beardGuy} alt="faculty profile" className="w-12 h-12" />
                <div className="flex flex-col">
                  <Typography className="font-semibold">{ blog?.writtenBy?.name || 'N/A' }</Typography>
                  <Typography className="text-sm">{ moment(blog.createdAt).format('DD-MM-YYYY') }</Typography>
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
            <div className="block w-full" dangerouslySetInnerHTML={{ __html: blog.content }} />
            {
              ads && ads.slice(1, 2).map((ad) => (
                <div
                  dangerouslySetInnerHTML={{ __html: ad.code }}
                  className="flex flex-col justify-center px-6"
                />
              ))
            }
          </div>
        </div>
        <div className="flex-col items-end w-full h-auto gap-10 pb-2 lg:flex md:w-3/12 pt-14">
          {
            blogs.map(
              (blg, idx, arr) => (
                <Paper elevation={3} key={blg._id} className="flex flex-col w-full gap-5 pb-3 my-6 transform lg:my-0">
                  <img src={getImgSrc(blg.content)} alt="blog" className="w-full" style={{ maxHeight: '200px' }} />
                  <div className="flex flex-col w-full gap-5 px-6">
                    <Typography className="text-sm text-gray-500 uppercase">{ moment(blg.createdAt).format('DD MMMM YYYY') }</Typography>
                    <Typography variant="h4">{blg.title}</Typography>
                    <Typography className="overflow-hidden font-semibold text-gray-500 max-h-20">
                      <span
                        dangerouslySetInnerHTML={{ __html: getFirstPara(blg.content) }}
                      />
                    </Typography>
                    <Button variant="text" color="primary" className="self-start pl-0" onClick={() => history.push('/post', [blg, arr, ads])}>Read more</Button>
                  </div>
                </Paper>
              ),
            ).slice(-3)
          }
          {
            ads && ads.slice(3).map((ad) => (
              <div
                dangerouslySetInnerHTML={{ __html: ad.code }}
                className="flex flex-col justify-center px-6"
              />
            ))
          }
          {/* <div className="flex flex-col justify-center px-6">
            <img className="self-center w-32" src={banner2} alt="banner" />
            <span className="flex flex-col gap-3 mt-12 w-44 px-9">
              <Typography className="text-xs font-semibold">
                SF Symbols were introduced during WWDC 2019 and are a
                big present for us developers.
              </Typography>
            </span>
            <Button
              variant="contained"
              className
              ="self-center w-32 h-6 p-4 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800"
            >
              Download
            </Button>
          </div> */}
        </div>
      </Container>
    </Grid>
  );
}
