import { Box, styled } from '@mui/material';
import { theme } from '../../../theme';

export const CardImage = styled('img')(() => ({
  width: '100%',
  height: '180px',
  borderRadius: '12px',
  objectFit: 'cover',
}));

export const CardImageContainer = styled(Box)(() => ({
  width: '270px',
  height: '180px',
  color: theme.text.secondary,
  '@media (max-width: 430px)': {
    width: '100%',
  },
}));
