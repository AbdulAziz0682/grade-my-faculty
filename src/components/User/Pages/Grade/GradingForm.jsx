import React from 'react';

import {
  Grid,
  Container,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

import media2 from '../../../../assets/media2.png';
import CustomCheckBox from '../../../CustomCheckBox';

function RadioCheckedIcon() {
  return (
    <span style={{ borderWidth: '6px' }} className="w-6 h-6 rounded-full border-primary" />
  );
}

function RadioIcon() {
  return (
    <span style={{ borderWidth: '3px' }} className="w-6 h-6 border-gray-400 rounded-full" />
  );
}

function CustomRadio(props) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<RadioCheckedIcon />}
      icon={<RadioIcon />}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

export default function GradingForm() {
  const history = useHistory();
  const faculty = useHistory().location.state[0];
  return (
    <Grid container className="flex-grow">
      <Container maxWidth="xl" className="flex flex-col justify-between md:flex-row md:gap-9">
        <div className="flex flex-col w-full lg:w-9/12 py-14">
          <Typography variant="h3">Your turn to grade</Typography>
          <Paper elevation={5} className="flex flex-col gap-2 p-4 mt-9 rounded-2xl lg:px-16 lg:py-8 bg-gray-50">
            <Typography className="text-3xl font-bold text-primary">{faculty.name}</Typography>
            <Typography className="my-1 text-sm text-gray-600">{faculty.university}</Typography>
            <Typography>
              {faculty.department}
              &nbsp;Department
            </Typography>
            <Typography>
              Courses:
              { faculty.courses.map(
                (course) => (
                  <span>
                    &nbsp;
                    {course}
                    ,
                  </span>
                ),
              )}
              &nbsp;
              and so on.
            </Typography>
          </Paper>
          <Paper elevation={5} className="flex flex-col gap-2 p-4 mt-9 rounded-2xl lg:px-16 lg:py-8 bg-gray-50">
            <Typography variant="h4" className="pb-3 border-b-2 border-black">Couple of Things to Remember</Typography>
            <Grid container className="mt-5" columnSpacing={3}>
              <Grid item xs={12} md={6} className="pr-9">
                <Typography variant="h5">Do&apos;s</Typography>
                <br />
                <ul className="ml-4 list-disc">
                  <li><Typography>Be Honest</Typography></li>
                  <li><Typography>Check course code</Typography></li>
                  <li>
                    <Typography>
                      Discuss the faculty&apos;s
                      teaching style and abilities
                    </Typography>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} md={6} className="pr-9">
                <Typography variant="h5">Don&apos;t&apos;s</Typography>
                <br />
                <ul className="ml-4 list-disc">
                  <li><Typography>No profanity</Typography></li>
                  <li><Typography>No name calling</Typography></li>
                  <li>
                    <Typography>
                      Don&apos;t share personal information
                      of you and others
                    </Typography>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={5} className="flex flex-col gap-6 p-4 mt-9 rounded-2xl lg:px-16 lg:py-8 bg-gray-50">
            <div className="flex flex-col gap-6 mx-2">
              <Typography variant="h4" className="pb-3 -mx-2 border-b-2 border-black">Let&apos;s start with basic questions</Typography>
              <Typography className="text-xl">1. What class did you take with this faculty member?</Typography>
              <Select variant="outlined" className="rounded-none w-60" value={faculty.courses[0]}>
                {
                  faculty.courses.map((c) => <MenuItem value={c}>{c}</MenuItem>)
                }
              </Select>
              <Typography className="text-xl">2. When did you take this class?</Typography>
              <Select variant="outlined" className="rounded-none w-60" value="Summer 2021">
                <MenuItem value="Summer 2021">Summer 2021</MenuItem>
                <MenuItem value="Spring 2021">Spring 2021</MenuItem>
              </Select>
              <Typography className="text-xl">3. What grade did you recieve?</Typography>
              <Select variant="outlined" className="rounded-none w-60" value="N/A">
                <MenuItem value="N/A">N/A</MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
              </Select>
              <Typography variant="h4" className="pb-3 -mx-2 border-b-2 border-black">Time to actually grade and evaluate your faculty</Typography>
              <Typography className="text-xl">4. Overall Rating?</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  defaultValue="1"
                  name="radio-buttons-group"
                  className="flex flex-row gap-3 -mt-2"
                >
                  <FormControlLabel value="1" control={<CustomRadio />} label="1" />
                  <FormControlLabel value="2" control={<CustomRadio />} label="2" />
                  <FormControlLabel value="3" control={<CustomRadio />} label="3" />
                  <FormControlLabel value="4" control={<CustomRadio />} label="4" />
                  <FormControlLabel value="5" control={<CustomRadio />} label="5" />
                </RadioGroup>
              </FormControl>
              <Typography className="text-xl">5. Difficulty Level?</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  defaultValue="1"
                  name="radio-buttons-group"
                  className="flex flex-row gap-3 -mt-2"
                >
                  <FormControlLabel value="1" control={<CustomRadio />} label="1" />
                  <FormControlLabel value="2" control={<CustomRadio />} label="2" />
                  <FormControlLabel value="3" control={<CustomRadio />} label="3" />
                  <FormControlLabel value="4" control={<CustomRadio />} label="4" />
                  <FormControlLabel value="5" control={<CustomRadio />} label="5" />
                </RadioGroup>
              </FormControl>
              <Typography className="text-xl">6. Select the tags that describe the faculty</Typography>
              <div className="flex flex-col gap-5 md:gap-0 md:flex-row">
                <div className="flex flex-col w-full gap-2 md:w-1/3">
                  <Typography className="font-bold">Workload</Typography>
                  <CustomCheckBox label="Lots of Homework" labelClassName="font-semibold text-gray-500" checked setChecked={() => false} />
                  <CustomCheckBox label="Moderate exams" labelClassName="font-semibold text-gray-500" checked setChecked={() => false} />
                  <CustomCheckBox label="Hard grading" labelClassName="font-semibold text-gray-500" setChecked={() => false} />
                </div>
                <div className="flex flex-col w-full gap-2 md:w-1/3">
                  <Typography className="font-bold">Personality</Typography>
                  <CustomCheckBox label="Passionate" labelClassName="font-semibold text-gray-500" checked setChecked={() => false} />
                  <CustomCheckBox label="Motivational" labelClassName="font-semibold text-gray-500" checked setChecked={() => false} />
                  <CustomCheckBox label="Dedicated" labelClassName="font-semibold text-gray-500" setChecked={() => false} />
                </div>
                <div className="flex flex-col w-full gap-2 md:w-1/3">
                  <Typography className="font-bold">Extra</Typography>
                  <CustomCheckBox label="Caring" labelClassName="font-semibold text-gray-500" setChecked={() => false} />
                  <CustomCheckBox label="Long classes" labelClassName="font-semibold text-gray-500" checked setChecked={() => false} />
                  <CustomCheckBox label="Respected" labelClassName="font-semibold text-gray-500" setChecked={() => false} />
                </div>
              </div>
              <Typography className="text-xl">7. Would you take a class with this faculty again?</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  defaultValue="Yes"
                  name="radio-buttons-group"
                  className="flex flex-row gap-3 -mt-2"
                >
                  <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                  <FormControlLabel value="No" control={<CustomRadio />} label="No" />
                </RadioGroup>
              </FormControl>
              <Typography className="text-xl">8. Is attendance manadatory?</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  defaultValue="Yes"
                  name="radio-buttons-group"
                  className="flex flex-row gap-3 -mt-2"
                >
                  <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                  <FormControlLabel value="No" control={<CustomRadio />} label="No" />
                </RadioGroup>
              </FormControl>
              <Typography className="text-xl">Now, share your thoughts.</Typography>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                className="w-full md:w-4/6"
              />
              <Button variant="contained" className="self-center px-16 py-3 rounded-full">Submit</Button>
            </div>
          </Paper>
        </div>
        <div className="flex-col h-auto gap-10 lg:flex lg:w-3/12 py-14">
          <Typography variant="h4">Our Blog</Typography>
          {
            [1, 2, 3].map(
              () => (
                <Paper elevation={3} className="flex flex-col w-full gap-5 pb-3 my-6 lg:my-0">
                  <img src={media2} alt="blog" className="w-full" />
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
        </div>
      </Container>
    </Grid>
  );
}
