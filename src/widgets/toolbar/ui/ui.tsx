import { Box, Stack, styled } from '@mui/material';
import { theme } from '../../../theme';

export const ToolbarContainer = styled(Stack)(() => ({
  padding: '16px 0 8px 0',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '49px',
  '@media (min-width: 375px) and (max-width: 430px)': {
    backgroundColor: theme.base.primary.contrast,
    borderRadius: '0 0 12px 12px',
  },
}));

export const ToolbarButtonContainer = styled(Box)(() => ({
  gap: '12px',
  display: 'flex',
  alignItems: 'center',
  height: '36px',
  '@media (min-width: 320px) and (max-width: 430px)': {
    width: '100%',
    padding: '0 16px',
  },
}));

export const ToolbarButtonMobileContainer = styled(Box)(() => ({
  gap: '8px',
  display: 'flex',
  alignItems: 'center',
  '@media (min-width: 320px) and (max-width: 430px)': {
    width: '100%',
  },
}));

export const ToolbarCollectionContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'flex-start',
  padding: '0 24px',
  '@media (max-width: 430px)': {
    flexDirection: 'column',
    padding: '18px 8px 6px',
    backgroundColor: theme.bg.bg.bg_lv,
  },
}));

export const ToolbarSection = styled(Stack)(() => ({
  '@media (max-width: 430px)': {
    padding: '0px',
    backgroundColor: theme.bg.bg.bg_lv,
    height: '100%',
    overflowY: 'auto',
  },
}));

export const ModalMainContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: theme.gap.gap_xl,
  flexWrap: 'wrap',
  '@media (max-width: 430px)': {
    backgroundColor: theme.bg.bg.bg_lv,
    gap: theme.gap.gap_md,
    padding: '0 8px',
  },
}));

export const ButtonToolbarContainer = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: theme.gap.gap_md,
  alignItems: 'center',
  borderBottomRightRadius: theme.border_radius.modal,
  borderBottomLeftRadius: theme.border_radius.modal,
  backgroundColor: theme.base.primary.contrast,
}));
