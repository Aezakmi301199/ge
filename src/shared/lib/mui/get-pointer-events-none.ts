import { SxProps } from '@mui/material';

export const getCssFakeDisabled = (): SxProps => {
  return {
    pointerEvents: 'none',
    opacity: '0.6',
  };
};
