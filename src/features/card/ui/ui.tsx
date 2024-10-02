import { Box, styled } from '@mui/material';
import { theme } from '../../../theme';

export const CardContainer = styled(Box)(() => ({
  display: 'flex',
  gap: theme.gap.gap_2xl,
  flexDirection: 'row',
  flexWrap: 'wrap',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
    background: theme.bg.bg.bg_lv,
    paddingTop: '8px',
    paddingBottom: '12px',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    gap: theme.gap.gap_md,
  },
}));

export const CardsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  '@media (min-width: 320px) and (max-width: 430px)': {
    backgroundColor: '#fff',
    borderRadius: '12px',
    flexDirection: 'column',
    padding: '8px',
    width: '100%',
  },
}));

export const CardBox = styled(Box)(() => ({
  position: 'relative',
  width: '270px',
  '@media (min-width: 320px) and (max-width: 430px)': {
    width: '100%',
  },
}));

export const AvatarAndCheckboxControl = styled(Box)(() => ({
  padding: '12px 12px 0 0',
  display: 'flex',
  justifyContent: 'space-between',
}));
