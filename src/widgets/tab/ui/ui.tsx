import { Box, styled, Tab } from '@mui/material';
import { theme } from '../../../theme';

export const TabControl = styled(Box)({
  position: 'fixed',
  background: 'white',
  zIndex: 1,
  width: '100%',
});

export const StyledTab = styled(Tab)({
  color: '#1A1A1A',
  padding: '9px 16px 0 16px',
  minHeight: '42px',
  textDecoration: 'none',
  textTransform: 'none',
  letterSpacing: '0.056px',
  '&.Mui-selected': {
    color: theme.text.primary,
  },
});
