import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

import beardGuy from '../../../../assets/beardGuy.svg';
import facebook from '../../../../assets/primaryFacebook.svg';
import instagram from '../../../../assets/primaryInstagram.svg';
import twitter from '../../../../assets/primaryTwitter.svg';

export default function FacultyProfile({ faculty }) {
  return (
    <>
      <img src={beardGuy} alt="faculty profile" className="w-max" />
      <Typography align="center" className="font-semibold text-medium">{faculty.name}</Typography>
      <Typography align="center" className="mb-2 text-sm">DEAN MIT</Typography>
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
    </>
  );
}

FacultyProfile.propTypes = {
  faculty: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
