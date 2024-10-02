import { Box, styled, ToggleButtonGroup } from '@mui/material';
import { theme } from '../../../theme';

export const TogglePropertyContainer = styled(Box)(() => ({
  width: 'auto',
}));

export const ToggleFilterButtonComponent = styled(ToggleButtonGroup)(() => ({
  '.MuiToggleButton-root': {
    height: '40px',
    gap: '8px',
  },
  '.MuiToggleButtonGroup-middleButton': {
    color: theme.text.primary,
    textTransform: 'none',
    fontWeight: 600,
  },
  '.MuiToggleButtonGroup-firstButton': {
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    color: theme.text.primary,
    textTransform: 'none',
    fontWeight: 600,
  },
  '.MuiToggleButtonGroup-lastButton': {
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    color: theme.text.primary,
    textTransform: 'none',
    fontWeight: 600,
  },
}));

export const TogglePropertyButtonComponent = styled(ToggleButtonGroup)(() => ({
  '.MuiToggleButton-root': {
    height: '36px',
    gap: '8px',
  },
  '.MuiToggleButtonGroup-middleButton': {
    color: theme.base.primary.main,
    textTransform: 'none',
    fontWeight: 500,
    borderColor: theme.base.primary.outlined_border,
  },
  '.MuiToggleButtonGroup-firstButton': {
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    color: theme.base.primary.main,
    textTransform: 'none',
    fontWeight: 500,
    borderColor: theme.base.primary.outlined_border,
  },
  '.MuiToggleButtonGroup-lastButton': {
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    color: theme.base.primary.main,
    textTransform: 'none',
    fontWeight: 500,
    borderColor: theme.base.primary.outlined_border,
  },
}));
