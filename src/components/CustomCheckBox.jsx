import React from 'react';

import PropTypes from 'prop-types';

import {
  Typography,
} from '@mui/material';

import CheckSharp from '@mui/icons-material/CheckSharp';

export default function CustomCheckBox({
  className,
  label,
  checked,
  setChecked,
  labelClassName,
}) {
  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <div className={`border rounded w-6 h-6 flex justify-center items-center ${checked ? 'bg-primary border-primary' : 'bg-transparent border-black'}`} aria-hidden onClick={() => setChecked(!checked)}>
        <CheckSharp htmlColor="white" className="w-4" />
      </div>
      <Typography variant="h6" className={`text-sm ${labelClassName}`} sx={{ fontFamily: 'montserrat' }}>{label}</Typography>
    </div>
  );
}

CustomCheckBox.defaultProps = {
  className: '',
  labelClassName: '',
};

CustomCheckBox.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};
