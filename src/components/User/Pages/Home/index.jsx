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
  const universities = ['University of Dhaka', 'University of Lahore', 'University of Karachi'];
  const names = ['Abdul Kalam', 'Abdul Salam', 'Shaikh Saadi'];
  const [value, setValue] = React.useState(universities[0]);
  return (
    <>
      <Grid container className="flex-grow">
        <Container>
          <Grid container alignItems="center" className="pt-12 pb-60" columnSpacing={2}>
            <Grid item xs={12} md={8} className="h-full flex justify-center flex-col">
              <Typography className="text-3xl md:text-5xl font-bold">
                View Evaluations and&nbsp;
                <span className="text-primary">Grade</span>
                &nbsp;Your Faculty Members
              </Typography>
              <div className="w-full flex rounded h-16 py-2">
                <Select
                  variant="outlined"
                  ref={ref}
                  className="bg-primary text-white md:px-2 w-auto"
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <MenuItem value="university">Search by University</MenuItem>
                  <MenuItem value="name">Search by Faculty</MenuItem>
                </Select>
                {/* <input className="bg-gray-100 h-full px-3 w-3/6" /> */}
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  className="h-full w-3/6"
                  options={searchBy === 'university' ? universities : names}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  inputValue={searchText}
                  onInputChange={(e, val) => setSearchText(val)}
                  renderInput={(params) => (
                    <TextField
                      label="Search input"
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
                <span className="bg-primary h-full px-1 md:px-3 flex items-center rounded-r">
                  <Search htmlColor="white" />
                </span>
              </div>
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
        <Container className="p-16">
          <Grid container spacing={6}>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={help} alt="help others" className="w-24" />
              <Typography className="text-white font-bold capitalize py-3">Help other students 100% anonymous</Typography>
              <Typography className="text-white flex flex-wrap" align="center">
                Lorem ipsum dolor sit amet,
                eum et consul accusam urbanitas,
                vel ne commodo persecuti, nam et tamquam qualisque.
              </Typography>
            </Grid>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={evaluation} alt="help others" className="w-24" />
              <Typography className="text-white font-bold capitalize py-3">Reliable evaluation from your peers</Typography>
              <Typography className="text-white flex flex-wrap" align="center">
                Lorem ipsum dolor sit amet, eum et
                consul accusam urbanitas, vel ne
                commodo persecuti, nam et
                tamquam qualisque.
              </Typography>
            </Grid>
            <Grid item md={4} className="flex flex-col items-center">
              <img src={compare} alt="help others" className="w-24" />
              <Typography className="text-white font-bold capitalize py-3">Compare faculty members</Typography>
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
