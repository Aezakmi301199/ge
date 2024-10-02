import { Box, Stack, styled } from '@mui/material';
import { theme } from '../../../theme';

export const PropertyInfoContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '8px',
  justifyContent: 'space-between',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
  },
}));

export const PhotoAndMapContainer = styled(Stack)(() => ({
  gap: '8px',
  flexDirection: 'row',
  height: '450px',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
    height: 'auto',
  },
}));

export const PriceContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '12px',
  alignItems: 'baseline',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
    gap: '4px',
  },
}));

export const ContactInfoContainer = styled(Stack)(() => ({
  gap: '4px',
  width: '300px',
  '@media (max-width: 430px)': {
    width: '100%',
    borderRadius: theme.gap.gap_lg,
  },
}));

export const HistoryContainer = styled(Stack)(() => ({
  width: '676px',
  backgroundColor: 'white',
  '@media (max-width: 430px)': { width: '100%', padding: '16px', borderRadius: '12px' },
}));

export const AmenitiesAndViewContainer = styled(Stack)(() => ({
  gap: '16px',
  backgroundColor: 'white',
  '@media (max-width: 430px)': { padding: '16px', borderRadius: '12px' },
}));

export const PropertyAddressContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  '@media (max-width: 430px)': { height: '64px' },
}));

export const PropertyInfoSection = styled(Stack)(() => ({
  width: '676px',
  '@media (max-width: 430px)': { width: '100%', gap: '8px', backgroundColor: theme.bg.bg.bg_lv },
}));

export const StatusAndAddressContainer = styled(Stack)(() => ({
  gap: '10px',
  backgroundColor: 'white',
  '@media (max-width: 430px)': { padding: '16px', borderRadius: '12px' },
}));
