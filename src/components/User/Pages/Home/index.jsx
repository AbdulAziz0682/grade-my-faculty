/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';

import {
  Grid,
  Typography,
  Select,
  MenuItem,
  Container,
  Hidden,
} from '@mui/material';

import { Search, KeyboardArrowDown } from '@mui/icons-material';

// import { useSelector } from 'react-redux';

import { useQuery } from '@apollo/client';
import { FACULTIES_AND_INSTITUTES } from '../../../../graphqlQueries';

import Autocomplete from '../../../UseAutocomplete';

import help from '../../../../assets/help.svg';
import evaluation from '../../../../assets/evaluation.svg';
import compare from '../../../../assets/compare.svg';
import homeImg from '../../../../assets/homeImg.svg';

export default function Home() {
  const ref = useRef();
  const { loading, data } = useQuery(FACULTIES_AND_INSTITUTES);
  // const faculty = useSelector((state) => state.faculty);
  const [searchBy, setSearchBy] = React.useState('university');
  /* const universities = [
    { name: 'North South University' },
    { name: 'Lahore University' },
    { name: 'Karachi University' },
  ]; */
  return (
    <>
      <Grid container className="flex-grow">
        <Container maxWidth="xl" className="md:pr-0">
          <Grid container alignItems="start" className="pt-12 pb-20 lg:pb-40" columnSpacing={2}>
            <Grid item xs={12} md={8} className="flex flex-col justify-center h-full gap-11 md:mt-9">
              <Typography className="text-4xl font-bold leading-12 md:leading-20 md:text-6xl">
                View Evaluations and&nbsp;
                <span className="text-primary">Grade</span>
                &nbsp;Your Faculty Members
              </Typography>
              <Grid container className="py-2 rounded md:w-11/12">
                <Grid item xs={10} md={4} sx={{ order: 1 }}>
                  <Select
                    variant="outlined"
                    ref={ref}
                    className="w-full text-white rounded-r-none bg-primary"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    IconComponent={KeyboardArrowDown}
                    classes={{ icon: 'text-white' }}
                    MenuProps={{
                      PaperProps: {
                        className: 'rounded-none shadow-none',
                      },
                      classes: {
                        list: 'py-0',
                      },
                    }}
                  >
                    <MenuItem value="university" style={{ border: '1px solid lightgray' }} className="py-3 font-semibold bg-gray-100">Search by University</MenuItem>
                    <MenuItem value="name" style={{ border: '1px solid lightgray' }} className="py-3 font-semibold bg-gray-100">Search by Faculty</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={7} sx={{ order: { xs: 3, md: 2 } }} className="mt-1 md:mt-0">
                  <Autocomplete
                    disabled={loading}
                    suggestions={searchBy === 'university' ? data?.institutes : data?.faculties}
                    data={data}
                  />
                </Grid>
                <Grid item xs={2} md={1} sx={{ order: { xs: 2, md: 3 } }}>
                  <span className="flex items-center justify-center px-3 rounded-r bg-primary" style={{ height: '57.4px' }}>
                    <Search htmlColor="white" />
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Hidden mdDown>
              <Grid item md={4}>
                <img src={homeImg} alt="person demonstrating" />
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </Grid>
      <Grid container className="flex-grow bg-primaryLight">
        <Container maxWidth="xl" className="flex justify-center px-12 py-20 md:px-36">
          <Grid container spacing={16}>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={help} alt="help others" className="w-24" />
              <Typography className="py-3 font-bold text-center text-white capitalize" sx={{ minHeight: '64px' }}>Help other students 100% anonymous</Typography>
              <Typography className="flex flex-wrap text-white" align="center">
                Lorem ipsum dolor sit amet,
                eum et consul accusam urbanitas,
                vel ne commodo persecuti, nam et tamquam qualisque.
              </Typography>
            </Grid>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={evaluation} alt="help others" className="w-24" />
              <Typography className="py-3 font-bold text-center text-white capitalize" sx={{ minHeight: '64px' }}>Reliable evaluation from your peers</Typography>
              <Typography className="flex flex-wrap text-white" align="center">
                Lorem ipsum dolor sit amet, eum et
                consul accusam urbanitas, vel ne
                commodo persecuti, nam et
                tamquam qualisque.
              </Typography>
            </Grid>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={compare} alt="help others" className="w-24" />
              <Typography className="py-3 font-bold text-center text-white capitalize" sx={{ minHeight: '64px' }}>Compare faculty members</Typography>
              <Typography className="flex flex-wrap text-white" align="center">
                Lorem ipsum dolor sit amet, eum et
                consul accusam urbanitas, vel ne
                commodo persecuti, nam et
                tamquam qualisque.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
