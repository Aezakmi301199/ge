import { SxProps } from '@mui/material';

export const getCssHoverRipple = (color: string): SxProps => {
  return {
    background: color,
    '&:hover': {
      background: color,
    },
  };
};
