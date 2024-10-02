import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { theme } from '../../theme';

interface InputAdornmentProps {
  text: string;
  type: string;
}

const SmallInputWithStartAdornment: React.FC<InputAdornmentProps> = ({ text, type }) => {
  return (
    <TextField
      type={type}
      size={'small'}
      sx={{ width: '120px' }}
      InputProps={{
        startAdornment: <InputAdornment position='start'>{text}</InputAdornment>,
        style: {
          borderRadius: theme.common.input.shape.border_radius,
        },
      }}
    />
  );
};

export default SmallInputWithStartAdornment;
