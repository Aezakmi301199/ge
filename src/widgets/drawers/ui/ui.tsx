import { Box, Button, Stack, styled } from '@mui/material';
import { theme } from '../../../theme';

export const FilterDrawerContainer = styled(Stack)(() => ({
  width: '777px',
  gap: theme.gap.gap_2xl,
  paddingBottom: theme.button.padding.px_md,
}));

export const CommentDrawerContainer = styled(Stack)(() => ({
  height: '100vh',
  overflowX: 'hidden',
}));

export const HeaderContainer = styled(Box)(() => ({
  position: 'sticky',
  top: 0,
  backgroundColor: 'white',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px 8px 24px',
  gap: theme.gap.gap_md,
}));

export const MainContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.gap.gap_2xl,
  padding: `6px ${theme.layout.padding_lg}`,
  overflowY: 'auto',
}));

export const MainVerticalContainer = styled(Stack)(() => ({
  gap: theme.gap.gap_2xl,
  padding: `6px ${theme.layout.padding_lg}`,
  paddingTop: theme.layout.padding_lg,
  overflowY: 'auto',
}));

export const SharedSectionContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  padding: `0 ${theme.layout.padding_lg}`,
}));

export const InputContainer = styled(Stack)(() => ({
  width: '100%',
  gap: theme.gap.gap_lg,
}));

export const ChipContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.base.module[1],
}));

export const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `${theme.button.padding.py_lg} ${theme.button.padding.px_lg}`,
  gap: theme.common.input.shape.border_radius,
}));

export const CancelButton = styled(Button)(() => ({
  padding: `${theme.button.padding.py_lg} ${theme.button.padding.px_lg}`,
  borderRadius: theme.common.input.shape.border_radius,
  textTransform: 'none',
  backgroundColor: theme.base.default.main.button,
  boxShadow: 'none',
  color: theme.text.primary,
  fontWeight: 500,
  fontSize: '15px',
  '&:hover': {
    backgroundColor: theme.base.default.dark.button,
    boxShadow: 'none',
  },
}));

export const FindButton = styled(Button)(() => ({
  padding: `${theme.button.padding.py_lg} ${theme.button.padding.px_lg}`,
  borderRadius: theme.common.input.shape.border_radius,
  textTransform: 'none',
  boxShadow: 'none',
  fontWeight: 500,
  fontSize: '15px',
  '&:hover': {
    boxShadow: 'none',
  },
}));

export const InputAdornmentContainer = styled(Box)(() => ({
  display: 'flex',
  gap: theme.button.gap,
  alignItems: 'center',
  marginLeft: '20px',
}));
