import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

import Utsho from '../../../../assets/Utsho.png';
import Sakib from '../../../../assets/Sakib.png';
import facebook from '../../../../assets/primaryFacebook.svg';
import instagram from '../../../../assets/primaryInstagram.svg';

export default function FacultyProfile({ faculty }) {
  return (
    <>
      <img src={faculty.name === 'Sakib' ? Sakib : Utsho} alt="faculty profile" className="w-20" />
      <Typography align="center" className="font-semibold text-medium">{faculty.name}</Typography>
      <div
        style={{
          display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <a href={faculty.facebookLink}>
          <Icon>
            <img src={facebook} alt="facebook" />
          </Icon>
        </a>
        <a href={faculty.instagramLink}>
          <Icon>
            <img src={instagram} alt="instagram" />
          </Icon>
        </a>
      </div>
    </>
  );
}

FacultyProfile.propTypes = {
  faculty: PropTypes.shape({
    name: PropTypes.string.isRequired,
    facebookLink: PropTypes.string.isRequired,
    instagramLink: PropTypes.string.isRequired,
  }).isRequired,
};
