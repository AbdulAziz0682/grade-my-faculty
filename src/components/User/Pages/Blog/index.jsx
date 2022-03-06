/* eslint-disable no-underscore-dangle */
import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Card, CircularProgress } from '@mui/material';

import { ArrowForward } from '@mui/icons-material';

import { useQuery } from '@apollo/client';

import { useHistory } from 'react-router-dom';

import media from '../../../../assets/media.svg';
// import banner from '../../../../assets/banner.png';

import { BLOGS_AND_ADMINS_AND_ADS } from '../../../../graphqlQueries';

export default function AboutUs() {
  const history = useHistory();
  const [limit, setLimit] = React.useState(3);
  const { loading, data } = useQuery(
    BLOGS_AND_ADMINS_AND_ADS,
    { fetchPolicy: 'cache-and-network', variables: { limit, locationId: '/blog' } },
  );
  if (loading) return <span className="absolute inset-x-0 flex justify-center mt-16"><CircularProgress /></span>;
  function getImgSrc(content) {
    const src = (/<img src="([^"]*([^"]*(?:[^\\"]|\\\\|\\")*)+)"/g).exec(content);
    return src ? src[0].slice(10, -1) : media;
  }
  return (
    <div className="flex-grow w-full bg-pageBg">
      <Container maxWidth="xl">
        <Grid container direction="column" className="pt-16 pb-8">
          <Grid item className="w-full">
            <Typography variant="h2" align="center" color="primary"> Our Blogs </Typography>
          </Grid>
        </Grid>
      </Container>
      <div className="w-full bg-primary">
        <Container maxWidth="xl" className="flex flex-wrap justify-center gap-10 p-16 ">
          {
            data.blogs.map((blog) => (
              <Card key={blog._id} className="flex-col my-1 cursor-pointer w-80" onClick={() => history.push(`/post/${blog._id}`, [blog])}>
                <img className="w-auto" style={{ maxHeight: '170px', width: '100%' }} src={getImgSrc(blog.content)} alt="media" />
                <Typography className="mx-8 mt-8 font-semibold">
                  { blog.title }
                </Typography>
                <Typography className="mx-8 my-4 text-primary">
                  { blog.writtenBy.name }
                </Typography>
              </Card>
            ))
          }
        </Container>
      </div>
      <div className="w-full">
        <Container maxWidth="xl" className="flex flex-col pt-8 pb-16 gap-14">
          <div className="flex items-center justify-center">
            <Button
              variant="contained"
              color="primary"
              className="px-8 py-4"
              endIcon={<ArrowForward />}
              disabled={data.allBlogs <= limit}
              onClick={() => setLimit((lim) => lim + 3)}
            >
              Load More
            </Button>
          </div>
          {
            data.ads.slice(-3).filter((a) => a.locationId === '/blog')
              .map((ad) => (
                <div
                  dangerouslySetInnerHTML={{ __html: ad.code }}
                  className="flex flex-col md:flex-row md:justify-center"
                />
              ))
          }
        </Container>
      </div>
    </div>
  );
}
