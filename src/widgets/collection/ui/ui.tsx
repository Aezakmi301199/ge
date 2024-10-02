import { Box, styled } from '@mui/material';

export const CollectionHeaderComponent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '16px 0',
  gap: '16px',
}));

export const CollectionContainer = styled(Box)(() => ({
  gap: '24px',
  display: 'flex',
  flexDirection: 'row',
  '@media (max-width: 430px)': { width: '100%', background: 'white', borderRadius: '12px', padding: '8px' },
}));

export const CollectionImage = styled('img')(() => ({
  width: '129px',
  height: '120px',
  borderRadius: '8px',
  objectFit: 'cover',
  '@media (max-width: 430px)': { width: '100%' },
}));
