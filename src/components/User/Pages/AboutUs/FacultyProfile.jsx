import React from 'react';

import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

import beardGuy from '../../../../assets/beardGuy.svg';
import facebook from '../../../../assets/primaryFacebook.svg';
import instagram from '../../../../assets/primaryInstagram.svg';
import twitter from '../../../../assets/primaryTwitter.svg';

export default function FacultyProfile() {
  return (
    <>
      <img src={beardGuy} alt="faculty profile" className="w-max" />
      <Typography align="center" className="font-semibold text-medium">Abdul Kalam</Typography>
      <Typography align="center" className="text-sm mb-2">DEAN MIT</Typography>
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
