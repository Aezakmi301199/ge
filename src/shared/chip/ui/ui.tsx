import { Chip, styled } from '@mui/material';
import { theme } from '../../../theme';

export const ChipAmenity = styled(Chip)(() => ({
  fontSize: '16px',
  padding: '4px 12px',
  height: '40px',
  cursor: 'default',
  alignItems: 'center',
  borderRadius: '30px',
  backgroundColor: theme.base.default.main.button,
  border: 'none',
  '&:hover': {
    backgroundColor: theme.base.default.main.button,
  },
  '&:active': {
    boxShadow: 'none',
  },
  '.MuiChip-icon': {
    marginLeft: '0',
  },
}));
