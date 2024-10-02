import { Stack, styled } from '@mui/material';
import { theme } from '../../../theme';

export const HistoryTypography = styled(Stack)(() => ({
  gap: theme.gap.gap_md,
  flexDirection: 'row',
  flexWrap: 'wrap',
}));

export const DescriptionInfoContainer = styled(Stack)(() => ({
  gap: '16px',
  width: '676px',
  backgroundColor: 'white',
  '@media (max-width: 430px)': { width: '100%', padding: '16px', borderRadius: '12px' },
}));
