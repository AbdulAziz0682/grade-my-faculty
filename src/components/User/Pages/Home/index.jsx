/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';

import {
  Grid,
  Typography,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material';
import Container from '@mui/material/Container';
import Hidden from '@mui/material/Hidden';

import { Search } from '@mui/icons-material';

import help from '../../../../assets/help.svg';
import evaluation from '../../../../assets/evaluation.svg';
import compare from '../../../../assets/compare.svg';
import homeImg from '../../../../assets/homeImg.svg';

export default function Home() {
  const ref = useRef();
  const [searchBy, setSearchBy] = useState('university');
  const [searchText, setSearchText] = useState('');
  const universities = [
    { label: 'University of Dhaka' },
    { label: 'University of Lahore' },
    { label: 'University of Karachi' },
  ];
  const names = [
    { label: 'Abdul Kalam', subject: 'Mathematics', university: 'North South University' },
    { label: 'Abdul Salam', subject: 'Mathematics', university: 'North South University' },
    { label: 'Shaikh Saadi', subject: 'Mathematics', university: 'North South University' },
  ];
  const [value, setValue] = React.useState(universities[0]);
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
                  <Autocomplete
                    id="free-solo-2-demo"
                    disableClearable
                    freeSolo
                    getOptionLabel={(option) => option.label}
                    options={searchBy === 'university' ? universities : names}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    inputValue={searchText}
                    onInputChange={(e, val) => setSearchText(val)}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Search input"
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                          className: 'h-14 bg-gray-200',
                        }}
                      />
                    )}
                    renderOption={(props, option) => {
                      if (searchBy === 'university') {
                        return (
                          <MenuItem {...props}>{option.label}</MenuItem>
                        );
                      }
                      return (
                        <MenuItem {...props}>
                          <div className="flex items-end justify-between gap-3 overflow-auto" style={{ fontFamily: 'montserrat' }}>
                            <div className="flex flex-col">
                              <p className="text-gray-600">{option.label}</p>
                              <span className="text-primary text-xs">{option.subject}</span>
                            </div>
                            <p className="font-bold">{option.university}</p>
                          </div>
                        </MenuItem>
                      );
                    }}
                  />
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
