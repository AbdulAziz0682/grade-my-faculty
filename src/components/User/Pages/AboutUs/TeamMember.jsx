import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import Icon from '@mui/material/Icon';

export default function TeamMember({ member }) {
  return (
    <>
      <img src={member.image} alt={member.name} className="w-20" />
      <Typography align="center" className="font-semibold text-medium">{member.name}</Typography>
      <Typography align="center" className="text-sm">{member.role}</Typography>
      <div
        style={{
          display: 'flex', gap: '1rem', justifyContent: 'space-between',
        }}
      >
        <a href={member.facebookLink}>
          <Icon className="flex">
            <Facebook color="primary" className="w-6 h-6" />
          </Icon>
        </a>
        <a href={member.instagramLink}>
          <Icon className="flex">
            <Instagram color="primary" className="w-6 h-6" />
          </Icon>
        </a>
        <a href={member.linkedinLink}>
          <Icon className="flex">
            <LinkedIn color="primary" className="w-6 h-6" />
          </Icon>
        </a>
      </div>
    </>
  );
}

TeamMember.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    facebookLink: PropTypes.string.isRequired,
    instagramLink: PropTypes.string.isRequired,
    linkedinLink: PropTypes.string.isRequired,
  }).isRequired,
};
