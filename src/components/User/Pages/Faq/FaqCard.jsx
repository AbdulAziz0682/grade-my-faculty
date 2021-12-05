import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

export default function FaqCard({ image, title }) {
  return (
    <Card sx={{ width: { xs: '274px', sm: '425px' }, height: { xs: '234px', sm: '334px' } }} className="flex flex-col items-center justify-center gap-3 bg-white cursor-pointer">
      <img src={image} alt={title} />
      <Typography variant="h2" className="font-extrabold">{title}</Typography>
    </Card>
  );
}

FaqCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
