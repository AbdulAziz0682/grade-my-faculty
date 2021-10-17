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

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import help from '../../../../assets/help.svg';
import evaluation from '../../../../assets/evaluation.svg';
import compare from '../../../../assets/compare.svg';
import homeImg from '../../../../assets/homeImg.svg';

function getList(searchBy, universities, faculty, history) {
  if (searchBy === 'university') {
    return [...universities.map((uni) => <MenuItem sx={{ border: '1px solid' }} className="py-3 text-gray-400 bg-gray-100 border-gray-200" value={uni.name} onClick={() => history.push('/faculty', [uni.name])}>{uni.name}</MenuItem>)];
  }
  return [...faculty.map((member) => (
    <MenuItem value={member.name} sx={{ border: '1px solid' }} className="py-1 bg-gray-100 border-gray-200" onClick={() => history.push('/grade', [member])}>
      <div className="flex items-end justify-between gap-3 pb-2 overflow-auto" style={{ fontFamily: 'montserrat' }}>
        <div className="flex flex-col">
          <p className="text-gray-600">{member.name}</p>
          <span className="text-xs text-primary">
            {member.department}
            &nbsp;Department
          </span>
        </div>
        <p className="font-bold">{member.university}</p>
      </div>
    </MenuItem>
  ))];
}

export default function Home() {
  const ref = useRef();
  const history = useHistory();
  const faculty = useSelector((state) => state.faculty);
  const [searchBy, setSearchBy] = React.useState('university');
  // const [searchText, setSearchText] = React.useState('');
  const universities = [
    { name: 'North South University' },
    { name: 'Lahore University' },
    { name: 'Karachi University' },
  ];
  /* const faculty = [
    { name: 'Abdul Kalam', subject: 'Mathematics', university: 'North South University' },
    { name: 'Abdul Salam', subject: 'Mathematics', university: 'North South University' },
    { name: 'Shaikh Saadi', subject: 'Mathematics', university: 'North South University' },
  ]; */
  const [value, setValue] = React.useState('');
  React.useEffect(() => {
    setValue(searchBy === 'university' ? universities[universities.length - 1] : faculty[faculty.length - 1]);
  }, [searchBy]);
  return (
    <>
      <Grid container className="flex-grow">
        <Container maxWidth="xl" className="pr-0">
          <Grid container alignItems="center" className="pt-12 pb-60" columnSpacing={2}>
            <Grid item xs={12} md={8} className="flex flex-col justify-center h-full gap-11">
              <Typography style={{ lineHeight: '5rem' }} className="text-4xl font-bold md:text-6xl">
                View Evaluations and&nbsp;
                <span className="text-primary">Grade</span>
                &nbsp;Your Faculty Members
              </Typography>
              <Grid container className="h-16 py-2 rounded md:w-11/12">
                <Grid item xs={10} md={4} sx={{ order: 1 }}>
                  <Select
                    variant="outlined"
                    ref={ref}
                    className="w-full text-white rounded-r-none bg-primary h-14"
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
                    <MenuItem value="university" style={{ border: '1px solid lightgray' }} className="py-3 text-gray-400 bg-gray-100">Search by University</MenuItem>
                    <MenuItem value="name" style={{ border: '1px solid lightgray' }} className="py-3 text-gray-400 bg-gray-100">Search by Faculty</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={7} sx={{ order: { xs: 3, md: 2 } }} className="mt-1 md:mt-0">
                  <Select
                    variant="outlined"
                    className="text-gray-400 bg-gray-100 rounded-none h-14"
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    IconComponent=""
                    MenuProps={{
                      PaperProps: {
                        className: 'shadow-none rounded-none',
                      },
                      classes: {
                        list: 'py-0',
                      },
                    }}
                  >
                    {getList(searchBy, universities, faculty, history)}
                  </Select>
                </Grid>
                <Grid item sx={{ order: { xs: 2, md: 3 }, flexGrow: 1 }}>
                  <span className="flex items-center justify-center px-3 rounded-r bg-primary h-14">
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
        <Container maxWidth="xl" className="flex justify-center px-24 py-20 md:px-36">
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
