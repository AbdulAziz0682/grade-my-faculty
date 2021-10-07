/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';

import {
  Grid,
  Typography,
  Select,
  MenuItem,
  // Autocomplete,
  // TextField,
} from '@mui/material';
import Container from '@mui/material/Container';
import Hidden from '@mui/material/Hidden';

import { Search } from '@mui/icons-material';

import help from '../../../../assets/help.svg';
import evaluation from '../../../../assets/evaluation.svg';
import compare from '../../../../assets/compare.svg';
import homeImg from '../../../../assets/homeImg.svg';

function getList(searchBy, universities, faculty) {
  if (searchBy === 'university') return [...universities.map((uni) => <MenuItem className="bg-gray-50" value={uni.name}>{uni.name}</MenuItem>)];
  return [...faculty.map((member) => (
    <MenuItem value={member.name} className="bg-gray-50">
      <div className="flex items-end justify-between gap-3 overflow-auto pb-2" style={{ fontFamily: 'montserrat' }}>
        <div className="flex flex-col">
          <p className="text-gray-600">{member.name}</p>
          <span className="text-primary text-xs">{member.subject}</span>
        </div>
        <p className="font-bold">{member.university}</p>
      </div>
    </MenuItem>
  ))];
}

export default function Home() {
  const ref = useRef();
  const [searchBy, setSearchBy] = React.useState('university');
  // const [searchText, setSearchText] = React.useState('');
  const universities = [
    { name: 'University of Dhaka' },
    { name: 'University of Lahore' },
    { name: 'University of Karachi' },
  ];
  const faculty = [
    { name: 'Abdul Kalam', subject: 'Mathematics', university: 'North South University' },
    { name: 'Abdul Salam', subject: 'Mathematics', university: 'North South University' },
    { name: 'Shaikh Saadi', subject: 'Mathematics', university: 'North South University' },
  ];
  const [value, setValue] = React.useState('');
  React.useEffect(() => {
    setValue(searchBy === 'university' ? universities[universities.length - 1] : faculty[faculty.length - 1]);
  }, [searchBy]);
  return (
    <>
      <Grid container className="flex-grow">
        <Container>
          <Grid container alignItems="center" className="pt-12 pb-60" columnSpacing={2}>
            <Grid item xs={12} md={8} className="h-full flex justify-center flex-col">
              <Typography style={{ lineHeight: '4rem' }} className="text-3xl md:text-5xl font-bold">
                View Evaluations and&nbsp;
                <span className="text-primary">Grade</span>
                &nbsp;Your Faculty Members
              </Typography>
              <Grid container className="rounded h-16 py-2 md:w-11/12">
                <Grid item xs={10} md={4} sx={{ order: 1 }}>
                  <Select
                    variant="outlined"
                    ref={ref}
                    className="bg-primary h-14 w-full text-white"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    classes={{
                      icon: 'text-white',
                    }}
                  >
                    <MenuItem value="university">Search by University</MenuItem>
                    <MenuItem value="name">Search by Faculty</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={7} sx={{ order: { xs: 3, md: 2 } }} className="mt-1 md:mt-0">
                  <Select
                    variant="outlined"
                    className="bg-gray-100 h-14"
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    {getList(searchBy, universities, faculty)}
                  </Select>
                </Grid>
                <Grid item sx={{ order: { xs: 2, md: 3 }, flexGrow: 1 }}>
                  <span className="bg-primary h-14 px-3 flex items-center justify-center rounded-r">
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
      <Grid container className="bg-primaryLight flex-grow">
        <Container className="p-16 flex justify-center">
          <Grid container spacing={6}>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={help} alt="help others" className="w-24" />
              <Typography className="text-white text-center font-bold capitalize py-3">Help other students 100% anonymous</Typography>
              <Typography className="text-white flex flex-wrap" align="center">
                Lorem ipsum dolor sit amet,
                eum et consul accusam urbanitas,
                vel ne commodo persecuti, nam et tamquam qualisque.
              </Typography>
            </Grid>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={evaluation} alt="help others" className="w-24" />
              <Typography className="text-white text-center font-bold capitalize py-3">Reliable evaluation from your peers</Typography>
              <Typography className="text-white flex flex-wrap" align="center">
                Lorem ipsum dolor sit amet, eum et
                consul accusam urbanitas, vel ne
                commodo persecuti, nam et
                tamquam qualisque.
              </Typography>
            </Grid>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={compare} alt="help others" className="w-24" />
              <Typography className="text-white text-center font-bold capitalize py-3">Compare faculty members</Typography>
              <Typography className="text-white flex flex-wrap" align="center">
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
